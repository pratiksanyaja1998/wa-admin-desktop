// Render and control web pages.
//
// For more info, see:
// https://electronjs.org/docs/api/web-contents

const { app, BrowserWindow, webContents, autoUpdater } = require('electron')

if (require('electron-squirrel-startup')) return app.quit();

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
    contents.loadURL('https://admin.whitelabelapp.in', options);
  }, 1000);

  // const server = 'https://your-deployment-url.com'
  // const feed = `${server}/update/${process.platform}/${app.getVersion()}`

  // The following code won't work unless the app has been packaged.
  // You should only use the autoUpdater with packaged and code-signed
  // versions of your application.
  try {
    // autoUpdater.setFeedURL(feed);
    autoUpdater.checkForUpdates();
  } catch (error) {
    console.log(error)
  }

  // Once you've done that, you can go ahead and ask for updates:
  // autoUpdater.checkForUpdates()

  autoUpdater.on('checking-for-update', () => {
    console.log('The autoUpdater is checking for an update')
  })

  autoUpdater.on('update-available', () => {
    console.log('The autoUpdater has found an update and is now downloading it!')
  })

  autoUpdater.on('update-not-available', () => {
    console.log('The autoUpdater has not found any updates :(')
  })

  autoUpdater.on('update-downloaded', (event, notes, name, date) => {
    console.log('The autoUpdater has downloaded an update!')
    console.log(`The new release is named ${name} and was released on ${date}`)
    console.log(`The release notes are: ${notes}`)

    // The update will automatically be installed the next time the
    // app launches. If you want to, you can force the installation
    // now:
    autoUpdater.quitAndInstall()
  });
});
