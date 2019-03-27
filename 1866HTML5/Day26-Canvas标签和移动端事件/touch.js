/* 封装【自定义touch事件库】
* 注意：这里前面有一个分号，是为了防止引用其他库的时候，
* 那个库没有分号结尾，以后代码压缩的话容易出问题。所以
* 在这里添加一个分号，为了隔开不同的两个代码库*/
 ;(function (window, undefined) {
 	/**
 	 * 查询方法：这是一个匿名函数，参数是【选择器】selector
 	 * 变量query的声明会被提前，而赋值的过程靠后。
 	 * @param {Object} selector
 	 */
	var query = function (selector) {
		//其实就是调用query的新的原型对象中的init方法，从下面的init方法可知
		//返回的是this，联系这里看，其实就是query对象。这里的query.fn来自下面的
		//query.fn = query.prototype，也就是说，该函数对象返回的是它自己(对象)。
		//JS是一门奇葩的语言，这样写从语法上说并没有错误。
		return query.fn.init(selector);
	}
	/**
	 * query来自【var query】对query的声明。这里的query此时可以理解为是一个空的对象。
	 * fn是在这里声明出来的，【query.fn】表示往这个空的对象中添加一个叫fn的属性，这个
	 * 属性其实就是query的prototype属性的另一种叫法。query对象原来有一个默认的原型对象的
	 * 但是这里我们给它另外指定了一个原型对象，即后面的{}中的内容。这个新指定的原型对象中
	 * 有一个叫init的方法。所以上面可以写成：query.fn.init(selector);
	 */
	query.fn = query.prototype = {
		/*
		 * 初始化方法（就是模拟获取元素的方法，但这里获取的不是真正的元素，
		 * 真正的元素存在于整个对象的element属性中
		 */
		init : function (selector) {
			if (typeof selector == 'string') {
				//这里是给this对象添加一个叫做element的属性，
				//这个element不是window上的element
				this.element = document.querySelector(selector);
				return this;
			}
		},
		//【单击】
		//handler是回调函数，就是单击之后做出的响应功能。
		tap : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			//用来区分和长按的时间变量，做一个时间差判断
			var startTime;
			var endTime;
			//手势触发方法
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下的时候记录一个时间
						startTime = new Date().getTime();
						break;
					case 'touchend':
						//离开的时候记录一个时间
						endTime = new Date().getTime();
						if (endTime - startTime < 500) {
							//如果按下和抬起的时间差为500毫秒以内，那就认为是单击
							//在手势离开的时候，回调【handler();】方法
							handler();	
						}
						break;
				}
			}
		},
		//长按
		longTap : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			//这个移动事件 是为了解决和其他滑动事件冲突问题
			this.element.addEventListener('touchmove', touchFn);
			var timerId;
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下达到500毫秒，我们认为是在长按
						timerId = setTimeout(function () {
							handler();
						}, 500);
						break;
					case 'touchend':
						//离开的时候清空定时器
						clearTimeout(timerId);
						break;
					case 'touchmove':
						//一旦移动了，就清空定时器（也就不是长按事件了）
						clearTimeout(timerId);
						break;
				}
			}
		},
		//双击
		doubleTap : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			//记录点击次数
			var tapCount = 0;
			var timerId;
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下的时候记录一次
						tapCount++;
						
						//每次刚进来的时候，清空一下定时器
						clearTimeout(timerId);
						
						timerId = setTimeout(function () {
							//如果达到500毫秒，我们认为就不是双击，要把tapCount清零
							tapCount = 0;
						}, 500);
						
						break;
					case 'touchend':
						if (tapCount == 2) {
							//当按下2次后离开，才算是双击
							handler();
							//触发双击后，清空点击次数
							tapCount = 0;
							//清空定时器
							clearTimeout(timerId);
						}
						break;
				}
			}
		},
		//左滑
		swiperLeft : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			
			//手势触发的坐标
			var startX, startY, endX, endY;
			
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下的时候记录 按下的时候坐标
						startX = e.targetTouches[0].pageX;
						startY = e.targetTouches[0].pageY;
						
						break;
					case 'touchend':
						//离开的时候记录 离开的时候坐标
						endX = e.changedTouches[0].pageX;
						endY = e.changedTouches[0].pageY;
						//1、判断是否是左右滑动
						//2、判断具体是否是左滑 (我们要给一个容错范围是25px)
						if (Math.abs(endX - startX) >= Math.abs(endY - startY) 
								&& (startX - endX) >= 25) {
							handler();
						}
						break;
				}
			}
		}
	}
	/**
	 * 【关联】这里是设置query.fn.init的原型，把它的原型设置为query.fn，
	 * 从前面query.fn = query.prototype可知，query对象的原型即query.prototype，
	 * 其实也就是query.fn，它的原型已经被重新设置为{XXX}所表示的对象了。
	 * query.fn.init表示query的原型中的init方法，那么query.fn.init.prototype的意思是
	 * query的原型中的init方法(init方法也是一个函数对象)的原型和query的原型相同，
	 * 即query.fn。
	 */
	query.fn.init.prototype = query.fn;
	/*$表示window的一个属性，【window.$】这种写法意思是给window添加了一个名叫【$】的属性，
	 那么接下来的【window.query】表示给window添加的这个$属性的名字也可以叫【query】
	 最后面的query来自【var query】即把这个【query代表的函数】作为window的query属性
	 的值。整体来看这个touch.js是一个自执行的函数，一旦window被加载，将自动立即执行。*/
	window.$ = window.query = query;
})(window, undefined);
