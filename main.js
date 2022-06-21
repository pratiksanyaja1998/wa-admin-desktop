// Render and control web pages.
//
// For more info, see:
// https://electronjs.org/docs/api/web-contents

const { app, BrowserWindow, webContents } = require('electron')

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({show: false, icon:'assets/logo.png'});
  mainWindow.loadFile('index.html');
  mainWindow.maximize();
  mainWindow.show();

  // This setTimeout is to demonstrate the method firing
  // for the demo, and is not needed in production.
  setTimeout(() => {
    const contents = webContents.getAllWebContents()[0]
    // The WebContents class has dozens of methods and
    // events available. As an example, we'll call one
    // of them here: loadURL, which loads Electron's
    // home page.
    const options = { extraHeaders: 'pragma: no-cache\n' }
    contents.loadURL('https://admin.whitelabelapp.in', options)
  }, 1000)
})
