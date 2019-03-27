/**
 * 通过id找到某个元素的方法
 */
var $id = function(id){
	return document.getElementById(id)
}
var ProID = 0
var CityID = 0
var currentCityName
var currentProRemark
/**
 * 先把能够添加的【省】【市】【县】全部添加到option中
 */
function addProRemark(){
	// 找到省份所在的select标签
	var proRemark = $id("ProRemark")
	// 准备一个数组
	var arr = []
	// 获取到省份的数目  34
	var len = selectorObj.provinceList.length
	// 遍历【省】数组，得到的每一个元素都是【省对象】
	for (var province of selectorObj.provinceList) {
		console.log(province)
		// 遍历得到selectorObj.provinceList.length个的变量i
		for(var i = 1; i <= len; i ++){
			// 如果【省】的顺序等于遍历到的变量i
			if(province.ProSort === i){
				// 则将该省份的ProName存储到数组元素中
				arr[i - 1] = province.ProName
				// 退出并重新遍历下一个省
				break
			}
		}
	}
	// 把数组中的元素逐个追加成为proRemark的孩子
	for(var i = 0; i < len; i++){
		// 创建选项option节点元素
		var optionNode = document.createElement("option")
		// 给节点赋值
		optionNode.innerHTML = arr[i]
		optionNode.value = arr[i]
		// 给【省份】的select追加孩子
		proRemark.appendChild(optionNode)
	}
}
// 执行函数，添加省份
addProRemark()
// 当选择某个省份
$id("ProRemark").onchange = function(){
	// 得到某个【省份的值】
	currentProRemark = this.value
	for(var province of selectorObj.provinceList){
		// 如果当前选择的省份和遍历到的省份名一致
		if(province.ProName === currentProRemark){
			// 获取到当前选择的省份的ProID号
			ProID = province.ProID
			//得到ProID后退出
			break
		}
	}
	// 前面的目的是为了得到ProID值，然后可以根据实际情况添加与
	// ProID对应的【城市】
	addcityList()
}
// 定义添加城市的方法
function addcityList(){
	var cityName = $id("CityName")
	cityName.innerHTML = ""
	/**
	 * 【遍历城市数组】得到每一个城市对象
	 */
	for (var city of selectorObj.cityList) {
		// 如果城市自带的ProID号码city.ProID和【省份自带的ProID号码】
		// 相同，则说明该城市属于该省份
		if(city.ProID === ProID){
			// 创建选项节点元素
			var optionNode = document.createElement("option")
			// 给节点赋值
			optionNode.innerHTML = city.CityName
			optionNode.value = city.CityName
			cityName.appendChild(optionNode)
		}
	}
}
//==================
// 当监听到【城市】有变化
$id("CityName").onchange = function(){
	// 得到当前城市的值
	currentCityName = this.value
	for (var city of selectorObj.cityList) {
		// 获取到当前选择的城市的CityID号
		if(city.CityName === currentCityName){
			// 记录下当前城市的CityID号码
			CityID = city.CityID
			// 目的达到，得到CityID后退出
			break
		}
	}
	// 添加县区值
	addcountyList()
}
// 添加县区
function addcountyList(){
	var disName = $id("DisName")
	disName.innerHTML = ''
	/**
	 * 【遍历县区数组】得到每一个县区对象
	 */
	for (var county of selectorObj.countyList) {
		if(county.CityID === CityID){
			// 创建选项节点元素
			var optionNode = document.createElement("option")
			// 给节点赋值
			optionNode.innerHTML = county.DisName
			optionNode.value = county.DisName
			disName.appendChild(optionNode)
		}
	}
}
