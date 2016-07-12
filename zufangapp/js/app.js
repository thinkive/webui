var indexApp = {
	//入口方法
	init : function (valueJson) {
		this.valueJson = valueJson; //获取前台页面传入的参数
		this.wheelInit(); //一些样式的初始化 如圆形的高度设置等
		this.resize(); //onresize 事件 重置样式
		this.cancel($('.false')); //注册取消按钮的点击事件
		this.cancel($('.close'));//注册再来一次按钮的点击事件
		return this; //返回对象本身,使其可以链式调用
	},
	//转盘初始化
	wheelInit : function () {
		var t = this;
		t.valueJson['wheelBody'].css('height', t.valueJson['wheelBody'].css('width'));
		t.valueJson['wheelSmall'].css('height', t.valueJson['wheelSmall'].css('width'));
		t.showStars(); //某几个小圆点高亮
	},
	//窗口改变时的重新设置样式
	resize : function () {
		var t = this;
		$(window).resize(function () {
			t.wheelInit();//窗口发生变化的时候重置样式
		});
	},
	//计算并且排列小圆点
	showStars : function () {
		var t = this;
		for(var i=0; i < t.valueJson['starsNum']; i++) {
			var oStar = document.createElement('div');

			if(i%2 == 0) { //奇数的圆点增加高亮的效果(外阴影)
				oStar.style.boxShadow = '0 0 5px #fff';
			}	
			oStar.className = 'stars';
			oStar.style.left = t.valueJson['starsPostion'][i][0] + '%';
			oStar.style.top = t.valueJson['starsPostion'][i][1] + '%';
			t.valueJson['wheelBody'].append(oStar);

		}
	},
	//取消按钮事件绑定
	cancel : function (obj) {
		obj.click(function () {
			$(this).parents('.dialog').css('display','none');
		});
	},
	//转盘开始的初始化函数 以及点击事件 通过链式调用加载 而非init()初始化加载,这样做,当未开始或者已结束页面不需要转动的时候,不链式调用此方法就行
	wheelStart : function () {
		var t = this;
		t.nowRan = 0; //当前弧度
		t.once = true; //是否第一次
		t.onStart = true; //是否开始了转动

		//点击事件
		t.valueJson['startBtn'].click(function () {
			if(t.onStart == true) { //只有 为 true 的 时候 才允许转动
				t.onStart = false;

				//如果开启了关注 并且 当前 用户 没有关注
				if(t.valueJson['is_gz'] == 1 && t.valueJson['is_follow'] == 2) {
					t.dialog($('.gz')); //弹出关注提示框
				}else {

					//ajax 事件 获取
					//得到的参数详细见交互文档
					
					/*$.ajax({
						'type' : 'POST',
						'url' : t.valueJson['clickAjaxUrl'],
						success : function (data) {*/
							var data = {'status' : 1, 'actionStatus' : 1, 'ran' : 40, 'onceran' : 40, 'num' : 1}
							if(data['status'] == 1) { //表示成功 
								t.showWheel(data); //执行转动效果
							}else if(data['status'] == 2){ //金额不足 或者次数不足
								t.dialog($('.info'),data); //没有按钮的提示信息
							}else {         //出现了异常错误
								t.dialog($('.again'),data);  //执行带按钮的提示框
							}
						/*}
					});*/
				}
			}
		});
	},

	//转盘转动具体算法
	showWheel : function (data) {
		var t = this;
		//需要转动的值 等与当前值 + 默认转动7200度 + 后台计算传过来的度数
		var ra = t.nowRan + t.valueJson['actionRan'] + data['ran'];

		//第一次的话 弧度要加上每一块弧度的一半
		if(t.once) {
			t.once = false;
			ra = ra + (data['onceran'] / 2)
		}

		//注意指针 和 转盘 反方向转动 来达到 指针 不动的效果
		t.valueJson['wheelBody'].css('webkitTransform','rotate('+ ra +'deg)');
		t.valueJson['startBtn'].css('webkitTransform','rotate('+ (-ra) +'deg)');

		//重新获取当前的度数
		t.nowRan = ra;

		//转盘转动需要4S  这里 4.5S 后 执行 各种弹出提示信息框的事件
		setTimeout(function () {
			t.showDialog(data);
			t.onStart = true;
		},4500);
	},

	//根据各种不同的参数 显示弹出层的提示框
	showDialog : function (data) {
		var t = this;

		if(data['actionStatus'] == 1) {  //值为1 表示 抽取到了现金红包
			t.deduct(data); //扣除次数;
			t.dialog($('.theForm'), data); //获得奖品的 提示信息框
		}else if(data['actionStatus'] == 2) {   //值为2 表示 再来一次  再来一次不扣除次数
			t.dialog($('.again'), data);//再来一次
		}else if(data['actionStatus'] == 3) {  //值为3 表示 谢谢参与
			t.deduct(data); //扣除次数;  
			t.dialog($('.again'), data);//谢谢参与
		}
	},

	//扣除次数的相关操作  次数的 参数 也是ajax 后台传递过来
	deduct : function (data) {
		$('.g-num').find('em').html(data['num']);
	},

	//弹出层
	dialog : function (obj, data, bl) {
		if(data && !bl) { //关注 再来一次  谢谢参与  系统异常 都是执行此处
			obj.find('d-main').children('p').html(data['mess']);
		}

		//打开弹出层
		obj.css('display','block');

	}

}