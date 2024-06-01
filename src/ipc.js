const { ipcMain, shell } = require("electron")

const path = require('path')
const fs = require('fs');
const { dialog } = require('electron')
const { createProject, openProject } = require('./template')
const { spawn } = require('child_process');
const { fileType, openDefault } = require('./utils')
let settings = require(`./settings.json`);
function openFile(filePath, event) {
    const type = fileType(filePath)
    if (settings.files[type].executable === 'default') {
        openDefault(filePath, type, event)
    }
    else if ('system') {
        shell.openPath(filePath)
    }
    else {
        const exePath = path.normalize(settings.files[type].executable)
        exec(`"${exePath}" "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                dialog.showErrorBox('Error', error.message);
                return;
            }
            if (stderr) {
                dialog.showErrorBox('Error', stderr);
                return;
            }
            console.log(`Salida estándar: ${stdout}`);
        });
    }
}
exports.ipcHandlers = (win) => {
    ipcMain.on('get-path-files', (event) => {
        dialog.showOpenDialog(win, {
            properties: ['openFile', 'openDirectory']
        })
            .then((result) => {
                if (result.canceled) return
                const path = result.filePaths[0]
                event.reply('get-path-files-reply', path)
            })
    })
    ipcMain.on('init-project', (event, options) => {
        options.create ?
            createProject(options, event)
                .then(response => {
                    event.reply('init-project-reply', response);
                })
            :
            openProject(options.path, event)
                .then(response => {
                    event.reply('init-project-reply', response);
                })
    })
    ipcMain.on('fetch-files', (event, projectPath) => {
        const dir = path.normalize(projectPath)
        fs.readdir(dir, (err, response) => {
            if (err) {
                // return dialog.showErrorBox('No se pudo leer el directorio:', err.message);
                return console.log(err)
            }
            const files = response.filter(file => !file.startsWith('.') && !file.includes('node_modules'))
            event.reply('fetch-files-reply', files)
        });
    })
    ipcMain.on('open-file', (event, filePath) => {
        openFile(filePath, event)
    })
    // get html, css and js files

    // settings
    ipcMain.on('set-settings', (event, newSettings) => {
        fs.writeFile(path.join(__dir,  'settings.json'), JSON.stringify(newSettings), (err) => {
            if (err) {
                return console.log(err);
            }
            settings = newSettings
        });
    })
    ipcMain.on('get-settings', (event) => {
        event.reply('get-settings-reply', settings)
    })
    // ide
    ipcMain.on('save-file', (event, file) => {
        console.log(file)
        fs.writeFile(path.normalize(file.path), file.content, (err) => {
            if (err) {
                return console.log(err);
            }

        });
    });
    ipcMain.on('get-ide-settings', (event) => {
        event.reply('get-ide-settings-reply', settings.ide)
    })
    // terminal
    ipcMain.on('run-command', (e, data) => {
        if (data.command.includes('cd')) {
            if (data.command === 'cd') {
                cwd = data.cwd;
                args = data.args[0]
            } else if (data.command === 'cd..') {
                cwd = data.cwd;
                args = '..'
            } else if (data.command === 'cd/') {
                cwd = data.cwd;
                args = '/'
            } else if (data.command === 'cd~') {
                cwd = data.cwd;
                args = '~'
            }

            const newCwd = path.join(data.cwd, data.args[0]);
            try {
                process.chdir(newCwd);
                e.reply('log-command', {
                    message: newCwd,
                    type: 'cwd'

                });
                return;
            } catch (err) {
                e.reply('log-command', {
                    message: `Error: ${err.message}`,
                    type: 'error'
                });
                return;
            }
        }
        const response = spawn(data.command, data.args, { shell: true, cwd: data.cwd });
        let errorOutput = ''; // Para acumular los errores

        response.stdout.on('data', (data) => {
            e.reply('log-command', {
                message: data,
                type: 'info'
            });
        });

        response.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        response.on('close', (code) => {
            if (errorOutput) {
                e.reply('log-command', {
                    message: errorOutput,
                    type: 'error'

                });
            }
            e.reply('log-command', {
                message: `Process closed with code: ${code}`,
                type: 'finish'
            });
        });

        response.on('error', (err) => {
            console.error(`Error spawning process: ${err}`);
            e.reply('log-command', {
                message: `Error: ${err.message}`,
                type: 'error'
            });
        });
    });

}