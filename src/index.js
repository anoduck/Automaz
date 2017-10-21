import { app, BrowserWindow, globalShortcut,ipcMain} from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';


import Nightmare from 'nightmare';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow,hostWindow,editorWindow;
let driverWindow, busWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);


if (isDevMode) enableLiveReload();

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    transparent:true,
    frame:false,
    alwaysOnTop :true,
    toolbar:false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);


  hostWindow = new BrowserWindow(
  {
    width: 800, 
    height: 600,
    x:0,
    y:0,
    /*
    webPreferences: { 
      preload: path.join(__dirname, 'injection.js')
    }
    */
  });
    hostWindow.loadURL(`file://${__dirname}/host.html`);


  editorWindow = new BrowserWindow(
  {
    width: 400, 
    height: 600,
    x:800,
    y:0,
    /*
    webPreferences: { 
      preload: path.join(__dirname, 'injection.js')
    }
    */
  });
    editorWindow.loadURL(`file://${__dirname}/editor.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(VUEJS_DEVTOOLS);
    mainWindow.webContents.openDevTools();
    hostWindow.webContents.openDevTools();
    editorWindow.webContents.openDevTools();
  }

  mainWindow.focus();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  

  driverWindow = mainWindow;
  busWindow = hostWindow;
 

 ipcMain.on('set-driver', function(event,arg){
    if(arg == 'search')
      driverWindow = mainWindow;
    else if(arg == 'editor')
    {
      driverWindow = editorWindow;

      if (isDevMode) enableLiveReload();
    }
 });

//IPC message for web loader

ipcMain.on('automation-web-load', function(event, arg) { 
    hostWindow.webContents.send('automation-web-load',arg);
    //hostWindow.webContents.loadURL(arg);
  });

ipcMain.on('automation-web-load-completed',function(event, arg) { 
    driverWindow.webContents.send('automation-web-load-completed',arg);
    //hostWindow.webContents.loadURL(arg);
  });


ipcMain.on('automation-web-action', function(event, arg) {  
      hostWindow.webContents.send('automation-web-action',arg);
      //hostWindow.webContents.executeJavaScript(arg);
    });

ipcMain.on('automation-web-action-completed',function(event, arg) { 
    driverWindow.webContents.send('automation-web-action-completed',arg);
    //hostWindow.webContents.loadURL(arg);
  });


ipcMain.on('automation-web-input', function(event, arg) {  
      hostWindow.webContents.send('automation-web-input',arg);
      //hostWindow.webContents.executeJavaScript(arg);
    });

ipcMain.on('automation-web-input-completed',function(event, arg) { 
    driverWindow.webContents.send('automation-web-input-completed',arg);
    //hostWindow.webContents.loadURL(arg);
  });
 

 ///////////////////////////////////////////////////////////
 // region 
 ipcMain.on('element-highlighted',function(event, arg) { 
    driverWindow.webContents.send('element-highlighted',arg);
    //hostWindow.webContents.loadURL(arg);
  });

 globalShortcut.register('CommandOrControl+Shift+T',()=>{
  hostWindow.webContents.send('turn-element-highlight',true);
});
/////////////////////////////////////////////////


globalShortcut.register('CommandOrControl+Shift+Z',()=>{
  mainWindow.show();
});

globalShortcut.register('CommandOrControl+Shift+P',()=>{
  mainWindow.webContents.executeJavaScript(`var autoweb = require('./autoweb');autoweb();`);
});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
