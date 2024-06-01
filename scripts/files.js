const args = process.argv.slice(2);
const fs = require('fs');
const path = require('path');
if(args.includes('--local')) {
  fs.writeFileSync('./src/main.json', JSON.stringify({
    htmlPath: `file:/${path.join(__dirname, '../src//renderer/index.html')}`
}, null, 2));
}
if(args.includes('--server')) {
 fs.writeFileSync('./src/main.json', JSON.stringify({
    htmlPath: 'http://localhost:3001/',
}, null, 2));
}