const { Menu, BrowserWindow } = require('electron')
const path = require('path')
const isMac = process.platform === 'darwin'
const fs = require('fs')
const {htmlPath,local} = require('./main.json')
const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Project',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    console.log('New Project')
                }
            },
            {
                label: 'Open Project',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    console.log('Open Project')
                }
            },
            {
                label: 'Settings',
                accelerator: 'CmdOrCtrl+,',
                click: () => {
                    const win = new BrowserWindow({
                        width: 800,
                        height: 600,
                        resizable: false,
                        icon: path.join(__dirname, 'icon.png'),
                    })
                    
                    win.loadURL(htmlPath+'#/settings')

                    win.setMenu(null)
                }
            },
            {
                label: 'Exit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    console.log('Exit')
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: 'Redo',
                accelerator: 'CmdOrCtrl+Shift+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (_, focusedWindow) => {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Toggle DevTools',
                accelerator: isMac ? 'Cmd+Option+I' : 'Ctrl+Shift+I',
                click: (_, focusedWindow) => {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            }
        ]
    },

]
exports.MainMenu = Menu.buildFromTemplate(template)
