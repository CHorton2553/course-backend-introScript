const {exec} = require('child_process');
const path = require('path');
const fs = require('fs')

// the different paths needed
const currentPath = path.resolve();
const filesDir = path.resolve(currentPath, 'files');
const zippedDir = path.resolve(currentPath, 'zipped')
const zipFile = path.join(zippedDir, 'text.zip')

if (!fs.existsSync(zippedDir)) {
    fs.mkdirSync(zippedDir);
}

// set up the command independant of operating system
let zipCommand;
if (process.platform === 'win32') {
    zipCommand = `Powershell Compress-Archive -Path ${filesDir + path.sep} -DestinationPath ${zipFile}`
} else {
    zipCommand = `zip ${zipFile} ${filesDir + path.sep}*`
}

// error refers to problems with node
// stderr refers to problems with zip
exec(zipCommand, (error, stdout, stderr) => {
    if (error) {
        console.log('error:', error.message);
    }
    if (stderr) {
        console.log('error:', stderr);
    }
    if (error || stderr) {
        return;
    }
    console.log(stdout);
})
