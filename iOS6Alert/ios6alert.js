//iOS6Alert.js
(function(){
	var totalID = 0;
	var thisID = 0;
	var autocloseto = setTimeout(function(){
	}, 0);
	var ios6alert_function = function(opt){
		var _def = {
			title : "",
			content : "",
			addClass : "",
			type : 0,
			html : false,
			sound : "",
			autoClose : 0,
			pressKeys : true,
			buttonText : {
				Yes : "OK",
				No : "Cancel",
				Delete : "Delete"
			},
			onClickYes : "",
			onClickNo : "",
			onClose : ""
		}
		var _opt = $.extend(true, _def, opt);
		var stringtohtml = function(str) { 
			str = str.replace(/&/g, "&amp;");
			str = str.replace(/</g, "&lt;");
			str = str.replace(/>/g, "&gt;");
			str = str.replace(/"/g, "&quot;");
			str = str.replace(/\n/g, "<br>");
			str = str.replace(/\r/g, "<br>");
			return str;
		}
		if(_opt.html != true){
			_opt.title = stringtohtml(_opt.title);
			_opt.content = stringtohtml(_opt.content);
		}
		var bgElement = "<div class=\"ios6alert_bg\" unselectable=\"on\" onselectstart=\"return false;\"></div>";
		var popupElement = "<div class=\"ios6alert\" unselectable=\"on\" onselectstart=\"return false;\"><div class=\"side_top\"><div class=\"alt_titlebar\">" + _opt.title + "</div></div><div class=\"alt_bg\"><div class=\"alt_content\">" + _opt.content + "</div></div><div class=\"side_bottom\"></div></div>";
		var yesButton = "<div class=\"alt_button\"><div class=\"alt_button_side_left\"></div><div class=\"alt_button_bg\">" + _opt.buttonText.Yes +"</div><div class=\"alt_button_side_right\"></div></div>";
		var noButton = "<div class=\"alt_button alt_button_def\"><div class=\"alt_button_side_left\"></div><div class=\"alt_button_bg\">" + _opt.buttonText.No +"</div><div class=\"alt_button_side_right\"></div></div>";
		var delButton = "<div class=\"alt_button alt_button_del\"><div class=\"alt_button_side_left\"></div><div class=\"alt_button_bg\">" + _opt.buttonText.Delete +"</div><div class=\"alt_button_side_right\"></div></div>";
		if(_opt.sound != ""){
			_opt.sound = "<audio id=\"alertsound\" autoplay=\"autoplay\" src=\"" + _opt.sound + "\"></audio>";
		}
		var popup = function(){
			$('.ios6alert').remove();
			$(".ios6alert_bg").remove();
			$("#alertsound").remove();
			$("body").append(bgElement, popupElement, _opt.sound);
			$(window).resize(function(){
				$('.ios6alert').css({
					position:'fixed',
					left: ($(window).width() - $('.ios6alert').outerWidth()) / 2,
					top: ($(window).height() - $('.ios6alert').outerHeight()) / 2
				});
			});
			$(window).resize();
			if(_opt.addClass != ""){
				$('.ios6alert').addClass(_opt.addClass);
			}
			$('.ios6alert').addClass("ios6alertpopup");
			setTimeout(function(){
				$('.ios6alert').removeClass("ios6alertpopup");
			}, 500);
			$(".ios6alert_bg").addClass("ios6alertbgpop");
			setTimeout(function(){
				$(".ios6alert_bg").removeClass("ios6alertbgpop");
			}, 900);
			if(_opt.title == ""){
				$(".ios6alert .alt_bg").css("padding-top", "0px");
				$(".ios6alert .alt_content").css("padding-top", "0px");
			}
			switch(_opt.type){
				case 1:
					$(".ios6alert .alt_bg").append(noButton);
					$(".ios6alert .alt_bg").append(yesButton);
				break;
				case 2:
					$(".ios6alert .alt_bg").append(delButton);
					$(".ios6alert .alt_bg").append(noButton);
				break;
				default:
					$(".ios6alert .alt_bg").append(yesButton);
					$(".ios6alert .alt_button").addClass("alt_button_single");
					_opt.onClickNo = _opt.onClickYes;
				break;
			}
			if(_opt.sound != ""){
				document.getElementById("alertsound").onended = function(){
					$("#alertsound").remove();
				}
			}
			$(".ios6alert .alt_button, .ios6alert .alt_button_del").not(".ios6alert .alt_button_def").click(function(){
				closepop();
				if(typeof _opt.onClickYes == "function"){
					_opt.onClickYes();
				}
			});
			$(document).keydown(function(event){
				if(_opt.pressKeys == true && _opt.type == 1 || _opt.pressKeys == true && _opt.type == 2){
					if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 89){
						closepop();
						if(typeof _opt.onClickYes == "function"){
							_opt.onClickYes();
						}
					}
					if(event.keyCode == 78 || event.keyCode == 27){
						closepop();
						if(typeof _opt.onClickNo == "function"){
							_opt.onClickNo();
						}
					}
				}
				else if(_opt.pressKeys == true){
					if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 89 || event.keyCode == 27){
						closepop();
						if(typeof _opt.onClickYes == "function"){
							_opt.onClickYes();
						}
					}
				}
			});
			$(".ios6alert .alt_button_def").click(function(){
				closepop();
				if(typeof _opt.onClickNo == "function"){
					_opt.onClickNo();
				}
			});
			if(_opt.autoClose > 0){
				autocloseto = setTimeout(function(){
					closepop();
					if(typeof _opt.onClickNo == "function"){
						_opt.onClickNo();
					}
				}, _opt.autoClose);
			}
		}
		var closepop = function(){
			$('.ios6alert').addClass("ios6alertclose");
			$(".ios6alert_bg").addClass("ios6alertbgclose");
			$(document).unbind("keydown");
			autocloseto && clearTimeout(autocloseto);
			setTimeout(function(){
				if(typeof _opt.onClose == "function"){
					_opt.onClose();
				}
				$('.ios6alert').remove();
				$(".ios6alert_bg").remove();
				totalID ++;
			}, 150);
		}
		popup();
	}
	$.fn.extend({
		ios6alert:function(opt){
			var popupf = function(ID){
				var int = setInterval(function(){
					if(ID == totalID){
						clearInterval(int);
						ios6alert_function(opt);
					}
				}, 100);
				if(ID == totalID){
					clearInterval(int);
					ios6alert_function(opt);
				}
			}
			popupf(thisID);
			thisID ++;
		}
	});
})(jQuery);