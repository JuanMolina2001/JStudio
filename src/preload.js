const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('JStudio', {
    ipcRenderer: ipcRenderer,
    init: (options) => {
        return new Promise((resolve, reject) => {
        ipcRenderer.send('init-project', options)
        ipcRenderer.on('init-project-reply', (event, path) => {
            resolve(path)
        })
        })
    },
    getPathFiles: () => {
        return new Promise((resolve, reject) => {
        ipcRenderer.send('get-path-files')
        ipcRenderer.on('get-path-files-reply', (event, path) => {
            resolve(files)
        })
        })
    },
    fetchFiles: (path ) => {
        return new Promise((resolve, reject) => {
        ipcRenderer.send('fetch-files', path)
        ipcRenderer.on('fetch-files-reply', (event, files) => {
            resolve(files)
        })
        })
    },
    openFile: (pathFile) => {
        ipcRenderer.send('open-file', pathFile)
    },
 
    settings:{
        get: () => {
            return new Promise((resolve, reject) => {
            ipcRenderer.send('get-settings')
            ipcRenderer.on('get-settings-reply', (event, settings) => {
                resolve(settings)
            })
        })
        },
        set: (settings) => {
            ipcRenderer.send('set-settings', settings)
        }
    },
    ide: {
        onOpenFile: () => {
            return new Promise((resolve, reject) => {
            ipcRenderer.on('open-default-ide', (event, file) => {
                document.querySelector('#IDE').click()
                resolve(file)
                console.log(file)
            })
        })
        },
        saveFile: (file) => {
            ipcRenderer.send('save-file', file)
        },

    },
    terminal: {
        run: (data) => {
            ipcRenderer.send('run-command', data)
        },
        onLog: () => {
            return new Promise((resolve, reject) => {
            ipcRenderer.on('log-command', (event, logs) => {
                resolve(logs)
            })
        })
        }
    }
})
