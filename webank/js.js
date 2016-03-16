(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var page_total=8;//总共有多少页面
	var subpage_index=1;//当前在哪个子页
	var no_wipe=0;
	var main_list=$("#tab_list_1");
	
	function setMainList(num){
		var str="";
		for(var i=1;i<=num;i++){
			if(i==1){
				str+="<li class='current'><a href='##'><i>"+i+"</i></a></li>";
			}
			else if(i==num){
				str+="<li class='last'><a href='##'><i>"+i+"</i></a></li>";
			}
			else{
				str+="<li><a href='##'><i>"+i+"</i></a></li>";
			}
		}
		$(main_list).html(str);
	}
	
	setMainList(page_total);
	
	function setMainListItem(num){
		$(main_list).children("li").removeClass("current");
		$($(main_list).children("li")[num-1]).addClass("current");
		if(page_index==8){
			$(main_list).fadeOut();
		}
		else{
			$(main_list).fadeIn();
		}
	}
	
	$(".share_we").click(function(){
		$(".share_guide_wrap").addClass("show_guide");
		$(".penguin_wrap_10_hook").css({
			"top": "-100px"
		});
		no_wipe=1;
	});
	
	$(".share_guide_wrap").click(function(){
		$(".share_guide_wrap").removeClass("show_guide");
		$(".penguin_wrap_10_hook").css({
			"top": "0px"
		});
		no_wipe=0;
	});
	
	$(".penguin_wrap_10").click(function(){
		$(".share_guide_wrap").addClass("show_guide");
		$(".penguin_wrap_10_hook").css({
			"top": "-100px"
		});
		no_wipe=1;
	});
	
	$(".cover_link_next").click(function(){
		wipe_down();
	});
	
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			wipe_down();
		 },
		 wipeUp: function() { 
			wipe_up();
		 },
		 wipeLeft: function() {
			wipe_right();
		 },
		 wipeRight: function() { 
		 	wipe_left();
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	/*pc test*/
	
	//wipeLeft
	$(".hook_right").bind("click",function(){
		wipe_right();
	});
	
	//wipeRight
	$(".hook_left").bind("click",function(){
		wipe_left();
	});
	
	//wipeUp
	$(".hook_up").bind("click",function(){
		wipe_up();
	});
	
	//wipeDown
	$(".hook_down").bind("click",function(){
		wipe_down();
	});
	
	function wipe_right(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index>=1&&page_index<page_total&&subpage_index==1){
				$($(".con_wrap")[page_index-1]).addClass("wrap_hide");
				$($(".con_wrap")[page_index]).addClass("wrap_show");
				no_wipe=1;
				
				var timer=setTimeout(function(){
					$($(".con_wrap")[page_index-1]).removeClass("wrap_show");
					$($(".con_wrap")[page_index]).removeClass("wrap_prepare");
					no_wipe=0;
					
					clearTimeout(timer);
					page_index++;
					if(page_index>page_total){
						page_index=page_total;
					}
					
					setMainListItem(page_index);
					
					//console.log(page_index+" "+subpage_index);
					
				},300);
				
			}
		}
	}
	
	function wipe_left(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index>=2&&page_index<=page_total&&subpage_index==1){
				$($(".con_wrap")[page_index-2]).removeClass("wrap_hide").addClass("wrap_show");
				$($(".con_wrap")[page_index-1]).removeClass("wrap_show").addClass("wrap_prepare");
				
				page_index--;
				
			}
			
			setMainListItem(page_index);
		}
	}
	
	function wipe_up(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index==page_total){
				var list_num=$(".details_list .details_con").length;
				if(subpage_index>=2&&subpage_index<=list_num){
					$($(".details_con")[subpage_index-2]).removeClass("wrap_before").addClass("current");
					$($(".details_con")[subpage_index-1]).removeClass("current").addClass("wrap_after");
					
					subpage_index--;
				}
			}
		}
	}
	
	function wipe_down(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index==page_total){
				var list_num=$(".details_list .details_con").length;
				if(subpage_index>=1&&subpage_index<list_num){
					$($(".details_con")[subpage_index-1]).addClass("wrap_before").removeClass("current");
					$($(".details_con")[subpage_index]).addClass("current").removeClass("wrap_after");
					
					subpage_index++;
				}
			}
		}
	}
	
	/*pc test*/
	
	/* 安卓版本兼容 */
	var brower = {
		versions:function(){
			var u = window.navigator.userAgent;
			var num ;
			if(u.indexOf('Trident') > -1){
			//IE
				return "IE";
			}else if(u.indexOf('Presto') > -1){
			//opera
				return "Opera";
			}else if(u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1){
			//firefox
				return "Firefox";
			}else if(u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1){
			//苹果、谷歌内核
				if(u.indexOf('Chrome') > -1){
				//chrome
					return "Chrome";
				}else if(u.indexOf('OPR')){
				//webkit Opera
					return "Opera_webkit"
				}else{
				//Safari
					return "Safari";
				}
			}else if(u.indexOf('Mobile') > -1){
			//移动端
				if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				//ios
					if(u.indexOf('iPhone') > -1){
					//iphone
						return "iPhone"
					}else if(u.indexOf('iPod') > -1){
					//ipod
						return "iPod"
					}else if(u.indexOf('iPad') > -1){
					//ipad
						return "iPad"
					}
				}else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
				//android
					num = u.substr(u.indexOf('Android') + 8, 3);
					return {"type":"Android", "version": num};
				}else if(u.indexOf('BB10') > -1 ){
				//黑莓bb10系统
					return "BB10";
				}else if(u.indexOf('IEMobile')){
				//windows phone
					return "Windows Phone"
				}
			}
		}
    }
	
	var system=brower.versions();
	if(system.type=="Android"){
		if(system.version==4.4){
			$("body").addClass("android_version_4_4");
		}
		else{
			$("body").addClass("android_version");
		}
	}
	
	/*微信转发图片*/
	
	var location_str=location.href;
	var location_reg="mobile/";
	
	var imgUrl = location_str.split(location_reg)[0]+location_reg+"images/cover/icon_webank.jpg";
	var lineLink = location.href;
	var descContent = "我们是银行？我们是互联网？We是互联网银行。";
	var shareTitle = document.title;
	var appid = '';
	
	function shareFriend() {
		WeixinJSBridge.invoke('sendAppMessage',{
			"appid": appid,
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			//_report('send_msg', res.err_msg);
		})
	}
	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline',{
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			   //_report('timeline', res.err_msg);
		});
	}
	function shareWeibo() {
		WeixinJSBridge.invoke('shareWeibo',{
			"content": descContent,
			"url": lineLink,
		}, function(res) {
			//_report('weibo', res.err_msg);
		});
	}
	// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 发送给好友
		WeixinJSBridge.on('menu:share:appmessage', function(argv){
			shareFriend();
		});
		// 分享到朋友圈
		WeixinJSBridge.on('menu:share:timeline', function(argv){
			shareTimeline();
		});
		// 分享到微博
		WeixinJSBridge.on('menu:share:weibo', function(argv){
			shareWeibo();
		});
	}, false);
	
	
});




















