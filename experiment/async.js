module.exports = function ()
{

	this.type = function(selector,text){
		let promise = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve(selector + text);
			},2000)
		});
		return promise;
	}

	this.click = function(selector){
		let promise = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve(selector);
			},2000)
		});
		return promise;
	}

	this.tap = function(selector){
		let promise = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve(selector);
			},2000)
		});
		return promise;
	}

}
 
