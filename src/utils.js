
const { shell } = require('electron');
const fs = require('fs');
const path = require('path');

exports.fileType = (file) => {
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg', 'ico'].some(extension => file.includes(extension)))
        return 'image';
    if (['js', 'ts', 'html', 'css', 'scss', 'sass', 'less','txt', 'json'].some(extension => file.includes(extension)))
        return 'code';
    if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'wma', 'm4a', 'aiff', 'alac', 'pcm', 'dsd'].some(extension => file.includes(extension)))
        return 'audio';
}
exports.openDefault = (filePath, type,event ) => {

    if (type === 'code') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const response ={
                path: filePath,
                content:data,
                name: path.basename(filePath)
            }
            event.reply('open-default-ide', response)
            
        });
        return
    }
    shell.openPath(filePath) 

}