const {exec} = require('child_process');

// argument variables
const args = process.argv.slice(2);
const command = args[0];
const favorite = args[1];
const url = args[2];

// display usage function
function displayUsage() {
    console.log(`
        Open: npm start open <favorite>
        Add: npm start add <favorite> <url>
        Remove: npm start rm <favorite>
        `)
}

// open function
function open(favorite) {

    // generate the url based on the input
    let url;
    if (favorite === 'goog') {
        url = 'https://google.com'
    } else if (favorite === 'social') {
        url = 'https://instagram.com';
    } else if (favorite === 'code') {
        url = 'https://leetcode.com'
    } else {
        console.log('shortcut', favorite, 'does not exist');
        return;
    }

    // platform independant command generation
    let command;
        switch (process.platform) {
        case 'darwin' :
            command = `open -a Google Chrome ${url}`;
            break;
        case 'win32' :
            command = `start chrome ${url}`;
            break;
        case 'linux':
            command = `google-chrome ${url}`;
            break;
        default:
            console.log('Unsupported Platform');
    }
    
    // execute the command
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
    });

    console.log('Opening', url);
}

// add function
function add(favorite, url) {
    console.log(favorite, url)
}

// remove function
function rm(favorite) {
    console.log(favorite)
}

// check arguments
if (!command || !favorite || command === "help") {
    displayUsage();
} else {
    switch (command) {
        case "open": 
            open(favorite);
            break;
        case "add":
            if (!url) {
                displayUsage();
            }
            add(favorite, url);
            break;
        case "rm": 
            rm(favorite);
            break;
    }
}
