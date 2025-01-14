const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
  });

  win.loadFile('html/index.html');

  const template = [
    {
      label: 'Administrar',
      submenu: [
        { label: 'Salir', role: 'quit' }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        { label: 'Herramientas de desarrollo',
          click() {
            win.webContents.toggleDevTools()
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

ipcMain.handle('ruta-modelos', async () => {
    const rutaDeterminada = path.join(__dirname, '../models');
    return rutaDeterminada;
});

ipcMain.handle('ruta-imagenes', async () => {
    const rutaDeterminada = path.join(__dirname, '../labels');
    return rutaDeterminada;
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});