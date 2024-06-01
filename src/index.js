const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { ipcHandlers } = require('./ipc')
const { MainMenu } = require('./menu')
const { htmlPath} = require('./main.json')
function windowsManager(window) {
    const url = window.webContents.getURL();
    if (url.includes('new-project')) {
        window.setSize(300, 500)
        window.setResizable(false)
        window.setMenu(null)
        return
    }
    if (url.includes('editor')) {
        window.maximize()
        window.setResizable(true)
        window.setMinimumSize(1280, 720)
        window.setMenu(MainMenu)

    }
}
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            webSecurity: false,
        }
    })
    // win.setMenu(null)
    win.loadURL(htmlPath)
    ipcHandlers(win)
    win.on('page-title-updated', (event) => {
        event.preventDefault()
        windowsManager(win)
    })

}
app.icon = path.join(__dirname, 'icon.png')
app.whenReady().then(() => {
    createWindow();


});
app.on('browser-window-created', (event, window) => {
    window.webContents.session.setPreloads([path.join(__dirname, 'preload.js')]);
    window.webContents.on('did-finish-load', () => {
        windowsManager(window)
    });
});
ipcMain.on('restart_app', () => {
    app.relaunch()
    app.quit()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})