const ipcRenderer = require('electron').ipcRenderer;

module.exports = function()
{
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
    ipcRenderer.send('automation-web-load', url);
  };

   this.type = function(selector, text)
  { 
    ipcRenderer.send('automation-web-action', `
      $("${selector}").val("${text}");
      `);
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