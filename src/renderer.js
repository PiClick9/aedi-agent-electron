/**
 * AEDI Agent Electron - Renderer Process
 */

// 국가별 설정
const nationConfig = {
  kr: {
    apiKey: '9e406957d45fcb6c6f38c2ada7bace91',
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
  capturedAds: {},
  aediLoaded: false
};

// DOM 요소
const elements = {};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  initElements();
  initEventListeners();
  updateUI();
  generateDate();
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
  document.getElementById('btn-abf').addEventListener('click', openAbfEditor);

  // 웹뷰 이벤트
  elements.webview.addEventListener('did-start-loading', () => {
    elements.loadingOverlay.classList.remove('hidden');
  });

  elements.webview.addEventListener('did-stop-loading', () => {
    elements.loadingOverlay.classList.add('hidden');
    elements.urlInput.value = elements.webview.getURL();
  });

  elements.webview.addEventListener('did-navigate', (e) => {
    elements.urlInput.value = e.url;
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

  const config = nationConfig[state.nation];

  // AEDI CSS 주입
  await elements.webview.executeJavaScript(`
    (function() {
      if (!document.querySelector('link[data-aedi-css]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '${config.cssUrl}';
        css.setAttribute('data-aedi-css', '${state.nation}');
        document.head.appendChild(css);
      }
    })();
  `);

  // AEDI JS 주입
  await elements.webview.executeJavaScript(`
    (function() {
      if (!document.querySelector('script[data-aedi-script]')) {
        const script = document.createElement('script');
        script.src = '${config.jsUrl}';
        script.setAttribute('data-aedi-script', '${state.nation}');
        document.head.appendChild(script);
      }
    })();
  `);

  state.aediLoaded = true;
  updateUI();
  updateStatus('AEDI ' + (state.nation === 'kr' ? '한국' : '태국') + ' 주입 완료', 'success');
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
  updateStatus('이미지를 클릭하여 선택하세요 (ESC로 종료)', 'info');

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
            img.style.outline = '';
          } else {
            img.setAttribute('data-aedi-selected', 'true');
            img.style.outline = '3px solid #00d4ff';
          }

          // 선택된 이미지 수 전송
          const count = document.querySelectorAll('img[data-aedi-selected]').length;
          require('electron').ipcRenderer.sendToHost('image-selected', { count });
        }
      };

      window._aediKeyHandler = function(e) {
        if (e.key === 'Escape') {
          window._aediSelectMode = false;
          document.body.style.cursor = '';
          require('electron').ipcRenderer.sendToHost('image-selected', { done: true });
        }
      };

      document.addEventListener('click', window._aediClickHandler, true);
      document.addEventListener('keydown', window._aediKeyHandler);
    })();
  `);
}

async function stopImageSelectionMode() {
  state.imageSelectionMode = false;
  document.getElementById('btn-select-images').textContent = '🎯';

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

function handleImageSelected(data) {
  if (data.done) {
    stopImageSelectionMode();
  } else if (data.count !== undefined) {
    elements.selectedCount.textContent = `${data.count}개 이미지 선택됨`;
  }
}

async function clearImageSelection() {
  state.selectedImages = [];
  elements.imgSelector.value = '';

  await elements.webview.executeJavaScript(`
    document.querySelectorAll('img[data-aedi-selected], img[data-aedi-ad]').forEach(img => {
      img.removeAttribute('data-aedi-selected');
      img.removeAttribute('data-aedi-ad');
      img.style.outline = '';
    });
  `);

  updateUI();
  updateStatus('이미지 선택 초기화됨', 'info');
}

// 광고 제어
async function saveConfig() {
  const config = nationConfig[state.nation];

  await elements.webview.executeJavaScript(`
    (function() {
      if (!document.querySelector('link[data-aedi-css]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '${config.cssUrl}';
        css.setAttribute('data-aedi-css', '${state.nation}');
        document.head.appendChild(css);
      }

      if (!document.querySelector('script[data-aedi-script]')) {
        const script = document.createElement('script');
        script.src = '${config.jsUrl}';
        script.setAttribute('data-aedi-script', '${state.nation}');
        document.head.appendChild(script);
      }
    })();
  `);

  state.aediLoaded = true;
  updateUI();
  updateStatus('설정 저장 및 AEDI 로드 완료', 'success');
}

async function startAd() {
  if (state.selectedImages.length === 0) {
    updateStatus('먼저 이미지를 선택하세요', 'error');
    return;
  }

  const dateValue = elements.dateValue.value;

  await elements.webview.executeJavaScript(`
    (function() {
      if (typeof aedi === 'undefined') {
        console.log('[AEDI Agent] aedi not loaded');
        return;
      }

      const images = document.querySelectorAll('img[data-aedi-ad]');
      images.forEach((img, i) => {
        const adId = 'ad_' + i;
        aedi.adopen2(
          '${state.apiKey}',
          adId,
          img,
          '${dateValue}'
        );
        console.log('[AEDI Agent] Started ad:', adId);
      });
    })();
  `);

  updateStatus('광고 시작됨', 'success');
}

async function stopAd() {
  await elements.webview.executeJavaScript(`
    (function() {
      if (typeof aedi !== 'undefined' && aedi.intervals) {
        Object.keys(aedi.intervals).forEach(key => {
          clearInterval(aedi.intervals[key]);
          delete aedi.intervals[key];
        });
      }

      document.querySelectorAll('.aedi-container, [id^="aedi-"]').forEach(el => {
        el.remove();
      });

      console.log('[AEDI Agent] Ads stopped');
    })();
  `);

  updateStatus('광고 중지됨', 'info');
}

async function restartAd() {
  await stopAd();
  setTimeout(() => startAd(), 500);
}

// P-Box Viewer
async function openPBoxViewer() {
  // 웹뷰에서 광고 데이터 수집
  const adData = await elements.webview.executeJavaScript(`
    (function() {
      const data = [];
      if (typeof aedi !== 'undefined') {
        Object.keys(aedi.canvas || {}).forEach(adId => {
          // adResponseData에서 데이터 가져오기 시도
          const responseData = window.AediAgent?.adResponseData?.[adId] || {};
          data.push({
            adId: adId,
            img_url: responseData.img_url || '',
            p_box: responseData.p_box || null
          });
        });
      }
      return data;
    })();
  `);

  if (adData.length === 0) {
    updateStatus('표시할 광고 데이터가 없습니다', 'error');
    return;
  }

  // 첫 번째 광고 데이터로 P-Box Viewer 열기
  const firstAd = adData[0];
  if (firstAd.img_url && firstAd.p_box) {
    window.electronAPI.openPBoxViewer({
      adId: firstAd.adId,
      img: firstAd.img_url,
      pbox: firstAd.p_box
    });
  } else {
    updateStatus('P-Box 데이터가 없습니다', 'error');
  }
}

function openAbfEditor() {
  updateStatus('ABF Editor는 아직 구현되지 않았습니다', 'info');
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
