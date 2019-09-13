window.onload = function() {
	
	// 初始化轮播
	init();
	// 初始化搜索
	search();
	// 初始化轮播图
	banner();
	// 初始化倒计时
	var aSpan = document.querySelectorAll(".jd_box .jd_product .jd_probox .jd_protitle .sk_time .active"),
		time;
	
	var countDownInit = function(target){
		
		// 剩余时间
		time = countDown(target);
		
		aSpan[0].innerHTML = Math.floor(time["day"]/10);
		aSpan[1].innerHTML = time["day"]%10;
		aSpan[2].innerHTML = Math.floor(time["hour"]/10);
		aSpan[3].innerHTML =  time["hour"]%10;
		aSpan[4].innerHTML = Math.floor(time["minute"]/10);
		aSpan[5].innerHTML = time["minute"]%10;
		aSpan[6].innerHTML = Math.floor(time["second"]/10);
		aSpan[7].innerHTML = time["second"]%10;
	}
	// 传入目标时间获取剩余时间并渲染进页面
	countDownInit("2019-8-8");
	// 开启定时器 
	setInterval(function(){countDownInit("2019-8-8")},1000);
	
}


// 轮播图
// 初始化
var init = function() {
	var banner = document.querySelector(".jd_banner"),
		aImg = banner.querySelectorAll(".jd_banner ul:first-child img"), //获取所有轮播图
		ballBox = document.getElementById("ball");     //获取小球盒子 
		
	//根据图片数量生成小球
	
	for(var i = 0;i < aImg.length-2; i++){
		var li = document.createElement("li");
		ballBox.appendChild(li);
	}
	// 默认第一个小球点亮
	var aLi = ballBox.querySelectorAll("li");
	aLi[0].className = "on";
	
	

}

var banner = function() {
		var banner = document.querySelector(".jd_banner"),  //图片盒子
			ul = banner.querySelector(".jd_banner ul:first-child"), //获取所有轮播图
			aImg = banner.querySelectorAll(".jd_banner ul:first-child img"), //获取所有轮播图
			ballBox = document.getElementById("ball"),     //小球盒子
			aLi = ballBox.querySelectorAll("li"),   //所有小球
			screen = banner.offsetWidth;

			
		var index = 1;
		aLi[0].className = "on";
		var timer = setInterval(function() {
			
			index++;
			
			//true表示附加过度效果
			animationShift(true);
			
		},2000);
		
		
		// 监听过渡结束
		ul.addEventListener("transitionend",function() {
			if(index == 9){
				
				index = 1;
				// false表示瞬间切换无过渡
				
				animationShift(false);
			}else if(index == 0){
				
				index = 8;
				// false表示瞬间切换无过渡
				
				animationShift(false);
			}
			
			for(var i =0;i < aLi.length; i++) {
				aLi[i].className = "";
			}
			aLi[index-1].className = "on";
		})
		
		
		
		// 控制是否过渡
		function animationShift(boo) {
			if(boo){
				ul.style.transition = "all .5s ease";
			}else{
				ul.style.transition = "none";
			}
			ul.style.transform = "translateX("+(-index*screen)+"px)";
			
		}
			

		// 监听触摸事件
		
		// 触摸开始
		var isMove = false;
		var newx,oldx,changedx,transformx;
		ul.addEventListener("touchstart",function(e) {
			
			// 触摸开始秦楚定时器
			clearInterval(timer);
			
			oldx = e.touches[0].clientX;
		})
		// 鼠标移动
		
		
		ul.addEventListener("touchmove",function(e) {
			// console.log("手指移动");
			newx = e.touches[0].clientX;
			changedx = Math.floor(newx-oldx);
			transformx = -index*screen+changedx;
			ul.style.transform = "translateX("+transformx+"px)";
			isMove = true;
		})
		
		// 鼠标离开
		
		ul.addEventListener("touchend",function(e) {
			// console.log("手指离开");
			// ul.ontouchmove = null;
			if(isMove){
				if(Math.abs(changedx) < screen/3){
					animationShift(true);
				}else{
					if(changedx > 0){
						index--;
					}else{
						index++;
					}
					animationShift(true);

				}
			}
			
			
			// 触摸结束打开定时器
			timer = setInterval(function() {
				
				index++;
				
				//true表示附加过度效果
				animationShift(true);
				
			},2000);
		})
		
}




// 倒计时
var countDown = function(target) {
	
	var current = new Date();
	var	obj = {
			day: null, //剩余天数
			hour: null,// 剩余小时
			minute: null, //剩余分钟数
			second: null //剩余秒数
		}
	target = target || "2019-8-5";
	target = new Date(target);  //目标时间
	
	obj.day = Math.floor((target-current)/1000/60/60/24);
	obj.hour = Math.floor((target-current)/1000/60/60%24);
	obj.minute = Math.floor((target-current)/1000/60%60);
	obj.second = Math.floor((target-current)/1000%60);
	return obj;
	
}


// 搜索栏
var search = function() {
	var getSearch = document.querySelector(".jd_box .jd_search .jd_search_box"),
		banner = document.querySelector(".jd_box .jd_banner"),
		height = banner.offsetHeight;

	// 搜索栏的滑动样式
	window.onscroll = function(){
		// console.log(1)
		var opacity = 0;
		var top =Math.floor(document.documentElement.scrollTop);
		
		if(top > height)
		{
			opacity = 0.9;
		}else{
			opacity = 0.9*(top/height);
		}
		getSearch.style.backgroundColor = 'rgba(222,0,0,'+opacity+')';
	}

}