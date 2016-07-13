$(function(){
	$(function() {
		b = $(document).height();
		$("body").css({
			"background-color": "#ebebeb",
			"height": b
		})
	});
	$(".ontc").click(function() {
		$(".page-tztck").show()
	});
	$(".closea").click(function() {
		$(".page-tztck").hide()
	});
	$(".page-tztck").click(function() {
		$(".page-tztck").hide()
	});
	$(".pacl").click(function() {
		$(".page-wb").show()
	});
	$(".closea").click(function() {
		$(".page-wb").hide()
	});
	$(".page-wb").click(function() {
		$(".page-wb").hide()
	});
	$(".onyuhu").click(function() {
		$(".yonhu").toggle()
	});
	$(".sqsubmit").click(function() {
		$(".tjch").show()
	});
	$(".tjch").click(function() {
		$(".tjch").hide()
	});
	$(".yinghang").css("display", "none");
	$("#Select_CashType").change(Select_CashType_Change);
	$(".phtul li").click(function() {
		$(".phtul li").removeClass("phtact");
		$(this).addClass("phtact")
	});

	$(".ljcx").click(function() {
		var a = $(".tphone2").val();
		var b = /^0?1[3|4|5|8][0-9]\d{8}$/;
		if (a == '') {
			alert("对不起，电话不能为空！");
			return false
		} else if (!b.test(a)) {
			alert("对不起，电话格式不正确！");
			return false
		}
	})





});

function Select_CashType_Change() {
	var a = $("#Select_CashType").val();
	if (a == "支付宝") {
		$("#Td_CashUserName").text("支付宝账号");
		$(".yinghang").css("display", "none")
	}
	if (a == "微信支付") {
		$("#Td_CashUserName").text("微信号");
		$(".yinghang").css("display", "none")
	}
	if (a == "银行转账") {
		$("#Td_CashUserName").text("银行卡号");
		$(".yinghang").css("display", "")
	}
}



