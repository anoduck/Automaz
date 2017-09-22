var asyncClass = require("../experiment/async")


var async = new asyncClass();

var promise = async.type("textbox","hello");

 
async.click("button");