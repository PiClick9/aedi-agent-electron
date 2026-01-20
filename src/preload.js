const { contextBridge, ipcRenderer } = require('electron');

// 안전한 API를 renderer에 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // P-Box Viewer 열기
  openPBoxViewer: (data) => ipcRenderer.invoke('open-pbox-viewer', data),

  // 외부 URL 열기
  openExternalUrl: (url) => ipcRenderer.invoke('open-external-url', url),

  // P-Box 데이터 수신 (P-Box Viewer 창에서 사용)
  onLoadPBoxData: (callback) => {
    ipcRenderer.on('load-pbox-data', (event, data) => callback(data));
  },

  // 외부 스크립트 fetch (CORS 우회)
  fetchScript: (url) => ipcRenderer.invoke('fetch-script', url),

  // 로컬 AEDI 스크립트 로드
  loadAediScripts: (nation) => ipcRenderer.invoke('load-aedi-scripts', nation)
});
