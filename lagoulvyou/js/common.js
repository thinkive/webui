/*function checkMobile(){
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	if(isiPad){
		return false;
	}
	var isMobile=navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|operamobi|operamini|ucweb|windowsce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null;
	if(isMobile){
		return true;
	}
	return false;
}
(function(){
	if(checkMobile()){
		window.location.href="../m";
	}
})();*/
$(function () {
	/*$('#list img').click(function (e) {
		if(parseInt($('#info').css('right'))==0){
			$('#info').animate({right:-200},200).css('display','none');
			$('#frame').animate({left:0},200);
		}else{
			$('#info').animate({right:0},200).css({'display':'block','height':$('#frame').height()});
			$('#frame').animate({left:-200},200);
		}
	});*/
	$(window).manhuatoTop({
		showHeight : 400,//设置滚动高度时显示
		speed : 500 //返回顶部的速度以毫秒为单位
	});
})