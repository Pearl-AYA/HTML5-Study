/**
 * 【🐷】整场游戏是一个【游戏对象】可以写成字面量的形式
 * 1、这个游戏对象有一个【游戏名】
 * 2、有3个游戏玩家players,存放在一个数组中
 * 3、有一副牌：是个牌对象
 * 4、有一个发牌的方法
 */
var game = {
	// gameName是键值对的键，【斗地主】是键值对的值
	gameName: "斗地主",
	players: [new Player("冠希"),
	new Player("柏芝"),
	new Player("马蓉")],
	// 游戏使用的poker道具
	poker: new Poker(),
	// 给当前游戏玩家发牌
	sendPoker: function(){
		// 先洗牌
		this.poker.shuffle()
		// 开始发牌
		for (var i = 0; i < 51; i ++) {
			var card = this.poker.cards[i]
			this.players[i % 3].cards.push(card)
		}
	},
	// 游戏入门
	startGame: function(){
		// 先发牌
		this.sendPoker()
		// 在页面中显示每个人的牌
	}
}
// 启动游戏
game.startGame()
/**
 * 可以创建玩家对象的构造函数
 * 1、游戏玩家有名字
 * 2、游戏玩家有存储牌的容器(数组)
 */
function Player(playerName){
	this.playerName = playerName;
	// 玩家手中的牌，只有当游戏发牌之后才会有值(使用一个数组装牌)
	this.cards = []
}
// 扑克牌
function Poker(){
	// 一副扑克中的card的数量
	this.cardCount = 54;
	// 代表一副扑克中的所有的card(暂时还没有，要new出以后才有)
	this.cards = [];
	// 用一个临时的局部变量存储，表示扑克牌中的cards的数组
	var tempCards = this.cards;
	// 写一个自执行的函数，给扑克牌初始化每张card
	// 也就是说调用new Poker()的时候会自动执行该函数
	(function(){
		var huases = ["♠️", "♥️", "♣️", "♦️"]
		var points = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
		"10", "J", "Q", "K"]
		// 遍历4种花色
		for (var i = 0; i < 4; i++) {
			// 遍历每种花色的13张牌
			for (var j = 0; j < 13; j++) {
				var card = new Card(huases[i], points[j])
				// 将该扑克牌压栈到【扑克牌】数组中
				tempCards.push(card)
			}
		}
		// 单独创建【大王】和【小王】并压栈到数组中
		tempCards.push(new Card("", "大王"))
		tempCards.push(new Card("", "小王"))
	})()
	// 自洗牌功能
	this.shuffle = function(){
		// 每次生成2个随机的0--53的随机整数，然后交换
		/*for (var i= 0; i < 100; i++) {
			// 生成两个速记的0---53的整数,表示poker中的card的下标
			var num1 = parseInt(Math.random() * 54)
			var num2 = parseInt(Math.random() * 54)
			// 中间变量法进行交换
			var card = this.cards[num1]
			this.cards[num1] = this.cards[num2]
			this.cards[num2] = card
		}*/
		
		// 大神的超级简单的随机打乱数组中的元素的代码
		this.cards.sort(function(a, b){
			return Math.random() > 0.5 ? 1 : -1
		})
	}
}
// 每张牌的构造方法
function Card(huase, point){
	// 每张牌的花色
	this.huase = huase;
	// 每张牌的点数
	this.point = point;
	// 当直接输出这个构造方法创建的对象的时候，
	//会调用这个toString方法。然后输出这个方法的返回值。
	this.toString = function(){
		return this.huase + this.point
	}
}
