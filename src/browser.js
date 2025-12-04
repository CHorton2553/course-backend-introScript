const {exec} = require('child_process');

let command;

switch (process.platform) {
    case 'darwin' :
        command = 'open -a Google Chrome https://yahoo.com';
        break;
    case 'win32' :
        command = 'start chrome https://yahoo.com';
        break;
    case 'linux':
        command = 'google-chrome https://yahoo.com';
        break;
    default:
        console.log('Unsupported Platform');
}

exec(command, (error, stdout, stderr) => {
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