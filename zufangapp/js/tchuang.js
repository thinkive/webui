$(function(){

	$('#loginform').submit(function(e){
		return false;
	});
	
	//弹出层调用语句
	$('#modaltrigger').leanModal({
		top:110,
		overlay:0.45,
		closeButton:".hidemodal"
	});
	
});
