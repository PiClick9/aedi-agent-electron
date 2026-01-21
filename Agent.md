# AEDI Agent Electron 동작 규칙

이 문서는 AEDI Agent Electron 앱의 동작을 결정하는 핵심 규칙과 가이드라인을 정의합니다.

---

## 1. 앱의 목적

AEDI Agent는 **AEDI 광고 시스템 테스트 및 관리 도구**입니다.

### 핵심 역할
- 웹사이트에 AEDI 광고 스크립트를 주입하여 광고 동작 테스트
- 이미지 선택을 통한 광고 영역 지정
- P-Box 좌표 시각화 및 크롭 미리보기
- 한국/태국 서버 간 전환 테스트
- 가이드 스크립트 생성 및 다운로드

---

## 2. 아키텍처 규칙

### 2.1 프로세스 구조
```
Main Process (main.js)
    │
    ├── 메인 윈도우 (BrowserWindow)
    │       └── webview (외부 웹사이트 로드)
    │
    └── P-Box Viewer 윈도우 (자식 윈도우)
```

### 2.2 프로세스별 책임

| 프로세스 | 파일 | 책임 |
|----------|------|------|
| Main | `main.js` | 윈도우 생성/관리, IPC 핸들링, 시스템 API |
| Preload | `preload.js` | 안전한 API 노출 (contextBridge) |
| Renderer | `renderer.js` | UI 로직, webview 제어, 상태 관리 |

### 2.3 통신 규칙
- **Main ↔ Renderer**: `ipcMain.handle()` / `ipcRenderer.invoke()` 사용
- **Renderer ↔ Webview**: `executeJavaScript()` / `ipc-message` 이벤트 사용
- 직접적인 `nodeIntegration`은 비활성화 유지

### 2.4 BrowserWindow 필수 설정
```javascript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  webviewTag: true,  // 반드시 true로 설정해야 webview 작동
  preload: path.join(__dirname, 'preload.js')
}
```

---

## 3. AEDI 스크립트 규칙 (핵심)

### 3.1 Aedi 클래스 사용법

```
[규칙 3.1.1] 전역 객체명은 `Aedi` (대문자 A) - `aedi`가 아님!
[규칙 3.1.2] Aedi는 생성자 클래스 - 반드시 `new Aedi()`로 인스턴스 생성
[규칙 3.1.3] 인스턴스를 window._aediInstance에 저장하여 재사용
```

**올바른 사용법:**
```javascript
// 인스턴스 생성
if (!window._aediInstance) {
  window._aediInstance = new Aedi();
}
const aedi = window._aediInstance;

// 광고 시작
aedi.adOpen(apiKey, images, writingTime, null);
```

### 3.2 adOpen 메서드 시그니처

```javascript
aedi.adOpen(apiKey, images, writingTime, callback)
```

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| apiKey | string | AEDI API 키 |
| images | NodeList/Array | 광고를 표시할 이미지 요소들 |
| writingTime | string | ISO 8601 형식 날짜 |
| callback | function/null | 콜백 함수 (선택) |

### 3.3 p_box 중심 크롭 활성화 (중요!)

```
[규칙 3.3.1] window.AediAgent를 설정해야 p_box 중심 크롭 기능이 활성화됨
[규칙 3.3.2] AediAgent가 없으면 aedi-ad.js의 p_box 관련 코드가 실행되지 않음
```

**필수 설정:**
```javascript
// AediAgent 설정 (p_box 중심 크롭 기능 활성화)
if (typeof window.AediAgent === 'undefined') {
  window.AediAgent = {
    abfData: {},
    adResponseData: {},
    log: function(msg) { console.log('[AediAgent]', msg); }
  };
}
```

### 3.4 스크립트 주입 규칙

```
[규칙 3.4.1] 로컬 스크립트 파일 사용 (src/aedi/ 폴더) - CORS/CSP 문제 방지
[규칙 3.4.2] indirect eval 사용: (0, eval)(code) - 전역 스코프에서 실행
[규칙 3.4.3] 일반 eval()은 IIFE 내부 스코프에서만 실행됨 - 사용 금지!
[규칙 3.4.4] script.textContent는 webview에서 실행되지 않음 - 사용 금지!
```

**올바른 스크립트 실행:**
```javascript
// 전역 스코프에서 실행 (indirect eval)
(0, eval)(scriptContent);

// 잘못된 방법 - 지역 스코프에서만 실행됨
eval(scriptContent);  // IIFE 내부에서 사용 시 문제 발생
```

### 3.5 로컬 스크립트 파일

| 국가 | JS 파일 | CSS 파일 |
|------|---------|----------|
| 한국 | `src/aedi/aedi-ad.js` | `src/aedi/aedi-ad.css` |
| 태국 | `src/aedi/aedi-ad-th.js` | `src/aedi/aedi-ad-th.css` |

---

## 4. P-Box 및 캔버스 클리핑 규칙 (핵심)

### 4.1 캔버스 크기

| 용도 | 크기 |
|------|------|
| 계산/프리뷰 | 136 x 166 픽셀 |
| 실제 렌더링 | 166 x 184 픽셀 |

### 4.2 클리핑 삼각형 (136x166 기준)

```
꼭짓점: (0,0), (125,0), (0,165)
```

**시각화:**
```
    0                  125  136
  0 ┌───────────────────*────┐
    │                  /     │
    │                 /      │
    │                /       │
    │               /        │
    │   보이는     /   클리핑 │
    │    영역     /    제외   │
    │            /     영역   │
    │           /            │
    │          /             │
    │         /              │
    │        /               │
    │       /                │
165 *──────/─────────────────┤
166 └────────────────────────┘
```

### 4.3 대각선 방향 (매우 중요!)

```
[규칙 4.3.1] 대각선은 (125, 0) → (0, 165) 방향
[규칙 4.3.2] 오른쪽 위에서 왼쪽 아래로 내려가는 방향 (/ 형태)
[규칙 4.3.3] 기울기: DIAG_SLOPE = 165 / 125 = 1.32
[규칙 4.3.4] 대각선 방정식: y = 165 - 1.32 * x
```

### 4.4 삼각형 중심 (Centroid)

```javascript
triangleCenterX = 125 / 3;  // ≈ 41.67
triangleCenterY = 165 / 3;  // ≈ 55
```

p_box의 중심이 이 삼각형 중심에 오도록 크롭 위치를 계산합니다.

### 4.5 P-Box 좌표 형식

```javascript
p_box: [x_min, y_min, x_max, y_max]  // 정규화된 값 (0~1 범위)
```

예시: `[0.1, 0.2, 0.8, 0.9]`

---

## 5. 기능별 동작 규칙

### 5.1 앱 시작 화면 (Welcome Page)

```
[규칙 5.1.1] 앱 시작 시 welcome.html 페이지 자동 로드
[규칙 5.1.2] 뉴스 사이트 바로가기 그리드 표시 (6개 사이트)
[규칙 5.1.3] welcome 페이지 URL은 주소창에 표시하지 않음 (빈 값 유지)
```

**뉴스 사이트 목록 (10개):**
| 사이트명 | URL |
|----------|-----|
| 뉴스원 | https://www.news1.kr/ |
| 톱스타뉴스 | https://www.topstarnews.net/ |
| 스타뉴스 | https://www.starnewskorea.com/ |
| 뉴스펍 | https://www.newspub.kr/ |
| 스타패션 | https://www.kstarfashion.com/ko-kr |
| 스포츠투데이 | http://m.stoo.com/ |
| 비즈엔터 | https://enter.etoday.co.kr/ |
| 디스패치 | https://www.dispatch.co.kr/ |
| 파이낸셜뉴스 | https://star.fnnews.com/ |
| 내외일보 | https://www.naewoeilbo.com/ |

**Welcome 페이지 로드 코드:**
```javascript
// DOMContentLoaded 시 welcome 페이지 로드
const welcomePath = await window.electronAPI.getWelcomePath();
elements.webview.src = welcomePath;

// URL 바에 welcome 페이지 경로 표시 안 함
elements.webview.addEventListener('did-stop-loading', () => {
  const currentUrl = elements.webview.getURL();
  if (!currentUrl.includes('welcome.html')) {
    elements.urlInput.value = currentUrl;
  } else {
    elements.urlInput.value = '';
  }
});
```

### 5.2 웹사이트 로드 (URL 바 숨김)

```
[규칙 5.2.1] URL 바는 숨김 처리 - welcome 페이지 바로가기로만 이동 가능
[규칙 5.2.2] 로딩 중에는 오버레이 표시
[규칙 5.2.3] 직접 URL 입력 불가 - 보안 및 사용 편의성 위해 제한
```

### 5.2.1 모바일 보기 기능

```
[규칙 5.2.1.1] 📱 버튼 클릭으로 모바일/데스크톱 보기 토글
[규칙 5.2.1.2] 모바일 모드 시 iPhone User Agent로 변경
[규칙 5.2.1.3] 웹뷰 크기 375px 너비로 제한 (iPhone 크기)
[규칙 5.2.1.4] 모드 전환 시 자동 리로드
```

**모바일 User Agent:**
```javascript
const MOBILE_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';
```

**모바일 보기 토글 코드:**
```javascript
function toggleMobileView() {
  state.mobileMode = !state.mobileMode;

  if (state.mobileMode) {
    // 모바일 모드 활성화
    webviewContainer.classList.add('mobile-mode');
    elements.webview.setUserAgent(MOBILE_USER_AGENT);
  } else {
    // 데스크톱 모드로 복귀
    webviewContainer.classList.remove('mobile-mode');
    elements.webview.setUserAgent('');
  }

  // 현재 페이지 리로드
  elements.webview.reload();
}
```

### 5.3 이미지 선택 모드 (중요! - 즉시 확정 방식)

```
[규칙 5.3.1] 선택 모드 진입 시 커서를 crosshair로 변경
[규칙 5.3.2] 이미지 클릭 시 즉시 data-aedi-ad 속성 부여 (확인 버튼 불필요!)
[규칙 5.3.3] 다시 클릭하면 선택 해제 (토글)
[규칙 5.3.4] ESC 키 또는 완료 버튼으로 선택 모드 종료
[규칙 5.3.5] webview에서는 require() 사용 불가 - polling 방식으로 선택 상태 확인
[규칙 5.3.6] 선택된 이미지 수가 실시간으로 UI에 반영됨
```

**즉시 확정 방식 코드:**
```javascript
window._aediClickHandler = function(e) {
  if (!window._aediSelectMode) return;

  const img = e.target.closest('img');
  if (img) {
    e.preventDefault();
    e.stopPropagation();

    if (img.hasAttribute('data-aedi-ad')) {
      // 선택 해제 - data-aedi-ad 제거
      img.removeAttribute('data-aedi-ad');
      // 스타일 제거...
    } else {
      // 즉시 확정 - data-aedi-ad 속성 바로 설정
      img.setAttribute('data-aedi-ad', window._aediAdIndex++);
      // 스타일 적용...
    }
  }
};
```

**선택된 이미지 스타일링 (CSS !important 필수):**
```javascript
// 사이트 CSS에 덮어씌워지지 않도록 !important 사용 필수!
img.style.cssText += 'outline: 5px solid #00d9a5 !important; box-shadow: 0 0 20px 5px rgba(0, 217, 165, 0.8) !important; filter: brightness(1.1) !important;';
```

- **색상**: 에메랄드색 `#00d9a5`
- **테두리**: `outline: 5px solid #00d9a5 !important`
- **그림자**: `box-shadow: 0 0 20px 5px rgba(0, 217, 165, 0.8) !important`
- **밝기 증가**: `filter: brightness(1.1) !important`

**스타일 제거 시:**
```javascript
// !important 스타일은 일반적인 방법으로 제거 안됨 - cssText에서 직접 제거
img.style.cssText = img.style.cssText
  .replace(/outline:[^;]+!important;?/g, '')
  .replace(/box-shadow:[^;]+!important;?/g, '')
  .replace(/filter:[^;]+!important;?/g, '');
```

### 5.4 Save 버튼 (기존 스크립트 제거 후 로컬 버전 주입)

```
[규칙 5.4.1] Save 클릭 시 기존 aedi-ad.js, aedi-ad.css 먼저 제거
[규칙 5.4.2] 기존 Aedi 인스턴스 및 전역 객체 정리
[규칙 5.4.3] 프로젝트 로컬 버전(src/aedi/)으로 새로 주입
[규칙 5.4.4] 항상 새로운 스크립트로 덮어씀 (중복 체크 없음)
```

**Save 버튼 동작 코드:**
```javascript
async function saveConfig() {
  // 1. 기존 aedi-ad.js, aedi-ad.css 제거
  await elements.webview.executeJavaScript(`
    (function() {
      // 기존 CSS 제거 (link 태그 + style 태그)
      document.querySelectorAll('link[href*="aedi-ad"], style[data-aedi-css]').forEach(el => el.remove());

      // 기존 JS 제거 (script 태그)
      document.querySelectorAll('script[src*="aedi-ad"], script[data-aedi-script]').forEach(el => el.remove());

      // Aedi 인스턴스 및 관련 전역 객체 제거
      if (window._aediInstance) {
        if (window._aediInstance.interval) {
          Object.keys(window._aediInstance.interval).forEach(key => {
            clearInterval(window._aediInstance.interval[key]);
          });
        }
        window._aediInstance = null;
      }

      // Aedi 클래스 제거
      if (typeof Aedi !== 'undefined') {
        try { delete window.Aedi; } catch(e) {}
      }

      window.aedi_script = undefined;
    })();
  `);

  // 2. 로컬 스크립트 주입
  await injectAgent();
}
```

### 5.5 광고 시작/중지

```
[규칙 5.5.1] Start 전 반드시 이미지 선택 필요 (없으면 에러 표시)
[규칙 5.5.2] aedi.adOpen(apiKey, images, writingTime, null) 형식으로 호출
[규칙 5.5.3] Stop 시 aedi.adCloseAll() 호출 및 interval 정리
[규칙 5.5.4] Stop 시 canvas, link 객체 정리 및 DOM 요소 제거
[규칙 5.5.5] Restart = Stop + 500ms 대기 + Start
[규칙 5.5.6] Restart 시 _aediInstance를 null로 리셋 후 새로 생성
```

### 5.6 P-Box Viewer

```
[규칙 5.6.1] 별도 자식 윈도우로 열기
[규칙 5.6.2] 이미 열려있으면 포커스만 이동
[규칙 5.6.3] 메인 윈도우 닫히면 P-Box Viewer도 닫기
[규칙 5.6.4] 광고 선택 드롭다운에서 ad_0, ad_1 등 선택하여 보기
[규칙 5.6.5] aedi.canvas 객체의 키로 광고 ID 목록 조회
```

### 5.7 가이드 다운로드 기능

```
[규칙 5.7.1] 웹뷰의 현재 URL 호스트명으로 파일명 생성 (예: www.news1.kr.txt)
[규칙 5.7.2] 현재 설정된 API Key와 날짜가 자동 반영
[규칙 5.7.3] Blob 생성 후 다운로드 링크로 저장
```

**가이드 템플릿:**
```html
// !중요! 반드시 기사 본문보다 아래에 삽입하셔야 합니다 !!
<link rel='stylesheet' href='https://api.aedi.ai/common/css/v1/aedi-ad.css'>
<script src='https://api.aedi.ai/common/js/v1/aedi-ad.js'></script>
<script type='text/javascript'>
    var AEDI_API_KEY = '${apiKey}'; //발급된 apikey
    var aedi = new Aedi();
    var aediWritingTime = '${date}';       // 반드시 기사 날짜가 입력되어야 광고가 노출됩니다.
    var imgSelector = document.querySelectorAll('img[data-aedi-ad]');  // .img 해당 부분에 기사 이미지에 해당하는 Selector 요소를 입력해 주세요
    aedi.adOpen(AEDI_API_KEY, imgSelector, aediWritingTime);
</script>
```

---

## 6. UI/UX 규칙

### 6.1 상태 표시

| 상태 | 색상 | 용도 |
|------|------|------|
| `info` | 기본 | 일반 정보, 진행 중 |
| `success` | 녹색 | 성공, 완료 |
| `error` | 빨강 | 에러, 실패 |

### 6.2 버튼 배치
```
[상단 툴바]
┌───────────────────────────────────────┐
│                     📱  🔧  🤖 Agent │
└───────────────────────────────────────┘
  📱 = 모바일 보기 토글
  🔧 = 개발자 도구
  🤖 Agent = 에이전트 패널 열기 + 스크립트 주입

[메인 컨트롤]
┌──────┬──────┬──────┬──────┐
│ Save │Start │ Stop │Restart│
└──────┴──────┴──────┴──────┘

[도구]
┌─────────────────┐
│ [드롭다운 ▼] 📦 │  ← P-Box Viewer (광고 선택)
├─────────────────┤
│  📄 가이드 다운  │  ← AEDI 스크립트 가이드 다운로드
└─────────────────┘
```

### 6.3 패널 동작
```
[규칙 6.3.1] Agent 버튼 클릭 시 에이전트 패널 열기 + 스크립트 주입
[규칙 6.3.2] Save 버튼 = 기존 스크립트 제거 + 로컬 버전 새로 주입
[규칙 6.3.3] X 버튼으로 패널 닫기 (숨기기만, 제거 아님)
```

---

## 7. 데이터 규칙

### 7.1 상태 관리 (state 객체)

```javascript
const state = {
  nation: 'kr',              // 현재 선택된 국가
  apiKey: '...',             // 현재 국가의 API Key
  selectedImages: [],        // 선택된 이미지 배열
  imageSelectionMode: false, // 이미지 선택 모드 여부
  selectionInterval: null,   // 선택 상태 polling interval
  capturedAds: {},           // 캡처된 광고 데이터 {adId: data}
  aediLoaded: false,         // AEDI 스크립트 로드 여부
  mobileMode: false          // 모바일 보기 모드 여부
};
```

### 7.2 날짜 형식
```
[규칙 7.2.1] ISO 8601 형식 사용
[규칙 7.2.2] 로컬 타임존 오프셋 포함
[규칙 7.2.3] 예시: "2024-01-15T14:30:00+09:00"
```

### 7.3 Aedi 인스턴스 데이터 구조

```javascript
window._aediInstance = {
  canvas: { ad_0: CanvasElement, ad_1: CanvasElement, ... },
  link: { ad_0: AnchorElement, ad_1: AnchorElement, ... },
  interval: { ad_0: intervalId, ad_1: intervalId, ... },
  abfData: { ad_0: {...}, ad_1: {...}, ... },
  adResponseData: { ad_0: {...}, ad_1: {...}, ... }
};
```

---

## 8. 보안 규칙

```
[규칙 8.1] nodeIntegration: false 유지
[규칙 8.2] contextIsolation: true 유지
[규칙 8.3] webview의 webpreferences에서 nodeIntegration 비활성화
[규칙 8.4] preload 스크립트를 통해서만 API 노출
[규칙 8.5] 로컬 스크립트 파일 사용으로 외부 CSP 영향 회피
```

---

## 9. 에러 처리 규칙

```
[규칙 9.1] 사용자 액션 실패 시 상태바에 에러 메시지 표시
[규칙 9.2] 이미지 로드 실패 시 alert로 알림
[규칙 9.3] "Aedi not loaded" 에러 시:
          - Aedi 클래스 존재 확인 (typeof Aedi !== 'undefined')
          - 스크립트가 전역 스코프에서 실행되었는지 확인
[규칙 9.4] "aedi not loaded" 에러 시: 대소문자 확인! (Aedi vs aedi)
[규칙 9.5] webview 콘솔 메시지 중 [AEDI 포함된 것만 메인 콘솔에 출력
```

---

## 10. 개발 시 주의사항 (트러블슈팅)

### 10.1 스크립트가 실행되지 않을 때

| 증상 | 원인 | 해결 |
|------|------|------|
| `typeof Aedi: undefined` | 일반 `eval()` 사용 | `(0, eval)()` indirect eval 사용 |
| `script.textContent` 후 실행 안됨 | webview에서 textContent로 추가된 스크립트 미실행 | `executeJavaScript()`로 직접 실행 |
| IIFE 내부에서만 접근 가능 | 지역 스코프 문제 | indirect eval로 전역 스코프 실행 |

### 10.2 p_box 중심 크롭이 안될 때

| 증상 | 원인 | 해결 |
|------|------|------|
| 광고가 Canvas Preview와 다르게 표시 | `window.AediAgent` 미설정 | AediAgent 객체 설정 추가 |
| `[AEDI Agent] p_box 사용:` 로그 없음 | useP_box 조건 false | window.AediAgent 정의 확인 |

### 10.3 webview가 로드되지 않을 때

| 증상 | 원인 | 해결 |
|------|------|------|
| webview 빈 화면 | `webviewTag: true` 미설정 | BrowserWindow webPreferences에 추가 |
| URL 이동 안됨 | src 속성 문제 | `elements.webview.src = url` 사용 |

### 10.4 이미지 선택 스타일이 안보일 때

| 증상 | 원인 | 해결 |
|------|------|------|
| 테두리/그림자가 표시 안됨 | 사이트 CSS가 덮어씀 | `!important` 사용 필수 |
| 선택 해제 시 스타일 남음 | `style.outline = ''`로 제거 안됨 | `cssText`에서 직접 정규식으로 제거 |

---

## 11. 빌드 및 배포 규칙

### 11.1 빌드 명령어
```bash
npm run build:win    # Windows exe 생성
npm run build:mac    # macOS (DMG)
npm run build:linux  # Linux (AppImage)
```

### 11.2 빌드 결과물

```
dist/
├── win-unpacked/           # 압축 전 원본 폴더
│   └── AEDI Agent.exe      # 실행 파일 (~169MB)
├── AEDI-Agent-Portable.zip # 배포용 압축 파일 (~103MB)
└── builder-debug.yml       # 빌드 로그
```

### 11.3 배포 방법

```
[규칙 11.3.1] dist/ 폴더는 .gitignore에 포함 - GitHub에 업로드하지 않음
[규칙 11.3.2] AEDI-Agent-Portable.zip을 직접 공유 (이메일, 클라우드, USB 등)
[규칙 11.3.3] 사용자는 압축 해제 후 "AEDI Agent.exe" 실행
```

### 11.4 앱 정보
```
appId: com.aedi.agent
productName: AEDI Agent
```

---

## 부록: API Key 참조

| 환경 | 국가 | API Key |
|------|------|---------|
| Production | 한국 | `dba132f6ab6a3e3d17a8d59e82105f4c` |
| Production | 태국 | `2a0f97f81755e2878b264adf39cba68e` |

---

## 부록: 핵심 코드 패턴

### 스크립트 주입 패턴
```javascript
// CSS 주입
await elements.webview.executeJavaScript(`
  (function() {
    if (!document.querySelector('style[data-aedi-css]')) {
      const style = document.createElement('style');
      style.setAttribute('data-aedi-css', 'kr');
      style.textContent = ${JSON.stringify(cssContent)};
      document.head.appendChild(style);
    }
  })();
`);

// JS 주입 (indirect eval - 전역 스코프)
await elements.webview.executeJavaScript(`
  (function() {
    (0, eval)(${JSON.stringify(jsContent)});
  })();
`);
```

### 광고 시작 패턴
```javascript
const result = await elements.webview.executeJavaScript(`
  (function() {
    // Aedi 인스턴스 생성
    if (!window._aediInstance) {
      window._aediInstance = new Aedi();
    }

    // AediAgent 설정 (p_box 중심 크롭 활성화)
    if (typeof window.AediAgent === 'undefined') {
      window.AediAgent = {
        abfData: {},
        adResponseData: {},
        log: function(msg) { console.log('[AediAgent]', msg); }
      };
    }

    const aedi = window._aediInstance;
    const images = document.querySelectorAll('img[data-aedi-ad]');

    aedi.adOpen(apiKey, images, writingTime, null);

    return { success: true };
  })();
`);
```

### 이미지 선택 스타일 적용 패턴
```javascript
// 선택 시 - !important 사용 필수
img.style.cssText += 'outline: 5px solid #00d9a5 !important; box-shadow: 0 0 20px 5px rgba(0, 217, 165, 0.8) !important; filter: brightness(1.1) !important;';

// 해제 시 - cssText에서 직접 제거
img.style.cssText = img.style.cssText
  .replace(/outline:[^;]+!important;?/g, '')
  .replace(/box-shadow:[^;]+!important;?/g, '')
  .replace(/filter:[^;]+!important;?/g, '');
```

---

## 부록: 프로젝트 파일 구조

```
aedi-agent-electron/
├── src/
│   ├── main.js          # Electron 메인 프로세스
│   ├── preload.js       # 컨텍스트 브릿지
│   ├── renderer.js      # UI 로직
│   ├── index.html       # 메인 HTML
│   ├── styles.css       # 스타일
│   ├── welcome.html     # 앱 시작 화면 (뉴스 사이트 바로가기)
│   ├── pbox-viewer.html # P-Box Viewer 윈도우
│   └── aedi/            # AEDI 스크립트 (로컬)
│       ├── aedi-ad.js
│       ├── aedi-ad.css
│       ├── aedi-ad-th.js
│       └── aedi-ad-th.css
├── dist/                # 빌드 결과물 (gitignore)
├── node_modules/        # 의존성 (gitignore)
├── package.json
├── Agent.md             # 이 문서
└── .gitignore
```

---

## 부록: IPC API 참조

### main.js → preload.js → renderer.js

| IPC 핸들러 | 용도 | 반환값 |
|------------|------|--------|
| `open-pbox-viewer` | P-Box Viewer 창 열기 | void |
| `open-external-url` | 외부 URL 열기 | void |
| `fetch-script` | 외부 스크립트 fetch (CORS 우회) | `{success, data/error}` |
| `load-aedi-scripts` | 로컬 AEDI 스크립트 로드 | `{success, css, js/error}` |
| `get-welcome-path` | welcome.html 파일 경로 | `file://...path` |

### preload.js에서 노출되는 API (window.electronAPI)

```javascript
window.electronAPI = {
  openPBoxViewer: (data) => ...,
  openExternalUrl: (url) => ...,
  onLoadPBoxData: (callback) => ...,
  fetchScript: (url) => ...,
  loadAediScripts: (nation) => ...,
  getWelcomePath: () => ...
};
```

---

*이 문서는 AEDI Agent Electron의 동작을 결정하는 기준 문서입니다. 모든 기능 구현 및 수정은 이 규칙을 따라야 합니다.*

*최종 업데이트: 2025년 1월*
