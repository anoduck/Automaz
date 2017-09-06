var allSolutions = [
{
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
        title: "get clipboard",
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
              name:"get clipboard",
              automation: `
              const {clipboard} = require('electron')
              result = clipboard.readText()
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

];

var solution = {
    find: function(keyword)
    {
      problemList = [];
      allSolutions.forEach(function(ele){
        if(ele.problemStatement.title.indexOf(keyword) >= 0) // TBE
          problemList.push(ele);
      });
      return problemList;
    }

}

module.exports = {
    methods: solution.find
}
