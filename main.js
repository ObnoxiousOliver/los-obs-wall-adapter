// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const config = require('./config')

console.log(config)

function createWindow () {
  // Get all displays

  const display = require('electron').screen.getAllDisplays()[config.display || 0]

  config.x += display.bounds.x
  config.y += display.bounds.y

  const mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    x: config.x,
    y: config.y,
    backgroundColor: '#000000',
    frame: false,
    transparent: true,
    // focusable: false,
    resizable: false,
    movable: false,
    maximizable: false,
    fullscreenable: false,
    roundedCorners: false,
    alwaysOnTop: true,
    hasShadow: false,
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
