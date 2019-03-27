var timeIntervalId
var i = 0
timeIntervalId = setInterval(timer,1000)
function timer () {
	i++
	if (i == 60) {
		clearInterval(timer)
		timeIntervalId = 0
	}
}
postMessage(i)
