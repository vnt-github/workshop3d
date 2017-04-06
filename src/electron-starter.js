const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

let createWindow = () => {
    mainWindow = new BrowserWindow({ width: 1200, height: 700, frame: false, backgroundColor: '#000000' });
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => { mainWindow = null; });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
