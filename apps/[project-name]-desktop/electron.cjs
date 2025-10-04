const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { spawn } = require('node:child_process');
const fs = require('node:fs');

let apiProcess = null;
const isDev = !app.isPackaged;

function startApi() {

  const apiPath = path.join(__dirname, '..', '[project-name]-api', 'dist', 'src', 'main.js');
  
  console.log(`[startApi] Attempting to run API from: ${apiPath}`);

  if (!fs.existsSync(apiPath)) {
    console.error(`[startApi] FATAL ERROR: API file not found at path: ${apiPath}`);
    console.error('[startApi] Please ensure "pnpm --filter [project-name]-api build" was successful and created the file.');
    app.quit();
    return;
  }

  console.log('[startApi] API file found. Spawning process...');
  
  apiProcess = spawn('node', [apiPath]);
  
  apiProcess.on('error', (err) => {
    console.error(`[startApi] Failed to start API process: ${err}`);
  });

  apiProcess.stdout.on('data', (data) => {
    console.log(`[API LOG]: ${data.toString()}`);
  });
  
  apiProcess.stderr.on('data', (data) => {
    console.error(`[API ERROR]: ${data.toString()}`);
  });

  apiProcess.on('close', (code) => {
    console.log(`[startApi] API process exited with code ${code}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.maximize();

  const url = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(url);

  if (isDev) {
    win.webContents.openDevTools();
  }
}

// --- App Lifecycle Events ---

app.whenReady().then(() => {
  startApi();
  createWindow();
});

app.on('will-quit', () => {
  if (apiProcess) {
    console.log('[will-quit] Killing API process to prevent zombies.');
    apiProcess.kill();
    apiProcess = null;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});