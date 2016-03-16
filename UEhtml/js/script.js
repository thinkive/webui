;
(function($) {
	var config = {};
	$(window).bind('load', function() {
		reset();
	});
	$(window).bind('resize', function() {
		reset();
		$('.works').each(function() {
			$(this).find('img').attr('width', '').attr('height', '');
		});
	});

	function reset() {
		config.w = $(window).width();
		config.h = $(window).height();
		$('#menu').height(config.h);
		config.ww = $('.website').width();
		$('.website li,.website').width(config.ww);
		config.wl = $('.website li').length;
		$('.website ul').width(config.wl * config.ww);
		$('.ct').height(config.h - 60);
		if ($('.title_d').width() - $('.title').width() > 0) {
			$('.title_d').addClass('round');
		} else {
			$('.title_d').removeClass('round');
		};
		if (document.getElementById('newwrap_t')) {
			$('#newwrap_t,#newwrap').width(config.w);
		}
		$('#myfavorites li').width(($('#myfavorites ul').width() - 10) / 2);
		$('#myfavorites li span').width(($('#myfavorites li').width() - 20) / 3);
	}
	var touchEnd;
	var dd = 0;

	function tcst() {
		$('#list li').bind('touchstart touchmove touchend', function(e) {
			if (e.type == 'touchstart') {
				$(this).addClass('touch');
			} else if (e.type == 'touchend') {
				$(this).removeClass('touch');
			} else {
				var _this = $(this);
				clearTimeout(touchEnd);
				touchEnd = setTimeout(function() {
					_this.removeClass('touch');
				}, 100);
			}
		});
	}
	tcst();
	$('.post_comment').bind('touchstart touchend', function(e) {
		if (e.type == 'touchstart') {
			$(this).find('a').addClass('ton');
		} else {
			$(this).find('a').removeClass('ton');
		}
	});
	$('#header i').bind('touchstart touchmove touchend', function(e) {
		if (e.type == 'touchstart') {
			$(this).addClass('ton');
		} else if (e.type == 'touchmove') {
			$(this).removeClass('ton');
		} else {
			$(this).removeClass('ton');
		}
	});
	var reply_lock = false;
	$('#content').bind('touchstart touchmove touchend', function(e) {
		if ($('#container').hasClass('push') == false && $('#container').hasClass('pull') == false) {
			var t = event.touches[0];
			if (e.type == 'touchstart') {
				config.touchY = t.pageY;
			} else if (e.type == 'touchmove') {
				config.touchEY = t.pageY - config.touchY;
				if (config.touchEY > 0) {
					$('#header,#us_panel,#us_panel2').removeClass('hide');
					$('.post_comment_content textarea').blur();
					$('.post_comment_content,#send_msg').removeClass('show');
					$('#us_panel').css({
						'position': 'fixed',
						'bottom': '0'
					});
					reply_lock = false;
				} else if (config.touchEY < 0) {
					$('#header,#us_panel,#us_panel2').addClass('hide');
					$('.post_comment_content textarea').blur();
					$('#us_panel').css({
						'position': 'fixed',
						'bottom': '0'
					});
					$('.post_comment_content,#send_msg').removeClass('show');
					reply_lock = false;
				}
			} else {}
		}
	});
	$('.menu_open').bind('click', function(e) {
		if ($('#container').hasClass('pull') == false) {
			if (dd == 0) {
				$('#container,#menu,#header,#us_panel').addClass('push');
				dd = 1;
				$(window).bind('touchmove', function(e) {
					e.preventDefault();
					e.stopImmediatePropagation();
				});
				$('#us_panel').addClass('hide');
			} else {
				$('#container,#menu,#header,#us_panel').removeClass('push');
				dd = 0;
				$(window).unbind('touchmove');
			};
		}
		return false;
	});
	$('.search_open').bind('click', function(e) {
		if ($('#container').hasClass('push') == false) {
			if (dd == 0) {
				$('#container,#user,#header,#us_panel').addClass('pull');
				dd = 1;
				$(window).bind('touchmove', function(e) {
					e.preventDefault();
					e.stopImmediatePropagation();
				});
				$('#us_panel').addClass('hide');
			} else {
				$('#container,#user,#header,#us_panel').removeClass('pull');
				dd = 0;
				$(window).unbind('touchmove');
			}
		}
		return false;
	});
	$('.push_msk').bind('touchmove', function(e) {
		if ($('#container').hasClass('pull')) {
			$('.search_open').trigger('click');
		} else if ($('#container').hasClass('push')) {
			$('.menu_open').trigger('click');
		}
		return false;
	});
	$('.hd .fr,.ct_submit,.user_logout,.comment_reply_submit,.more_comment,.visit_site a,.sort_b,.cancel_share a,.message_system li,.delete_check_sure,.delete_check_cancel,#choose_album li a').bind('touchstart touchend', function(e) {
		if (e.type == 'touchstart') {
			$(this).addClass('ton');
		} else {
			$(this).removeClass('ton');
		}
	});
	$('.search_input').bind('input', function() {
		if ($('.search_input').val().length > 0) {
			$('.reset_input').show();
		} else {
			$('.reset_input').hide();
		}
	});
	$('.reset_input').bind('touchstart touchend', function(e) {
		if (e.type == 'touchstart') {
			$('.search_input').val('');
			$('.reset_input').addClass('ton');
		} else if (e.type == 'touchend') {
			$('.reset_input').removeClass('ton').hide();
		}
	});
	$('#reg_now').bind('click', function() {
		$('#reg_index').addClass('show');
		$(window).unbind('touchmove');
	});
	$('.reg_bar_close').bind('touchstart touchend click', function(e) {
		if (e.type == 'touchstart') {
			$(this).addClass('ton');
		} else if (e.type == 'touchend') {
			$(this).removeClass('ton');
		} else {
			if (document.getElementById('us_panel')) {
				$('#reg_index').removeClass('show');
				$(window).bind('touchmove', function(e) {
					e.preventDefault();
					e.stopImmediatePropagation();
				});
			} else {
				$('#reg_index').removeClass('show');
			}
		}
	});
	$('.login').bind('click', function() {
		$('#login_index').addClass('show');
		$(window).unbind('touchmove');
	});
	$('.login_bar_close').bind('touchstart touchend click', function(e) {
		if (e.type == 'touchstart') {
			$(this).addClass('ton');
		} else if (e.type == 'touchend') {
			$(this).removeClass('ton');
		} else {
			$('#login_index').removeClass('show');
			$(window).bind('touchmove', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
			});
		}
	});
	$('.login_user input,.login_password input').bind('input', function() {
		if ($(this).val().length > 0) {
			$(this).parent().find('i').show();
			loginIpt();
		} else {
			$(this).parent().find('i').hide();
		}
	});

	function loginIpt() {
		$('.login_user i').bind('touchstart touchend', function(e) {
			if (e.type == 'touchstart') {
				$(this).addClass('ton');
			} else {
				$(this).parent().find('input').val('');
				$(this).hide();
				$(this).removeClass('ton');
			}
		});
		$('.login_password i').bind('touchstart touchend', function(e) {
			if (e.type == 'touchstart') {
				$(this).addClass('ton');
			} else {
				$(this).parent().find('input').val('');
				$(this).hide();
				$(this).removeClass('ton');
			}
		});
	};
	$('#add_f').click(function() {
		var i = parseInt($(this).find('.lf span').html());
		if ($(this).hasClass('liked')) {
			var _this = $(this);
			$.post("http://www.uehtml.com/service/removeLike", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				postid: commentId2
			}, function() {
				_this.removeClass('liked');
				_this.find('.lf span').html(i - 1);
			});
		} else {
			var _this = $(this);
			$.post("http://www.uehtml.com/service/addLike", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				postid: commentId2
			}, function() {
				_this.addClass('liked');
				_this.find('.lf span').html(i + 1);
			});
		}
	});
	var wbI = 0;
	config.stx, config.edx, config.ttx = 0;
	$('.website').bind('touchstart touchmove touchend', function(e) {
		if (e.type == 'touchstart') {
			var t = e.touches[0];
			config.stx = t.pageX, config.sty = t.pageY;
		} else if (e.type == 'touchmove') {
			var t = e.touches[0];
			config.edx = t.pageX, config.edy = t.pageY;
			document.querySelector('.website ul').style.webkitTransform = 'translateX(' + ((config.edx - config.stx) + config.ttx) + 'px)';
			document.querySelector('.website ul').style.oTransform = 'translateX(' + ((config.edx - config.stx) + config.ttx) + 'px)';
			document.querySelector('.website ul').style.mozTransform = 'translateX(' + ((config.edx - config.stx) + config.ttx) + 'px)';
			document.querySelector('.website ul').style.transform = 'translateX(' + ((config.edx - config.stx) + config.ttx) + 'px)';
			if (config.edx - config.stx < 0) {
				e.preventDefault();
			}
			if (config.edx - config.stx > 0) {
				e.preventDefault();
			}
		} else {
			if (config.edx - config.stx <= 60 && config.edx - config.stx >= -60) {
				$('.website ul').animate({
					translate3d: '-' + (config.ww * wbI) + 'px,0,0'
				}, 300, 'cubic-bezier(0.175, 0.885, 0.32, 1.275)');
				e.preventDefault();
			}
			if (config.edx - config.stx > 60) {
				(wbI > 0) ? wbI-- : wbI = 0;
				$('.website ul').animate({
					translate3d: '-' + (config.ww * wbI) + 'px,0,0'
				}, 300, 'ease-in-out');
				e.preventDefault();
			}
			if (config.edx - config.stx < -60) {
				(wbI < config.wl - 1) ? wbI++ : wbI = config.wl - 1;
				$('.website ul').animate({
					translate3d: '-' + (config.ww * wbI) + 'px,0,0'
				}, 300, 'ease-in-out');
				e.preventDefault();
			}
			config.edx = 0, config.stx = 0, config.ttx = -config.ww * wbI;
		}
	});
	$('.designer_more').each(function() {
		$(this).find('a').each(function() {
			if ($(this).html() == '') {
				$(this).click(function() {
					return false;
				});
			}
		});
	});

	function addRela() {
		$('.relationship a').bind('click', function() {
			var _this = $(this);
			if (_this.hasClass('need_login')) {
				$('#reg_index').addClass('show');
			} else {
				if ($(this).hasClass('add_friend') && $(this).hasClass('need_login') == false) {
					$.post("http://www.uehtml.com/service/addFollow", {
						timestamp: YYToken.timestamp,
						token: YYToken.token,
						uid: $(this).attr('data-uid')
					}, function() {
						_this.removeClass('add_friend').addClass('remove_friend');
					});
				} else if ($(this).hasClass('remove_friend') && $(this).hasClass('need_login') == false) {
					$.post("http://www.uehtml.com/service/removeFollow", {
						timestamp: YYToken.timestamp,
						token: YYToken.token,
						uid: $(this).attr('data-uid')
					}, function() {
						_this.removeClass('remove_friend').addClass('add_friend');
					});
				} else if ($(this).hasClass('rela_friend') && $(this).hasClass('need_login') == false) {
					$.post("http://www.uehtml.com/service/removeFollow", {
						timestamp: YYToken.timestamp,
						token: YYToken.token,
						uid: $(this).attr('data-uid')
					}, function() {
						_this.removeClass('rela_friend').addClass('add_friend');
					});
				}
			}
		});
	}
	addRela();
	$('#sort td').bind('click', function() {
		$('#sort_content').addClass('show');
		$('.asort').eq($(this).index()).addClass('show');
	});
	$('.asort .hd .fr').bind('click', function() {
		$('#sort_content').removeClass('show');
		var _this = $(this);
		setTimeout(function() {
			_this.parent().parent().parent().removeClass('show');
		}, 300);
	});
	var dt = ['', '', '', ''],
		scLock;
	$('.ct li').click(function() {
		if (document.getElementById('add_favorites_choose')) {
			var _this = $(this),
				d = $(this).attr('data-id');
			if ($(this).hasClass('a_selected') == false) {
				$.post("http://www.uehtml.com/service/addLike", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					postid: commentId2,
					cid: d
				}, function() {
					_this.siblings().removeClass('a_selected');
					_this.addClass('a_selected');
					$('#add_favorite .hd .fr').trigger('click');
					$('.us_panel_like').addClass('liked');
					$('.us_panel_like span em').html(parseInt($('.us_panel_like span em').html()) + 1);
				});
			}
		} else {
			var v = $(this).find('span').html();
			var i = $(this).parent().parent().parent().parent().index();
			if ($(this).hasClass('a_selected') && $(this).find('.s').attr('class') == undefined) {
				var _this = $(this);
				dt[1] = '';
				$.get('http://www.uehtml.com/list/', {
					fid: dt[0],
					owner: dt[1],
					sort: dt[2],
					search: search_value
				}, function(data) {
					$('.sort_tag .sort_b_inner span').html('检索列表');
					var v = $(data).find('#list ul').html();
					$('#list ul').html(v);
					tcst();
					_this.removeClass('a_selected');
					var dd = _this.parent().parent().parent().parent().find('.fr');
					dd.trigger('click');
					$('.alist').openNewFrame();
				});
			} else {
				$(this).parent().parent().find('li').removeClass('a_selected');
				$(this).addClass('a_selected');
				if ($(this).attr('c_data')) {
					if ($(this).attr('c_data') != '') {
						dt[0] = $(this).attr('c_data');
					} else {
						dt[0] = '';
					}
				} else if ($(this).attr('t_data')) {
					dt[1] = $(this).attr('t_data').substring($(this).attr('t_data').indexOf('=') + 1, $(this).attr('t_data').length);
				} else {
					dt[2] = $(this).attr('s_data');
				}
				var dd = $(this).parent().parent().parent().parent().find('.fr');
				$.get('http://www.uehtml.com/list/', {
					fid: dt[0],
					owner: dt[1],
					sort: dt[2],
					search: search_value
				}, function(data) {
					var v = $(data).find('#list ul').html();
					$('#list ul').html(v);
					dd.trigger('click');
					tcst();
					$('.alist').openNewFrame();
				});
				$('#sort td').eq(i).find('.sort_b_inner span').html(v);
				if ($(this).find('.s').attr('class')) {
					var d = $(this).find('.s').attr('class');
					$('#sort td').eq(i).find('.sort_b_inner i').attr('class', d);
				}
			}
			scLock = true, now_page = 1;
			$('.list_loading').html('<i></i><span>努力加载中...</span>');
		}
	});
	var postReplyId, cmofsT = 0;
	if (document.getElementById('more_about')) {
		cmofsT = $('#more_about').offset().top;
	}
	$('#post_comment_btn').click(function() {
		if ($('.post_comment_content').hasClass('show')) {
			if (reply_lock == false) {
				if ($('#post_comment_content').val() != '') {
					$.post("http://www.uehtml.com/service/postnewComment", {
						timestamp: YYToken.timestamp,
						token: YYToken.token,
						postid: commentId2,
						content: $('#post_comment_content').val()
					}, function(data) {
						$('#comment ul').prepend('<li postdata="' + data.id + '" usdata="' + comment_id + '"><div class="pd5"><a class="avt fl" target="_blank" href="' + comment_at_url + '"><img src="' + comment_avatar + '"></a><div class="comment_content"><h5><div class="fl"><a class="comment_name" href="' + comment_at_url + '">' + comment_author + '</a><span>' + data.postdate + '</span></div><div class="fr reply_this">[回复]</div><div class="clear"></div></h5><div class="comment_p">' + data.content + '</div></div><div class="clear"></div><div class="comment_reply"></div></div></li>');
						document.getElementById('container').scrollTop = cmofsT;
						reply_lock = false;
					}, 'json');
				} else {
					return false;
				}
			} else {
				if ($('#post_comment_content').val() != '') {
					$.post("http://www.uehtml.com/service/postnewComment", {
						timestamp: YYToken.timestamp,
						token: YYToken.token,
						postid: commentId2,
						postcid: _cid,
						postuid: comment_id,
						content: $('#post_comment_content').val()
					}, function(data) {
						var ddd = '<div class="quote"><div class="pd10">' + _ct + '</div></div>';
						$('#comment ul').prepend('<li postdata="' + data.id + '" usdata="' + comment_id + '"><div class="pd5"><a class="avt fl" target="_blank" href="' + comment_at_url + '"><img src="' + comment_avatar + '"></a><div class="comment_content"><h5><div class="fl"><a class="comment_name" href="' + comment_at_url + '">' + comment_author + '</a><span>' + data.postdate + '</span></div><div class="fr reply_this">[回复]</div><div class="clear"></div></h5><div class="comment_p">' + data.content + ddd + '</div></div><div class="clear"></div><div class="comment_reply"></div></div></li>');
						document.getElementById('container').scrollTop = cmofsT;
						reply_lock = false;
					}, 'json');
				} else {
					return false;
				}
			}
		} else {
			if ($(this).hasClass('atc')) {
				$('.post_comment_content').addClass('show');
				$('#post_comment_content').val('').attr('placeholder', '发表评论');
				document.getElementById('post_comment_content').focus();
				$('#us_panel').css({
					'position': 'absolute',
					'bottom': '0px'
				});
			} else {
				$('#login_index').addClass('show');
			}
		}
	});
	$('.menu_share').click(function() {
		$('#share').addClass('show');
		$(window).bind('touchmove', function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
		});
	});
	$('.cancel_share,.share_msk').click(function() {
		$('#share').removeClass('show');
		$(window).unbind('touchmove');
	});
	var rmsInt, rmsId, rmsLock = true;
	$('.remove_msg').click(function() {
		rmsInt = $(this).parent().parent();
		rmsId = rmsInt.attr('data-messages');
		$('#delete_check').addClass('show');
		$('.delete_check_cancel,.delete_check').click(function() {
			$('#delete_check').removeClass('show');
		});
		$('.delete_check_sure').click(function() {
			if (rmsLock) {
				rmsLock = false;
				$.post("http://www.uehtml.com/service/delMessage", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					id: rmsId
				}, function() {
					$('#delete_check').removeClass('show');
					rmsInt.animate({
						opacity: 0,
						translateX: '100%'
					}, 300, 'ease-in-out', function() {
						rmsInt.remove();
					});
					rmsLock = true;
				});
			}
		});
	});
	$('#reply_msg_area').bind('input', function() {
		if ($('#reply_msg_area').val() != '') {
			$('.reply_msg_post').addClass('checked');
		} else {
			$('.reply_msg_post').removeClass('checked');
		}
	});
	if (document.getElementById('reply_msg')) {
		$('#content').css('paddingBottom', 120);
	}
	$('.reply_msg_post').click(function() {
		if ($(this).hasClass('checked')) {
			$.post("http://www.uehtml.com/service/sendSMS", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				content: $('#reply_msg_area').val(),
				nickname: reply_nickname
			}, function() {
				$.get("http://www.uehtml.com/sms", {
					id: reply_post_id
				}, function(data) {
					var v = $(data).find('.message_private_reply ul').html();
					$('.message_private_reply ul').html(v);
					$('#reply_msg_area').val('');
				});
			});
		} else {
			return false;
		}
	});
	if (document.getElementById('reply_msg')) {
		$('.menu_refresh').click(function() {
			$.get("http://www.uehtml.com/sms", {
				id: reply_post_id
			}, function(data) {
				var v = $(data).find('.message_private_reply ul').html();
				$('.message_private_reply ul').html(v);
			});
		});
	}
	var choose_cate = ['_cate_all', '_cate_creat', '_cate_site', '_cate_inspire', '_cate_article', '_cate_app'],
		choose_sort = ['sort_re', 'sort_recom', 'sort_fa', 'sort_vi', 'sort_com'];
	$('.choose_cate li').each(function(i) {});
	$('.choose_sort li').each(function(i) {
		$(this).find('.s').addClass(choose_sort[i]);
	});
	if (document.getElementById('list')) {
		$(window).bind('load', function() {
			scLock = true;
			$('.alist').openNewFrame();
			$('#container').bind('scroll', function() {
				var t = $('#container').scrollTop();
				if (t >= ($('#list').height() - $(window).height()) && scLock == true) {
					now_page++;
					scLock = false;
					$.get('http://www.uehtml.com/list/', {
						page: now_page,
						fid: dt[0],
						owner: dt[1],
						sort: dt[2],
						search: search_value
					}, function(data) {
						var v = $(data).find('#list ul').html();
						$('#list ul').append(v);
						var patt1 = new RegExp("alist");
						if (patt1.test(v)) {
							scLock = true;
						} else {
							$('.list_loading').html('<span>没有了!</span>');
						}
						tcst();
						$('.alist').openNewFrame();
					});
				}
			});
		});
	}
	$('.more_comment').click(function() {
		$.post("http://www.uehtml.com/service/getcomment", {
			timestamp: YYToken.timestamp,
			token: YYToken.token,
			lastid: $('#comment li').eq($('#comment li').length - 1).attr('postdata'),
			postid: commentId2
		}, function(data) {
			for (i = 0; i < data.length; i++) {
				var ddd = '';
				if (data[i].comment) {
					ddd = '<div class="quote"><div class="pd10">' + data[i].comment.content + '</div></div>';
				}
				var ser = '<li postdata="' + data[i].id + '"><div class="pd5"><a class="avt fl" target="_blank" href="' + data[i].userurl + '"><img src="' + data[i].userimage + '"></a><div class="comment_content"><h5><div class="fl"><a class="comment_name" href="' + data[i].userurl + '">' + data[i].nickname + '</a><span>' + data[i].postdate + '</span></div><div class="fr reply_this">[回复]</div><div class="clear"></div></h5><div class="comment_p"><div class="comment_pct">' + data[i].content + '</div>' + ddd + '</div></div><div class="clear"></div><div class="comment_reply"></div></div></li>';
				$('#comment ul').append(ser);
			}
			replyThis();
		}, 'json');
	});
	$('.works').each(function() {
		var v = $(this).find('a img').attr('vsrc');
		$(this).find('a img').attr('vsrc', v.replace(/1140x0.jpg/, '800x0.jpg'));
	});
	if (document.getElementById('designer_list')) {
		$(window).bind('load', function() {
			scLock = true;
			$('#container').bind('scroll', function() {
				var t = $('#container').scrollTop();
				if (t >= ($('#designer_list').height() - $(window).height()) && scLock == true) {
					designers_page++;
					scLock = false;
					$.get('http://www.uehtml.com/designers/', {
						page: designers_page,
						sort: designers_sort
					}, function(data) {
						var v = $(data).find('#designer_list ul').html();
						$('#designer_list ul').append(v);
						addRela();
						var patt1 = new RegExp("designer_more");
						if (patt1.test(v)) {
							scLock = true;
						} else {
							$('.list_loading').html('<span>没有了!</span>');
						}
					});
				}
			});
		});
	}
	$('.add_fans').click(function() {
		var _this = $(this);
		$.post("http://www.uehtml.com/service/addFollow", {
			timestamp: YYToken.timestamp,
			token: YYToken.token,
			uid: _this.attr('data-uid')
		}, function() {
			_this.removeClass('add_fans').addClass('remove_fans');
			$('.remove_fans').html('取消关注');
		});
	});
	$('.remove_fans').click(function() {
		var _this = $(this);
		$.post("http://www.uehtml.com/service/removeFollow", {
			timestamp: YYToken.timestamp,
			token: YYToken.token,
			uid: _this.attr('data-uid')
		}, function() {
			_this.removeClass('remove_fans').addClass('add_fans');
			$('.add_fans').html('加关注');
		});
	});
	$('.home_remove_f').click(function() {
		if ($(this).hasClass('need_login')) {
			$('#reg_index').addClass('show');
		} else {
			var _this = $(this);
			$.post("http://www.uehtml.com/service/removeFollow", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				uid: _this.attr('data-uid')
			}, function() {
				_this.removeClass('home_remove_f').addClass('home_add_f');
				$('.home_add_f').find('span').html('加关注');
			});
		}
	});
	$('.home_rela_f').click(function() {
		if ($(this).hasClass('need_login')) {
			$('#reg_index').addClass('show');
		} else {
			var _this = $(this);
			$.post("http://www.uehtml.com/service/removeFollow", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				uid: _this.attr('data-uid')
			}, function() {
				_this.removeClass('home_rela_f').addClass('home_add_f');
				$('.home_add_f').find('span').html('加关注');
			});
		}
	});
	$('.home_add_f').click(function() {
		if ($(this).hasClass('need_login')) {
			$('#reg_index').addClass('show');
		} else {
			var _this = $(this);
			$.post("http://www.uehtml.com/service/addFollow", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				uid: _this.attr('data-uid')
			}, function() {
				_this.removeClass('home_add_f').addClass('home_remove_f');
				$('.home_remove_f').find('span').html('取消关注');
			});
		}
	});
	var send_me;
	$('.home_send').click(function() {
		if ($(this).hasClass('need_login')) {
			$('#reg_index').addClass('show');
		} else {
			$('#send_msg').addClass('show');
			send_me = $(this).attr('data-name');
		}
	});
	$('#send_msg_content').bind('input', function() {
		if ($('#send_msg_content').val() != '') {
			$('.send_msg_to').addClass('checked');
		} else {
			$('.send_msg_to').removeClass('checked');
		}
	});
	$('.send_msg_to').click(function() {
		if ($(this).hasClass('checked')) {
			$.post("http://www.uehtml.com/service/sendSMS", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				content: $('#send_msg_content').val(),
				nickname: send_me
			}, function() {
				$('#send_msg_content').val('');
				document.getElementById('send_msg_content').blur();
				$('#send_msg').removeClass('show');
			});
		} else {
			return false;
		}
	});
	if (document.getElementById('myworks')) {
		if ($('#myworks').hasClass('my_favorites')) {
			$(window).bind('load', function() {
				var scLock = true;
				$('#container').bind('scroll', function() {
					var t = $('#container').scrollTop();
					if (t >= ($('#myworks').height() - $(window).height()) && scLock == true) {
						now_page++;
						scLock = false;
						$.get(now_page_url + '/list/' + now_page_cur + '/' + albumId + '/', {
							page: now_page
						}, function(data) {
							var v = $(data).find('#myworks ul').html();
							$('#myworks ul').append(v);
							var patt1 = new RegExp("alist");
							if (patt1.test(v)) {
								scLock = true;
							} else {
								$('.list_loading').html('<span>没有了!</span>');
							}
							$('.alist').openNewFrame();
						});
					}
				});
			});
		} else {
			$(window).bind('load', function() {
				var scLock = true;
				$('#container').bind('scroll', function() {
					var t = $('#container').scrollTop();
					if (t >= ($('#myworks').height() - $(window).height()) && scLock == true) {
						now_page++;
						scLock = false;
						$.get(now_page_url + '/list/' + now_page_cur + '/', {
							page: now_page
						}, function(data) {
							var v = $(data).find('#myworks ul').html();
							$('#myworks ul').append(v);
							var patt1 = new RegExp("alist");
							if (patt1.test(v)) {
								scLock = true;
							} else {
								$('.list_loading').html('<span>没有了!</span>');
							}
							$('.alist').openNewFrame();
						});
					}
				});
			});
		}
	}
	$(window).bind('DOMContentLoaded', function() {
		setTimeout(function() {
			if (!document.getElementById('newwrap')) {
				img_loader();
			}
			$('html').removeClass('loading');
		}, 400);
	});
	$('a').click(function() {
		var _this = $(this);
		if (_this.parent().hasClass('menu_back')) {
			if (window.parent.document.getElementById('newwrap')) {
				var d = $(window.parent.document).find('#newwrap').attr('dataurl'),
					dt = $(window.parent.document).find('#newwrap').attr('datatitle');
				$(window.parent.document).find('#newwrap_t').removeClass('show');
				$(window.parent.document).find('#header,#container').removeClass('newframe');
				setTimeout(function() {
					$(window.parent.document).find('#newwrap').attr('src', '');
				}, 400);
				window.parent.history.replaceState(null, dt, d);
				window.parent.document.title = dt;
				_this.attr('href', '');
				$('.alist').openNewFrame();
			} else {
				$('html').addClass('loading2');
				$('html').addClass('loading');
				setTimeout(function() {
					window.location.href = _this.attr('href');
				}, 200);
			}
			return false;
		} else if (_this.parent().hasClass('menu_back2')) {
			$('html').addClass('loading2');
			$('html').addClass('loading');
			setTimeout(function() {
				window.location.href = _this.attr('href');
			}, 200);
		} else if (_this.parent().hasClass('sort_b') || _this.parent().hasClass('home_profile_c') || _this.parent().hasClass('cancel_share') || _this.parent().hasClass('relationship') || _this.attr('id') == 'reg_now' || _this.attr('class') == 'login_submit' || _this.attr('class') == 'more_comment' || _this.attr('class') == 'delete_check_sure' || _this.attr('class') == 'delete_check_cancel' || _this.attr('href') == '' || _this.attr('href') == '#' || _this.attr('href') == 'javascript:void(0);' || $(this).attr('target') == "_blank") {} else {
			$('html').addClass('loading');
			setTimeout(function() {
				window.location.href = _this.attr('href');
			}, 400);
			return false;
		}
	});
	$('.login_submit').click(function() {
		$.post("http://www.uehtml.com/service/loginUser", {
			timestamp: YYToken.timestamp,
			token: YYToken.token,
			email: $('.login_user input').val(),
			password: $('.login_password input').val()
		}, function() {
			window.location.href = "/";
		});
	});
	var img_loader = function() {
			var imgReady = (function() {
				var list = [],
					intervalId = null,
					tick = function() {
						var i = 0;
						for (; i < list.length; i++) {
							list[i].end ? list.splice(i--, 1) : list[i]();
						};
						!list.length && stop();
					},
					stop = function() {
						clearInterval(intervalId);
						intervalId = null;
					};
				return function(url, ready, load, error) {
					var onready, width, height, newWidth, newHeight, img = new Image();
					img.src = url;
					if (img.complete) {
						ready.call(img);
						load && load.call(img);
						return;
					};
					width = img.width;
					height = img.height;
					img.onerror = function() {
						error && error.call(img);
						onready.end = true;
						img = img.onload = img.onerror = null;
					};
					onready = function() {
						newWidth = img.width;
						newHeight = img.height;
						if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) {
							ready.call(img);
							onready.end = true;
						};
					};
					onready();
					img.onload = function() {
						!onready.end && onready();
						load && load.call(img);
						img = img.onload = img.onerror = null;
					};
					if (!onready.end) {
						list.push(onready);
						if (intervalId === null) intervalId = setInterval(tick, 40);
					};
				};
			})();
			$('.works').each(function() {
				var e = $(this).find('img'),
					v = e.attr('vsrc');
				imgReady(v, function() {
					e.attr('width', this.width);
					e.attr('height', (($(window).width() - 10) / this.width) * this.height);
					e.attr('src', v);
				});
			});
		}
	$('.article_ct img').css('height', 'auto').attr('height', '').attr('width', '');
	var _thist_ = document.title,
		thistd = window.location.href;
	$.fn.openNewFrame = function() {
		$(this).click(function() {
			var _thisv = $(this).attr('vhref'),
				_thist = $(this).find('.list_info h4').html();
			if (document.getElementById('newwrap')) {
				$('#newwrap').attr('src', _thisv).attr('dataurl', thistd).attr('datatitle', _thist_);
				$('#newwrap_t').addClass('show');
				history.replaceState(null, _thist, _thisv);
				document.title = _thist;
				$('#header,#container').addClass('newframe');
			}
		});
	};
	$('.works_info iframe').css({
		'margin': '0 auto',
		'display': 'inlineBlock',
		'maxWidth': '100%',
		'height': 'auto',
		'position': 'relative'
	});
	$('.works_info iframe').each(function() {
		if ($(this).parent().parent().hasClass('pd10')) {
			$(this).parent().parent().css({
				'position': 'relative',
				'paddingLeft': '0',
				'paddingRight': '0'
			});
		}
	});
	$('.alist').openNewFrame();
	location.href.indexOf('fid=') < 0 && $('.a_selected').trigger('click');
	$('.us_panel_menu').click(function() {
		if ($('#us_panel_menu').hasClass('show')) {
			$('#us_panel_menu').removeClass('show');
			$('.arrow_top').removeClass('open');
			$(window).unbind('touchmove');
		} else {
			$('#us_panel_menu').addClass('show');
			$('.arrow_top').addClass('open');
			$(window).bind('touchmove', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
			});
		}
	});
	$('.us_panel_msk').click(function() {
		$('.us_panel_menu').trigger('click');
	});
	$('.add_newpost_cancel').click(function() {
		$('#add_newpost').removeClass('show');
		$('.newpost_w_t textarea').blur();
	});
	$('.us_panel_menu_t td a').click(function() {
		var v = $(this).attr('href');
		window.parent.location.href = v;
		return false;
	});
	var _cid, _ct, isReply, _nickname;

	function replyThis() {
		$('.reply_this').click(function() {
			if (logined == 1) {
				isReply = true;
				reply_lock = true;
				_cid = $(this).parent().parent().parent().parent().attr('postdata');
				_ct = $(this).parent().parent().parent().parent().find('.comment_p .comment_pct').html();
				_nickname = $(this).parent().parent().parent().parent().find('h5 .fl a').html();
				$('#add_newpost').addClass('show');
				$('.newpost_w_t textarea').val('').attr('placeholder', '回复' + _nickname + '');
			} else {
				$('#reg_index').addClass('show');
			}
		});
		$('.us_panel_post').click(function() {
			if (logined == 1) {
				$('#add_newpost').addClass('show');
				if ($('.newpost_w_t textarea').val() == '') {
					$('.newpost_w_t textarea').val('').attr('placeholder', '发表评论');
				};
				reply_lock = true;
				isReply = false;
				reply_lock = true;
			} else {
				$('#reg_index').addClass('show');
			}
		});
		$('.add_newpost_post').click(function() {
			if (reply_lock == true && isReply == true && $('.newpost_w_t textarea').val() != '') {
				reply_lock = false;
				$.post("http://www.uehtml.com/service/postnewComment", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					postid: commentId2,
					postcid: _cid,
					postuid: comment_id,
					content: $('.newpost_w_t textarea').val()
				}, function(data) {
					var ddd = '<div class="quote"><div class="pd10">' + _ct + '</div></div>';
					$('#comment ul').prepend('<li postdata="' + data.id + '" usdata="' + comment_id + '"><div class="pd5"><a class="avt fl" target="_blank" href="' + comment_at_url + '"><img src="' + comment_avatar + '"></a><div class="comment_content"><h5><div class="fl"><a class="comment_name" href="' + comment_at_url + '">' + comment_author + '</a><span>' + data.postdate + '</span></div><div class="fr reply_this">[回复]</div><div class="clear"></div></h5><div class="comment_p"><div class="comment_pct">' + data.content + '</div>' + ddd + '</div></div><div class="clear"></div><div class="comment_reply"></div></div></li>');
					document.getElementById('container').scrollTop = cmofsT;
					$('#add_newpost').removeClass('show');
					$('.us_panel_post').find('span em').html(parseInt($('.us_panel_post').find('span em').html()) + 1);
					replyThis();
				}, 'json');
			}
			if (reply_lock == true && isReply == false && $('.newpost_w_t textarea').val() != '') {
				reply_lock = false;
				$.post("http://www.uehtml.com/service/postnewComment", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					postid: commentId2,
					content: $('.newpost_w_t textarea').val()
				}, function(data) {
					$('#comment ul').prepend('<li postdata="' + data.id + '" usdata="' + comment_id + '"><div class="pd5"><a class="avt fl" target="_blank" href="' + comment_at_url + '"><img src="' + comment_avatar + '"></a><div class="comment_content"><h5><div class="fl"><a class="comment_name" href="' + comment_at_url + '">' + comment_author + '</a><span>' + data.postdate + '</span></div><div class="fr reply_this">[回复]</div><div class="clear"></div></h5><div class="comment_p"><div class="comment_pct">' + data.content + '</div></div></div><div class="clear"></div><div class="comment_reply"></div></div></li>');
					document.getElementById('container').scrollTop = cmofsT;
					$('#add_newpost').removeClass('show');
					$('.us_panel_post').find('span em').html(parseInt($('.us_panel_post').find('span em').html()) + 1);
					replyThis();
				}, 'json');
			}
		});
	};
	replyThis();
	$('.t_slide').click(function() {
		if ($('#choose_album').hasClass('show')) {
			$('#choose_album,.menu_slide').removeClass('show');
		} else {
			$('#choose_album,.menu_slide').addClass('show');
		}
	});
	$('.menu_slide').click(function() {
		$('.t_slide').trigger('click');
	});
	$('.edit_this').click(function() {});
	$('.edit_album_msk').click(function() {
		$('#edit_album').removeClass('show');
	});
	var editAlbum = (function() {
		var _this;
		$('.edit_this').click(function() {
			_this = $(this), pid = _this.parent().parent().parent().attr('data-id'), title = _this.parent().parent().parent().find('dt .pd5').html();
			$('#edit_album').addClass('show');
			$('.edit_album_input').val(title);
			$('.edit_album_sure').click(function() {
				$.post("http://www.uehtml.com/service/editUserCat", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					id: pid,
					title: $('.edit_album_input').val()
				}, function(data) {
					_this.parent().parent().parent().find('dt .pd5').html($('.edit_album_input').val());
					$('#edit_album').removeClass('show');
				}, 'json');
			});
			$('.edit_album_delete').click(function() {
				$.post("http://www.uehtml.com/service/removeUserCat", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					id: pid
				}, function(data) {
					_this.parent().parent().parent().remove();
					$('#edit_album').removeClass('show');
				}, 'json');
			});
		});
	}());
	$('.us_panel_like').click(function() {
		if (logined == 1) {
			var _this = $(this);
			if ($(this).hasClass('liked')) {
				$.post("http://www.uehtml.com/service/removeLike", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					postid: commentId2
				}, function() {
					_this.removeClass('liked');
					_this.find('span em').html(parseInt(_this.find('span em').html()) - 1);
				});
			} else {
				$('#add_favorite').addClass('show');
			}
		} else {
			$('#reg_index').addClass('show');
		}
	});
	$('#add_favorite .hd .fr').click(function() {
		$('#add_favorite').removeClass('show');
	});
	$('.created_cate_add').click(function() {
		if ($('.created_cate_ipt input').val() != '') {
			var v = $('.created_cate_ipt input').val();
			$.post("http://www.uehtml.com/service/addUserCat", {
				timestamp: YYToken.timestamp,
				token: YYToken.token,
				fid: $('.created_cate_ipt input').val()
			}, function(data) {
				if (typeof(data) != 'object') {
					$('#add_favorites_choose').append('<li data-id="' + data + '"><i></i><span>' + v + '</span><i class="e"></i></li>');
					$('.ct li').click(function() {
						var _this = $(this),
							d = $(this).attr('data-id');
						if ($(this).hasClass('a_selected') == false) {
							$.post("http://www.uehtml.com/service/addLike", {
								timestamp: YYToken.timestamp,
								token: YYToken.token,
								postid: commentId2,
								cid: d
							}, function() {
								_this.siblings().removeClass('a_selected');
								_this.addClass('a_selected');
								$('#add_favorite .hd .fr').trigger('click');
								$('.us_panel_like').addClass('liked');
								$('.us_panel_like span em').html(parseInt($('.us_panel_like span em').html()) + 1);
							});
						}
					});
				}
			}, 'json');
		}
	});
})(Zepto)