var SrvrSvr = {};
(
	function(){
		SrvrSvr = function(postUrl, callback, interval){
			if (typeof postUrl === 'undefined' || postUrl.length < 1) {
				throw new Error('Parameter must be URL to which data should be posted');
			}
			else if(typeof Q === 'undefined'){
				throw new Error('"Q" Library is a required dependency of SrvrSvr.');
			}
			else if (typeof callback === 'undefined') {
				throw new Error('A callback is required (what do you want to do with the server\'s response?)';
			};
			else{
				if (typeof interval === 'undefined') {
					var interval = 3000; //setting default interval
				};
				var output = {
					request: function(newData){
						if(!output.running){
							output.data = newData;
							output.resolve();
						}else if(!output.waiting){
							output.waiting = true;
							output.data = newData;
							output.req.abort();
							setTimeout(function(){
								output.waiting = false;
								output.resolve();
							}, interval);
						}else if(output.waiting){
							output.data = newData;
						}
					},
					data:{},
					running: false,
					waiting: false,
					req: new XMLHttpRequest(),
					def: Q.defer(),
					resolve: function(){
						output.def.resolve(output.data);
					}
				};
				initPromise();
				return output;
			}

			function initPromise(){
				output.def = Q.defer();
				output.def.promise.then(sendRequest, null).done(initPromise);
			}

			function sendRequest() {
				output.req = new XMLHttpRequest();
				output.running = true;
				output.req.open("POST", postUrl, true);
				output.req.setRequestHeader("Content-type","application/json");
				output.req.onreadystatechange = function(){
					if(output.req.readyState == 4 && output.req.status == 200){
						output.running = false;
						callback(output.req.responseText);
					}
				};
				output.req.send(output.data);
			}	
		};
	}
)()