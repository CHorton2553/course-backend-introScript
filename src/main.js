/*
import {exec} from 'child_process'
import open from 'open';

I could not get the open module to work no matter what I tried.
It will execute but it will not open the browser, and nothing online
or in the readme.md file for the open module seems to have a solution.

I will use the child_process exec function until another wall is hit later on.
*/

const {exec } = require('child_process');

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
async function openFavorite(favorite) {

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
    
    console.log('Opening', url);
    // await open(url);
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
            openFavorite(favorite);
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
