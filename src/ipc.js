const { ipcMain, shell } = require("electron")

const path = require('path')
const fs = require('fs');
const { dialog } = require('electron')
const { createProject, openProject } = require('./template')
const { spawn } = require('child_process');
const { fileType, openDefault } = require('./utils')
let settings = require(`./build/public/settings.json`);
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
    ipcMain.on('get-assets', (event, ProjectPath) => {
        const html = fs.readFileSync(path.join(ProjectPath, 'src', 'index.html'), 'utf8')
        const style = fs.readFileSync(path.join(__dirname, 'build', 'styleRender.css'), 'utf8')
        const script = fs.readFileSync(path.join(__dirname, 'build', 'scriptRender.js'), 'utf8')
        event.reply('get-assets-reply', {
            html,
            style,
            script
        })
    })
    // settings
    ipcMain.on('set-settings', (event, newSettings) => {
        fs.writeFile(path.join(__dirname, 'build/public', 'settings.json'), JSON.stringify(newSettings), (err) => {
            if (err) {
                return console.log(err);
            }
            settings = newSettings
        });
    })
    ipcMain.on('open-json', (event, json) => {
        const filePath = path.join(__dirname, 'temp.json');
        fs.writeFile(filePath, JSON.stringify(json), (err) => {
            if (err) {
                return console.log(err);
            }
            openFile(filePath, event);
        });
    });
    // run project
    ipcMain.on('run-project', (event, projectPath) => {
        const process = spawn('npm', ['start', projectPath], { shell: true });
        event.reply('console-logs', {
            message: 'Starting project...',
            type: 'info'
        });
        // test de error
        event.reply('console-logs', {
            message: 'Error: test',
            type: 'error'
        });
        // test de warning
        event.reply('console-logs', {
            message: 'Warning: test',
            type: 'warning'
        });
        process.stdout.on('data', (data) => {
            event.reply('console-logs', {
                message: data.toString(),
                type: 'info'
            });
        });

        process.stderr.on('data', (data) => {
            if ((data.toString()).includes(`{"code":-32601,"message":"'Autofill.enable' wasn't found"}"`)) return
            event.reply('console-logs', {
                message: `Error: ${data.toString()}`,
                type: 'error'
            });
        });

        process.on('error', (error) => {
            event.reply('console-logs', {
                message: `Process error: ${error.message}`,
                type: 'error'
            });
        });

        process.on('close', (code) => {
            event.reply('console-logs', {
                message: `Process closed with code: ${code}`,
                type: 'info'
            });
        });
    });
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
        if(data.command === 'cd') {
            const newCwd = path.join(data.cwd , data.args[0]);
            try{
            process.chdir(newCwd);
            e.reply('run-command-reply', {
                message: newCwd,
                type: 'cwd'
            
            });
            return;
            }catch(err){
                e.reply('run-command-reply', {
                    message: `Error: ${err.message}`,
                    type: 'error'
                });
                return;
            }
        }
        const response = spawn(data.command, data.args, { shell: true, cwd: data.cwd });
        let output = ''; // Para acumular la salida estándar
        let errorOutput = ''; // Para acumular los errores
    
        response.stdout.on('data', (data) => {
            output += data.toString();
        });
    
        response.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });
    
        response.on('close', (code) => {
            if (errorOutput) {
                e.reply('run-command-reply', {
                    message: errorOutput,
                    type: 'error'
                
                });
            } else {
                e.reply('run-command-reply', {
                    message: output,
                    type: 'info'
                });
            }
            console.log(`Child process exited with code ${code}`);
        });
    
        response.on('error', (err) => {
            console.error(`Error spawning process: ${err}`);
            e.reply('run-command-reply', {
                message: `Error: ${err.message}`,
                type: 'error'
            });
        });
    });

}