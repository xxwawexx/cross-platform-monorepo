const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe, limited API to the renderer process (your React app)
contextBridge.exposeInMainWorld('electronAPI', {
  // We are exposing a function called 'fetchUsers'
  fetchUsers: () => ipcRenderer.invoke('fetch-users'),
});