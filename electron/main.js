var {app, BrowserWindow} = require('electron');
var mainWindow = null;

var xlsx = require('xlsx');

app.on('window-all-closed', function () {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 1200, height: 900});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});

exports.parseSpreadsheetFile = function (file) {
    return xlsx.readFile(file);
};