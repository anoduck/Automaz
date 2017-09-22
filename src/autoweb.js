const ipcRenderer = require('electron').ipcRenderer;
const d3 = require("d3-queue")

module.exports = function()
{

  this.q = d3.queue();


  this.setup = function()
  {  
    const {BrowserWindow} = require('electron').remote;
    hostWindow = new BrowserWindow({width: 800, height: 600});
    hostWindow.webContents.openDevTools();


    hostWindow.loadURL(`file://${__dirname}/host.html`);

/*
    win.webContents.once('did-navigate', () => {  
      win.webContents.once('dom-ready', () => { 
       win.webContents.executeJavaScript(`
        `);

     });
    }); 
    */
  };

  this.loaded = false;

  this.loadURL = function(url)
  { 
    this.q.defer(this.loadURLTask,url);
  };

 this.loadURLTask = function(url, callback)
  {  
    ipcRenderer.send('automation-web-load', url);
    ipcRenderer.on('automation-web-load-completed',function(event, arg) { 
       callback();
       console.log("driver automation-web-load-completed");
    });

  };


   this.type = function(selector, text)
  {     
    ipcRenderer.send('automation-web-action', `
      $("${selector}").val("${text}");
      `);
  };

  this.sendInput = function(arg)
  {
    ipcRenderer.send('automation-web-input', arg);
 
  };

  this.wait = function(ms=0)
  { 
    this.q.defer(this.waitTask, ms);
  }

   this.waitTask = function(ms=0, callback)
  { 
     setTimeout(function(){
         callback();
         console.log("waited " +ms)
      }, ms);
  }

   this.copy = function(arg)
  {
    this.sendInput(
{
    type: 'keyDown',
    keyCode: 'c',
    modifiers: ['control'],
});
  };

   this.click = function(selector)
  {
    ipcRenderer.send('automation-web-action', `
      $("${selector}").click();
      `);
  };
}



/*


        var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
script.type = 'text/javascript'; 
script.onload = function(){
        console.log("hello-----");

        var $ = window.jQuery;
        window.jQuery('#lst-ib').val('hello');
         
        window.jQuery("input[name='btnK']").click(); 
    };
document.getElementsByTagName('head')[0].appendChild(script);




function addJQueryScript() {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
  script.onload = script.onreadystatechange = function() {
    $(document).ready(() => {
      $("#lst-ib").val("Hello, World!");
      $("input[name='btnK']").click(); 
    });
  };
  document.body.appendChild(script);
}

let scriptAddInterval = setInterval(() => {
  if (document.readyState === "complete") {
    addJQueryScript();
    clearInterval(scriptAddInterval);
  }
});
*/