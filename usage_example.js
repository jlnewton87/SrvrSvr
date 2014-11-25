$(document).ready(function(){
	var saver = new SrvrSvr('http://localhost:8081')
	$('input:checkbox').change(function(){
		saver.request(JSON.stringify({id:this.id}));
	});
});
