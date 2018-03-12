$(".more-in").on("click",function(){
			$(".more_information,.cover").fadeIn(300);
		})
		//折叠效果
		$(".more-goods").on("click",function(){
			$(".hide_goods").addClass("block_goods").removeClass("hide_goods");
			$(".more_information").height($(".more_information").height());
		})
		//获取屏幕宽高度
		function WHFn(){
			$(".cover").height($(document).height());
			$(".cover").width($(document).width());
			$(".more_information").height($(document).height());
		}
		WHFn();
		$(window).on("resize",function(){
			WHFn();
		})
		//点击遮罩层关闭弹窗
		$(".cover").on("click",function(){
			$(".more_information, .cover").fadeOut(300);
		})