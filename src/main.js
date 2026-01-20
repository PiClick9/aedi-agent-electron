const { app, BrowserWindow, ipcMain, shell, session, net } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let pboxViewerWindow;

// CSP 헤더 제거 (webview에서 외부 스크립트 로드 허용)
function setupCSPBypass() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = { ...details.responseHeaders };

    // CSP 헤더 제거
    delete responseHeaders['content-security-policy'];
    delete responseHeaders['Content-Security-Policy'];
    delete responseHeaders['x-content-security-policy'];
    delete responseHeaders['X-Content-Security-Policy'];

    callback({ responseHeaders });
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    title: 'AEDI Agent'
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // DevTools (개발 중에만 사용)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (pboxViewerWindow) {
      pboxViewerWindow.close();
    }
  });
}

// P-Box Viewer 창 열기
function openPBoxViewer(data) {
  if (pboxViewerWindow) {
    pboxViewerWindow.focus();
    pboxViewerWindow.webContents.send('load-pbox-data', data);
    return;
  }

  pboxViewerWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    parent: mainWindow,
    title: 'P-Box Viewer'
  });

  pboxViewerWindow.loadFile(path.join(__dirname, 'pbox-viewer.html'));

  pboxViewerWindow.webContents.once('did-finish-load', () => {
    pboxViewerWindow.webContents.send('load-pbox-data', data);
  });

  pboxViewerWindow.on('closed', () => {
    pboxViewerWindow = null;
  });
}

// IPC 핸들러
ipcMain.handle('open-pbox-viewer', (event, data) => {
  openPBoxViewer(data);
});

ipcMain.handle('open-external-url', (event, url) => {
  shell.openExternal(url);
});

// 외부 스크립트 fetch (CORS 우회)
ipcMain.handle('fetch-script', async (event, url) => {
  return new Promise((resolve) => {
    const request = net.request(url);

    let data = '';

    request.on('response', (response) => {
      if (response.statusCode !== 200) {
        resolve({ success: false, error: `HTTP ${response.statusCode}` });
        return;
      }

      response.on('data', (chunk) => {
        data += chunk.toString();
      });

      response.on('end', () => {
        resolve({ success: true, data });
      });

      response.on('error', (err) => {
        resolve({ success: false, error: err.message });
      });
    });

    request.on('error', (err) => {
      resolve({ success: false, error: err.message });
    });

    request.end();
  });
});

// 로컬 AEDI 스크립트 로드
ipcMain.handle('load-aedi-scripts', async (event, nation) => {
  try {
    const aediDir = path.join(__dirname, 'aedi');
    const suffix = nation === 'th' ? '-th' : '';

    const cssPath = path.join(aediDir, `aedi-ad${suffix}.css`);
    const jsPath = path.join(aediDir, `aedi-ad${suffix}.js`);

    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    return {
      success: true,
      css: cssContent,
      js: jsContent
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
});

// 앱 준비 완료
app.whenReady().then(() => {
  // CSP 우회 제거 - 로컬 파일 사용으로 불필요
  // setupCSPBypass();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
