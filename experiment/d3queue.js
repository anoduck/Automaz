var d3 = require("d3-queue")

var q = d3.queue();

function task1(val)
{
	setTimeout(function(){
		console.log(val);
	},1000)
}

q.defer(task,1);
q.defer(task,2);


