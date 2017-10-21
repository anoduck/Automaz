open http://www.google.com
const AutoWeb = require('./autoweb');
var autoweb = new AutoWeb(); 
autoweb.loadURL("https://www.google.com"); 
autoweb.wait(1000); 

type "hello world" in textbox1
autoweb.type("#lst-ib","Hello, World!");



autoweb.type("#lst-ib","Hello, World 2!");
autoweb.enter();
autoweb.wait(2000);
autoweb.type("#lst-ib","Hello, World 3----!");
//autoweb.click("input[name='btnK']"); 
autoweb.select(0,0,500,500);
autoweb.copy();
autoweb.wait(2000); 
autoweb.done(this.stepCompleted);

