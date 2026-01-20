const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

let mainWindow;
let pboxViewerWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
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

// 앱 준비 완료
app.whenReady().then(() => {
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
