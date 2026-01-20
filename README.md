# AEDI Agent Electron

AEDI 광고 설정 관리 및 P-Box 분석을 위한 독립 실행형 데스크톱 앱

## 주요 기능

- **웹사이트 로드**: URL을 입력하여 웹사이트 로드
- **AEDI 에이전트 주입**: 웹사이트에 AEDI 광고 스크립트 주입
- **이미지 선택**: 클릭으로 광고를 적용할 이미지 선택
- **국가 선택**: 한국/태국 서버 전환
- **P-Box Viewer**: P-Box 좌표 시각화 및 크롭 미리보기
- **ABF Editor**: 배경색, 크롭 포인트, 리사이즈 비율 편집

## 설치 방법

```bash
# 의존성 설치
npm install

# 개발 모드 실행
npm start

# 빌드 (Windows)
npm run build:win

# 빌드 (macOS)
npm run build:mac

# 빌드 (Linux)
npm run build:linux
```

## 사용 방법

1. 앱 실행 후 상단 URL 바에 테스트할 웹사이트 주소 입력
2. **Agent** 버튼 클릭하여 에이전트 패널 열기
3. 국가 선택 (한국/태국)
4. **🎯 Select** 버튼으로 이미지 선택 모드 진입
5. 웹페이지에서 광고를 적용할 이미지들 클릭
6. **ESC** 키로 선택 모드 종료
7. **Save** 버튼으로 AEDI 스크립트 로드
8. **Start** 버튼으로 광고 시작

## 파일 구조

```
aedi-agent-electron/
├── package.json          # 프로젝트 설정
├── src/
│   ├── main.js          # Electron 메인 프로세스
│   ├── preload.js       # 프리로드 스크립트 (IPC)
│   ├── index.html       # 메인 UI
│   ├── styles.css       # 스타일시트
│   ├── renderer.js      # 렌더러 프로세스 로직
│   └── pbox-viewer.html # P-Box 뷰어
├── assets/              # 아이콘 등 리소스
└── README.md
```

## 국가별 설정

| 국가 | API Key | 서버 |
|------|---------|------|
| 한국 | `9e406957d45fcb6c6f38c2ada7bace91` | api.aedi.ai |
| 태국 | `2a0f97f81755e2878b264adf39cba68e` | thapi.aedi.ai |

## 개발

### 요구사항
- Node.js 18+
- npm 9+

### 개발자 도구
앱 실행 중 **🔧** 버튼을 클릭하면 웹뷰의 개발자 도구가 열립니다.

## 라이센스

MIT
