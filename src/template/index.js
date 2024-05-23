const { exec } = require('child_process');
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');


exports.createProject = (options, result, event) => {
    const projectPath = path.join(result, options.name);
    const dir = path.normalize(projectPath)
    exec(`mkdir ${dir} && npx create-electron-app ${dir}`, (error, stdout, stderr) => {
        if (error) {
            dialog.showErrorBox('Error', error.message);
            return;
        }
        dialog.showMessageBox('Proyecto creado con éxito', 'El proyecto se ha creado con éxito.')
    });

    fs.writeFileSync(path.join(dir, 'src', 'index.html'), `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${options.name}</title>
    </head>
    <body>
      
    </body>
    </html>` )
    fs.writeFileSync(path.join(dir, 'src', 'style.css'), '')
    event.reply('init-project-reply', {
        name: options.name,
        path: dir.replace(/\\/g, '/')
    });
}
exports.openProject = () => {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        })
            .then((result) => {
                if (result.canceled) return
                const projectPath = result.filePaths[0]
                const dir = path.normalize(projectPath)
                fs.readdir(dir, (err, files) => {
                    if (err) {
                        return dialog.showErrorBox('No se pudo leer el directorio:', err.message);
                    }
                    if (!files.includes('package.json')) {
                        dialog.showErrorBox('Error', 'El directorio seleccionado no es un proyecto de JStudio');
                        return;
                    }
                    resolve({
                        name: path.basename(dir),
                        path: dir.replace(/\\/g, '/')
                    });
                });
            }).catch(err => {
                reject(err);
            });
    });
}
exports.openDefault = (projectPath, event) => {
    const dir = path.normalize(projectPath)
    fs.readdir(dir, (err, files) => {
        if (err) {
            return dialog.showErrorBox('No se pudo leer el directorio:', err.message);
        }
        if (!files.includes('package.json')) {
            dialog.showErrorBox('Error', 'El directorio seleccionado no es un proyecto de JStudio');
            return;
        }
        event.reply('init-project-reply', {
            name: path.basename(dir),
            path: dir.replace(/\\/g, '/')
        });
    });
};

