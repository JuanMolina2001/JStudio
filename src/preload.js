const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('JStudio', {
    ipcRenderer: ipcRenderer,
    init: (options, callback) => {
        ipcRenderer.send('init-project', options)
        ipcRenderer.on('init-project-reply', (event, path) => {
            callback(path)
        })
    },
    getPathFiles: (callback) => {
        ipcRenderer.send('get-path-files')
        ipcRenderer.on('get-path-files-reply', (event, path) => {
            callback(files)
        })
    },
    fetchFiles: (path, callback) => {
        ipcRenderer.send('fetch-files', path)
        ipcRenderer.on('fetch-files-reply', (event, files) => {
            callback(files)
        })
    },
    openFile: (pathFile) => {
        ipcRenderer.send('open-file', pathFile)
    },
    getAssets: (projectPath, callback) => {
        ipcRenderer.send('get-assets', projectPath)
        ipcRenderer.on('get-assets-reply', (event, data) => {
            callback(data)
        })
    },
    onConsoleLog: (callback) => {
        ipcRenderer.on('console-logs', (event, logs) => {
            callback(logs)
        })
    },
    setSettings: (settings) => {
        ipcRenderer.send('set-settings', settings)
    },
    openJson(json, callback) {
        ipcRenderer.send('open-json', json)
    },
    ide: {
        onOpenFile: (callback) => {
            ipcRenderer.on('open-default-ide', (event, file) => {
                document.querySelector('#IDE').click()
                callback(file)
                console.log(file)
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
        onLog: (callback) => {
            ipcRenderer.on('log-command', (event, logs) => {
                callback(logs)
            })
        }
    }
})
