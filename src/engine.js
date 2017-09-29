const d3 = require("d3-queue")
const log = require("./log") 

module.exports =  function(options){
  	this.q = d3.queue(1); 

  	this.engineContext = {};

	this.execute = function(automationStep)
	{  
			this.q.defer(this.executeTask,  automationStep, this);
	};

	this.executeTask =  function(automationStep, engine, stepCompleted)
	{ 
		// this is executed in Queee's context
            log.info(`Evaluation Step ${automationStep.number} started`); 
            try{
            engine.evalInContext(automationStep.automation,
            	{
            		engineContext:engine.engineContext,
            		stepCompleted:stepCompleted,
            	});
	        }catch(e)
	        {stepCompleted(e)}
            //log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${engine.engineContext.result}`); 
            log.info(`Evaluation Step ${automationStep.number} execute successfully!`); 
			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${this.result}`); 

            if(automationStep.waitForStep){}
            else  stepCompleted(null);

	};


	this.evalInContext = function(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    	return function() { return eval(js); }.call(context);
	}
 
}