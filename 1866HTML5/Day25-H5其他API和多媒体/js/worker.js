var i = 0;
// 这里是在【子线程当中执行的代码】
for(i = 0; i < 200000000; i++){
	// 模拟耗时操作
}
// 【切记】在子线程中不要去执行更新UI的操作，这里就是
// 【子线程环境】通过postMessage()方法返回到主线程中，可以传递参数
// 当耗时操作完成后，调用这个方法会回到主线程中的【监听事件回调函数】中
// 即会回到onMessage()函数中，这里传递的i到主线程中就是evt.data了。
// 也就是说evt.data就是子线程耗时操作后返回的数据
postMessage(i)
