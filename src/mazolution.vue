<template>
  <div>
  {{info}}
  </div>
</template>

<script>


const _= require("underscore");

export default  {  
  methods:
  { 
   find:function(keyword)
   { 
     return _.filter(this.allSolutions,function(ele){
        return ele.problemStatement.title.indexOf(keyword) >= 0; // TBE 
      });  
  }
},
data(){
  return { 
    info:process.versions.electron,
allSolutions:
[{
    problemStatement :{
      title: "open @website",
      context: "",
      block:"",
      author:"linzhu"
    },
    solutions:[
      {
        enviroment:["automatwin","chrome"],
        steps:[
          {
            number: 1,
            name:"open chrome",
            automation: `
              const {shell} = require('electron')
              shell.openExternal("http://yahoo.com");
            `
          },{
            number: 2,
            name:"go to address bar",
            automation: `
            var robot = require("robotjs");
            //robot.keyTap("L","CTRL");
// Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
  y = height * Math.sin((twoPI * x) / width) + height;
  robot.moveMouse(x, y);
}
            `
          },{
            number: 3,
            name:"type @website",
            automation: "send @website"
          }
        ]
      }
    ]
  }
  , // #2
  {
      problemStatement :{
        title: "search google <query>",
        context: "",
        block:"",
        author:"linzhu"
      },
      solutions:[
        {
          enviroment:["electron"],
          steps:[
            {
              number: 1,
              name:"search ",
              automation: `
              const AutoWeb = require('./autoweb');
              var autoweb = new AutoWeb(); 
              //autoweb.setup();
              autoweb.loadURL("https://www.google.com"); 
              autoweb.type("#lst-ib","Hello, World!");
              //autoweb.click("input[name='btnK']"); 
            

              `
            }
          ]
        }
      ]
    }//
    , // #2
  {
      problemStatement :{
        title: "open links in selected area",
        context: "",
        block:"",
        author:"linzhu"
      },
      solutions:[
        {
          enviroment:["electron"],
          steps:[
            {
              number: 1,
              name:"copy selected area to clipboard",
              automation: `
              const AutoWeb = require('./autoweb');
              var autoweb = new AutoWeb(); 
              autoweb.loadURL("https://www.google.com"); 
              await autoweb.wait(2000);
              autoweb.copy();
              `
            },{
              number: 2,
              name:"get clipboard",
              automation: `
              const {clipboard} = require('electron')
              result = clipboard.readText()
              `
            },,{
              number: 3,
              name:"get links from clipboard content",
              automation: `
              const {clipboard} = require('electron')
              result = clipboard.readText()
              `
            }
          ]
        }
      ]
    }//
     , // #3
  {
      problemStatement :{
        title: "download",
        context: "",
        block:"",
        author:"linzhu"
      },
      solutions:[
        {
          enviroment:["electron"],
          steps:[
            {
              number: 1,
              name:"open google",
              automation: ` 

           var Application = require('spectron').Application
var assert = require('assert')
const path = require('path')

// Path to Electron
var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
if (process.platform === 'win32') electronPath += '.cmd'

// Path to your application
var appPath = path.join(__dirname, 'bin', 'package')

var app = new Application({
  path: electronPath,
  args: [appPath]
}) 

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.client.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.equal(title, 'My App')
}).then(function () {
  // Stop the application
  return app.stop()
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
})
              `
            }
          ]
        }
      ]
    }//


]
  }
}
}
</script>