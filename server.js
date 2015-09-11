var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var proxy = require('proxy-middleware'); // proxy for npm
var url = require('url'); // url parser
var connect = require('connect'); // connect server
var serveStatic = require('serve-static'); // serve static files

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object
var mainWindow = null;

// Keep a global reference of the server object
var server = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', function() {
  load_app();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  load_app();

  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function load_app () {

  // Launches the browser window
  mainWindow = new BrowserWindow({width: 375, height: 667});

  // If no server is running
  if (!server) {
    server = connect()
      .use('/innerproxy', proxy(url.parse('http://remotesource')))
      .use(serveStatic(__dirname + "/www/")).listen(1234);
  }

  // Load just launched server in browser window
  mainWindow.loadUrl("http://localhost:1234");
}