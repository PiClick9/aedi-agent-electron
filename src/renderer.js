/**
 * AEDI Agent Electron - Renderer Process
 */

// 국가별 설정
const nationConfig = {
  kr: {
    apiKey: 'dba132f6ab6a3e3d17a8d59e82105f4c',
    jsUrl: 'https://api.aedi.ai/common/js/v1/aedi-ad.js',
    cssUrl: 'https://api.aedi.ai/common/css/v1/aedi-ad.css'
  },
  th: {
    apiKey: '2a0f97f81755e2878b264adf39cba68e',
    jsUrl: 'https://thapi.aedi.ai/common/js/v1/aedi-ad-th.js',
    cssUrl: 'https://thapi.aedi.ai/common/css/v1/aedi-ad-th.css'
  }
};

// 앱 상태
const state = {
  nation: 'kr',
  apiKey: nationConfig.kr.apiKey,
  selectedImages: [],
  imageSelectionMode: false,
  selectionInterval: null,
  capturedAds: {},
  aediLoaded: false
};

// DOM 요소
const elements = {};

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
  initElements();
  initEventListeners();
  updateUI();
  generateDate();

  // Welcome 페이지 로드
  try {
    const welcomePath = await window.electronAPI.getWelcomePath();
    elements.webview.src = welcomePath;
  } catch (err) {
    console.error('Failed to load welcome page:', err);
  }
});

function initElements() {
  elements.webview = document.getElementById('webview');
  elements.urlInput = document.getElementById('url-input');
  elements.loadingOverlay = document.getElementById('loading-overlay');
  elements.agentPanel = document.getElementById('agent-panel');
  elements.apiKey = document.getElementById('api-key');
  elements.imgSelector = document.getElementById('img-selector');
  elements.selectedCount = document.getElementById('selected-count');
  elements.dateValue = document.getElementById('date-value');
  elements.statusBar = document.getElementById('status-bar');
  elements.statusText = document.getElementById('status-text');
  elements.adList = document.getElementById('ad-list');
  elements.adSelect = document.getElementById('ad-select');
  elements.statAds = document.getElementById('stat-ads');
  elements.statIntervals = document.getElementById('stat-intervals');
  elements.statAedi = document.getElementById('stat-aedi');
}

function initEventListeners() {
  // URL 입력
  document.getElementById('btn-go').addEventListener('click', navigateToUrl);
  elements.urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') navigateToUrl();
  });

  // 네비게이션 버튼
  document.getElementById('btn-back').addEventListener('click', () => elements.webview.goBack());
  document.getElementById('btn-forward').addEventListener('click', () => elements.webview.goForward());
  document.getElementById('btn-reload').addEventListener('click', () => elements.webview.reload());

  // 개발자 도구
  document.getElementById('btn-devtools').addEventListener('click', () => {
    elements.webview.openDevTools();
  });

  // 에이전트 주입
  document.getElementById('btn-inject').addEventListener('click', injectAgent);

  // 패널 닫기
  document.getElementById('btn-close-panel').addEventListener('click', () => {
    elements.agentPanel.classList.add('hidden');
  });

  // 국가 선택
  document.querySelectorAll('input[name="nation"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.nation = e.target.value;
      state.apiKey = nationConfig[state.nation].apiKey;
      updateUI();
    });
  });

  // 이미지 선택
  document.getElementById('btn-select-images').addEventListener('click', toggleImageSelection);
  document.getElementById('btn-clear-images').addEventListener('click', clearImageSelection);

  // 제어 버튼
  document.getElementById('btn-save').addEventListener('click', saveConfig);
  document.getElementById('btn-start').addEventListener('click', startAd);
  document.getElementById('btn-stop').addEventListener('click', stopAd);
  document.getElementById('btn-restart').addEventListener('click', restartAd);
  document.getElementById('btn-pbox').addEventListener('click', openPBoxViewer);
  document.getElementById('btn-guide').addEventListener('click', downloadGuide);

  // 웹뷰 이벤트
  elements.webview.addEventListener('did-start-loading', () => {
    elements.loadingOverlay.classList.remove('hidden');
  });

  elements.webview.addEventListener('did-stop-loading', () => {
    elements.loadingOverlay.classList.add('hidden');
    const currentUrl = elements.webview.getURL();
    // Welcome 페이지는 URL 바에 표시하지 않음
    if (!currentUrl.includes('welcome.html')) {
      elements.urlInput.value = currentUrl;
    } else {
      elements.urlInput.value = '';
    }
  });

  elements.webview.addEventListener('did-navigate', (e) => {
    // Welcome 페이지는 URL 바에 표시하지 않음
    if (!e.url.includes('welcome.html')) {
      elements.urlInput.value = e.url;
    } else {
      elements.urlInput.value = '';
    }
  });

  // 웹뷰에서 콘솔 메시지 캡처
  elements.webview.addEventListener('console-message', (e) => {
    if (e.message.includes('[AEDI')) {
      console.log('[Webview]', e.message);

      // 광고 데이터 캡처
      if (e.message.includes('adThumb intercepted')) {
        updateStats();
      }
    }
  });

  // IPC 메시지 수신
  elements.webview.addEventListener('ipc-message', (e) => {
    if (e.channel === 'image-selected') {
      handleImageSelected(e.args[0]);
    } else if (e.channel === 'ad-data-captured') {
      handleAdDataCaptured(e.args[0]);
    }
  });
}

function navigateToUrl() {
  let url = elements.urlInput.value.trim();
  if (!url) return;

  // URL 프로토콜 추가
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  elements.webview.src = url;
  updateStatus('Loading: ' + url, 'info');
}

function updateUI() {
  elements.apiKey.value = state.apiKey;
  elements.selectedCount.textContent = state.selectedImages.length > 0
    ? `${state.selectedImages.length}개 이미지 선택됨`
    : '선택된 이미지 없음';

  elements.statAedi.textContent = state.aediLoaded ? '✓' : '✗';
}

function generateDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
  const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0');
  const offsetSign = offset <= 0 ? '+' : '-';

  const isoDate = now.toISOString().slice(0, 19) + offsetSign + offsetHours + ':' + offsetMinutes;
  elements.dateValue.value = isoDate;
}

function updateStatus(message, type = 'info') {
  elements.statusText.textContent = message;
  elements.statusBar.className = 'status-bar ' + type;
}

function updateStats() {
  const adCount = Object.keys(state.capturedAds).length;
  elements.statAds.textContent = adCount;
  updateAdList();
}

function updateAdList() {
  const ads = Object.entries(state.capturedAds);

  if (ads.length === 0) {
    elements.adList.innerHTML = '<div class="ad-list-empty">광고 데이터가 없습니다</div>';
    return;
  }

  elements.adList.innerHTML = ads.map(([adId, data]) => `
    <div class="ad-item">
      <span class="ad-item-name">${adId}</span>
      <button class="ad-item-btn" onclick="viewPBox('${adId}')">P-Box</button>
    </div>
  `).join('');
}

// 에이전트 스크립트를 웹뷰에 주입
async function injectAgent() {
  elements.agentPanel.classList.remove('hidden');
  updateStatus('AEDI 스크립트 주입 중...', 'info');

  try {
    // 로컬 AEDI 스크립트 로드
    const loadResult = await window.electronAPI.loadAediScripts(state.nation);

    if (!loadResult.success) {
      updateStatus('스크립트 로드 실패: ' + loadResult.error, 'error');
      return;
    }

    console.log('[injectAgent] Script length:', loadResult.js.length, 'CSS length:', loadResult.css.length);

    // Webview에 CSS 주입
    await elements.webview.executeJavaScript(`
      (function() {
        if (!document.querySelector('style[data-aedi-css]')) {
          const style = document.createElement('style');
          style.setAttribute('data-aedi-css', '${state.nation}');
          style.textContent = ${JSON.stringify(loadResult.css)};
          document.head.appendChild(style);
          console.log('[AEDI Agent] CSS injected');
        }
      })();
    `);

    // Webview에 JS 직접 실행 (eval 사용)
    const result = await elements.webview.executeJavaScript(`
      (function() {
        try {
          // 이미 로드되었는지 확인
          if (window.aedi_script) {
            console.log('[AEDI Agent] Script already loaded');
            return { alreadyLoaded: true, hasAedi: typeof Aedi !== 'undefined' };
          }

          // 스크립트 직접 실행 (indirect eval로 전역 스코프에서 실행)
          console.log('[AEDI Agent] Executing script via indirect eval...');
          (0, eval)(${JSON.stringify(loadResult.js)});
          console.log('[AEDI Agent] Script executed in global scope');

          // 마커 추가 (중복 실행 방지)
          const marker = document.createElement('script');
          marker.setAttribute('data-aedi-script', '${state.nation}');
          marker.textContent = '// AEDI Script Marker';
          document.head.appendChild(marker);

          // 확인
          console.log('[AEDI Agent] After execution:');
          console.log('  - window.aedi_script:', window.aedi_script);
          console.log('  - typeof Aedi:', typeof Aedi);

          return {
            aediScript: window.aedi_script,
            hasAedi: typeof Aedi !== 'undefined'
          };
        } catch (e) {
          console.error('[AEDI Agent] Execution error:', e);
          return { error: e.message };
        }
      })();
    `);

    console.log('[injectAgent] Result:', result);

    state.aediLoaded = true;
    updateUI();
    updateStatus('AEDI ' + (state.nation === 'kr' ? '한국' : '태국') + ' 주입 완료', 'success');
  } catch (e) {
    updateStatus('주입 에러: ' + e.message, 'error');
    console.error('[injectAgent Error]', e);
  }
}

// 이미지 선택 모드
async function toggleImageSelection() {
  if (state.imageSelectionMode) {
    await stopImageSelectionMode();
  } else {
    await startImageSelectionMode();
  }
}

async function startImageSelectionMode() {
  state.imageSelectionMode = true;
  document.getElementById('btn-select-images').textContent = '✓ 완료';
  updateStatus('이미지를 클릭하여 선택하세요 (완료 버튼 또는 ESC로 종료)', 'info');

  await elements.webview.executeJavaScript(`
    (function() {
      window._aediSelectMode = true;
      document.body.style.cursor = 'crosshair';

      window._aediClickHandler = function(e) {
        if (!window._aediSelectMode) return;

        const img = e.target.closest('img');
        if (img) {
          e.preventDefault();
          e.stopPropagation();

          if (img.hasAttribute('data-aedi-selected')) {
            img.removeAttribute('data-aedi-selected');
            img.style.cssText = img.style.cssText
              .replace(/outline:[^;]+!important;?/g, '')
              .replace(/box-shadow:[^;]+!important;?/g, '')
              .replace(/filter:[^;]+!important;?/g, '');
          } else {
            img.setAttribute('data-aedi-selected', 'true');
            img.style.cssText += 'outline: 5px solid #00d9a5 !important; box-shadow: 0 0 20px 5px rgba(0, 217, 165, 0.8) !important; filter: brightness(1.1) !important;';
          }

          // 선택된 이미지 수 콘솔에 출력
          const count = document.querySelectorAll('img[data-aedi-selected]').length;
          console.log('[AEDI Agent] Selected images:', count);
        }
      };

      window._aediKeyHandler = function(e) {
        if (e.key === 'Escape') {
          window._aediSelectMode = false;
          document.body.style.cursor = '';
          console.log('[AEDI Agent] Selection mode ended by ESC');
        }
      };

      document.addEventListener('click', window._aediClickHandler, true);
      document.addEventListener('keydown', window._aediKeyHandler);
    })();
  `);

  // 주기적으로 선택된 이미지 수 업데이트
  state.selectionInterval = setInterval(async () => {
    if (!state.imageSelectionMode) {
      clearInterval(state.selectionInterval);
      return;
    }
    try {
      const count = await elements.webview.executeJavaScript(`
        document.querySelectorAll('img[data-aedi-selected]').length;
      `);
      elements.selectedCount.textContent = count > 0 ? count + '개 이미지 선택됨' : '선택된 이미지 없음';
    } catch (e) {}
  }, 500);
}

async function stopImageSelectionMode() {
  state.imageSelectionMode = false;
  document.getElementById('btn-select-images').textContent = '🎯';

  // 선택 업데이트 인터벌 정리
  if (state.selectionInterval) {
    clearInterval(state.selectionInterval);
    state.selectionInterval = null;
  }

  const result = await elements.webview.executeJavaScript(`
    (function() {
      window._aediSelectMode = false;
      document.body.style.cursor = '';
      document.removeEventListener('click', window._aediClickHandler, true);
      document.removeEventListener('keydown', window._aediKeyHandler);

      const selected = document.querySelectorAll('img[data-aedi-selected]');
      selected.forEach((img, i) => {
        img.setAttribute('data-aedi-ad', i);
      });

      return selected.length;
    })();
  `);

  state.selectedImages = Array(result).fill(true);
  elements.imgSelector.value = result > 0 ? `img[data-aedi-ad] (${result}개)` : '';
  updateUI();
  updateStatus(result + '개 이미지 선택됨', 'success');
}

async function clearImageSelection() {
  state.selectedImages = [];
  elements.imgSelector.value = '';

  await elements.webview.executeJavaScript(`
    document.querySelectorAll('img[data-aedi-selected], img[data-aedi-ad]').forEach(img => {
      img.removeAttribute('data-aedi-selected');
      img.removeAttribute('data-aedi-ad');
      img.style.cssText = img.style.cssText
        .replace(/outline:[^;]+!important;?/g, '')
        .replace(/box-shadow:[^;]+!important;?/g, '')
        .replace(/filter:[^;]+!important;?/g, '');
    });
  `);

  updateUI();
  updateStatus('이미지 선택 초기화됨', 'info');
}

// 광고 제어 - Save 버튼: 스크립트 재주입
async function saveConfig() {
  // Agent 버튼과 동일하게 스크립트 주입
  await injectAgent();
}

async function startAd() {
  if (state.selectedImages.length === 0) {
    updateStatus('먼저 이미지를 선택하세요', 'error');
    return;
  }

  const dateValue = elements.dateValue.value;

  try {
    const result = await elements.webview.executeJavaScript(`
      (function() {
        try {
          // Aedi 클래스 확인
          if (typeof Aedi === 'undefined') {
            return { success: false, error: 'Aedi not loaded' };
          }

          const images = document.querySelectorAll('img[data-aedi-ad]');
          if (images.length === 0) {
            return { success: false, error: 'No images with data-aedi-ad found' };
          }

          // Aedi 인스턴스 생성 (없으면 생성)
          if (!window._aediInstance) {
            window._aediInstance = new Aedi();
            console.log('[AEDI Agent] Created new Aedi instance');
          }

          const aedi = window._aediInstance;

          // AediAgent 설정 (p_box 중심 크롭 기능 활성화)
          if (typeof window.AediAgent === 'undefined') {
            window.AediAgent = {
              abfData: {},
              adResponseData: {},
              log: function(msg) { console.log('[AediAgent]', msg); }
            };
            console.log('[AEDI Agent] AediAgent initialized for p_box centering');
          }

          try {
            // adOpen(apiKey, images, writingTime, null)
            console.log('[AEDI Agent] Calling adOpen with:', '${state.apiKey}', images.length, 'images');
            aedi.adOpen(
              '${state.apiKey}',
              images,
              '${dateValue}',
              null
            );
            console.log('[AEDI Agent] Started ads for', images.length, 'images');
            return { success: true, count: images.length };
          } catch (e) {
            console.error('[AEDI Agent] Error starting ads:', e);
            return { success: false, error: e.message };
          }
        } catch (e) {
          return { success: false, error: e.message };
        }
      })();
    `);

    console.log('[startAd] Result:', result);

    if (result.success) {
      updateStatus('광고 시작됨 (' + (result.count || 0) + '개 이미지)', 'success');
      // 광고 목록 업데이트
      setTimeout(() => updateAdSelect(), 1000);
    } else {
      updateStatus('광고 시작 실패: ' + result.error, 'error');
    }
  } catch (e) {
    updateStatus('실행 에러: ' + e.message, 'error');
    console.error('[startAd Error]', e);
  }
}

// 광고 선택 드롭다운 업데이트
async function updateAdSelect() {
  try {
    const adIds = await elements.webview.executeJavaScript(`
      (function() {
        const aedi = window._aediInstance;
        if (!aedi || !aedi.canvas) return [];
        return Object.keys(aedi.canvas);
      })();
    `);

    console.log('[updateAdSelect] Ad IDs:', adIds);

    // 드롭다운 업데이트
    elements.adSelect.innerHTML = '<option value="">광고를 선택하세요</option>';
    adIds.forEach(adId => {
      const option = document.createElement('option');
      option.value = adId;
      option.textContent = adId;
      elements.adSelect.appendChild(option);
    });

    // 통계 업데이트
    elements.statAds.textContent = adIds.length;
  } catch (e) {
    console.error('[updateAdSelect Error]', e);
  }
}

async function stopAd() {
  try {
    const result = await elements.webview.executeJavaScript(`
      (function() {
        try {
          let stoppedCount = 0;

          // Aedi 인스턴스의 adCloseAll 호출
          if (window._aediInstance && typeof window._aediInstance.adCloseAll === 'function') {
            window._aediInstance.adCloseAll();
            console.log('[AEDI Agent] Called adCloseAll');
          }

          // Aedi 인스턴스의 interval 정리
          if (window._aediInstance && window._aediInstance.interval) {
            Object.keys(window._aediInstance.interval).forEach(key => {
              clearInterval(window._aediInstance.interval[key]);
              delete window._aediInstance.interval[key];
              stoppedCount++;
            });
          }

          // Aedi 인스턴스의 canvas, link 정리
          if (window._aediInstance) {
            if (window._aediInstance.canvas) {
              Object.keys(window._aediInstance.canvas).forEach(key => {
                if (window._aediInstance.canvas[key] && window._aediInstance.canvas[key].remove) {
                  window._aediInstance.canvas[key].remove();
                }
                delete window._aediInstance.canvas[key];
              });
            }
            if (window._aediInstance.link) {
              Object.keys(window._aediInstance.link).forEach(key => {
                if (window._aediInstance.link[key] && window._aediInstance.link[key].remove) {
                  window._aediInstance.link[key].remove();
                }
                delete window._aediInstance.link[key];
              });
            }
          }

          // AEDI 관련 DOM 요소 제거
          const selectors = [
            '.aedi-container',
            '[id^="aedi-"]',
            '[class^="aedi-"]',
            '.pxButton'
          ];
          let removedCount = 0;
          selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
              el.remove();
              removedCount++;
            });
          });

          // Aedi 인스턴스 리셋
          window._aediInstance = null;

          console.log('[AEDI Agent] Ads stopped, removed:', removedCount);
          return { success: true, stoppedCount, removedElements: removedCount };
        } catch (e) {
          return { success: false, error: e.message };
        }
      })();
    `);

    if (result.success) {
      updateStatus('광고 중지됨 (제거: ' + result.removedElements + '개)', 'info');
    } else {
      updateStatus('중지 실패: ' + result.error, 'error');
    }
  } catch (e) {
    updateStatus('실행 에러: ' + e.message, 'error');
    console.error('[stopAd Error]', e);
  }
}

async function restartAd() {
  updateStatus('재시작 중...', 'info');
  await stopAd();
  // 500ms 대기 후 시작
  await new Promise(resolve => setTimeout(resolve, 500));
  await startAd();
}

// P-Box Viewer
async function openPBoxViewer() {
  // 선택된 광고 ID 가져오기
  const selectedAdId = elements.adSelect.value;

  if (!selectedAdId) {
    updateStatus('광고를 선택해주세요', 'error');
    return;
  }

  // 웹뷰에서 선택된 광고 데이터 가져오기
  const adData = await elements.webview.executeJavaScript(`
    (function() {
      const aedi = window._aediInstance;
      const adId = '${selectedAdId}';

      if (!aedi) {
        return { error: 'No Aedi instance found' };
      }

      // Aedi 인스턴스에서 데이터 찾기
      const responseData = aedi.adResponseData?.[adId] ||
                          aedi.responseData?.[adId] ||
                          aedi.data?.[adId] ||
                          null;

      console.log('[AEDI Agent] Response data for', adId, ':', responseData);

      if (!responseData) {
        // Aedi 인스턴스의 모든 속성 확인
        console.log('[AEDI Agent] Aedi instance keys:', Object.keys(aedi));
        return { error: 'No response data for ' + adId };
      }

      return {
        adId: adId,
        img_url: responseData.img_url || '',
        p_box: responseData.p_box || null
      };
    })();
  `);

  console.log('[openPBoxViewer] Ad data:', adData);

  if (adData.error) {
    updateStatus(adData.error, 'error');
    return;
  }

  if (adData.img_url && adData.p_box) {
    window.electronAPI.openPBoxViewer({
      adId: adData.adId,
      img: adData.img_url,
      pbox: adData.p_box
    });
    updateStatus('P-Box Viewer 열림: ' + adData.adId, 'success');
  } else {
    updateStatus('P-Box 데이터가 없습니다 (img_url: ' + !!adData.img_url + ', p_box: ' + !!adData.p_box + ')', 'error');
  }
}

async function downloadGuide() {
  try {
    // 웹뷰 URL에서 호스트명 추출
    const webviewUrl = elements.webview.getURL();
    if (!webviewUrl || webviewUrl === 'about:blank') {
      updateStatus('먼저 웹사이트를 로드하세요', 'error');
      return;
    }

    const url = new URL(webviewUrl);
    const hostname = url.hostname;

    // 가이드 템플릿 생성
    const guideContent = `// !중요! 반드시 기사 본문보다 아래에 삽입하셔야 합니다 !!
<link rel='stylesheet' href='https://api.aedi.ai/common/css/v1/aedi-ad.css'>
<script src='https://api.aedi.ai/common/js/v1/aedi-ad.js'></script>
<script type='text/javascript'>
    var AEDI_API_KEY = '${state.apiKey}'; //발급된 apikey
    var aedi = new Aedi();
    var aediWritingTime = '${elements.dateValue.value}';       // 반드시 기사 날짜가 입력되어야 광고가 노출됩니다.
    var imgSelector = document.querySelectorAll('img[data-aedi-ad]');  // .img 해당 부분에 기사 이미지에 해당하는 Selector 요소를 입력해 주세요
    aedi.adOpen(AEDI_API_KEY, imgSelector, aediWritingTime);
</script>`;

    // Blob 생성 및 다운로드
    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${hostname}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    updateStatus(`가이드 다운로드: ${hostname}.txt`, 'success');
  } catch (e) {
    updateStatus('가이드 다운로드 실패: ' + e.message, 'error');
    console.error('[downloadGuide Error]', e);
  }
}

// 광고 데이터 캡처 핸들러
function handleAdDataCaptured(data) {
  state.capturedAds[data.adId] = data;
  updateStats();
}

// P-Box 보기 (개별 광고)
window.viewPBox = function(adId) {
  const data = state.capturedAds[adId];
  if (data && data.img_url && data.p_box) {
    window.electronAPI.openPBoxViewer({
      adId: adId,
      img: data.img_url,
      pbox: data.p_box
    });
  }
};
