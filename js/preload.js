const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    rutaModelos: () => ipcRenderer.invoke('ruta-modelos'),
    rutaImagenes: () => ipcRenderer.invoke('ruta-imagenes')
});
