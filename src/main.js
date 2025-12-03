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
    console.log(favorite);
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
