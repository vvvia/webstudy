Vue.component('article-content',{
	template:'\
	<div>\
		<div class="titleBox">\
			<h1>{{article.title}}</h1>\
			<p><i class="glyphicon glyphicon-time"></i><span>{{article.time}}</span><i class="glyphicon glyphicon-eye-open"></i><span>阅读量：{{article.read}}</span></p>\
		</div>\
		<div class="articleText" v-html="article.content"></div>\
	</div>',
	props: ['article']
});

Vue.component('commemt-content',{
	template:'\
	<div class="commentBox">\
		<h3>评论</h3>\
		<p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>\
		<div v-else>\
			<div class="comment" v-for="(item,index) in comment" v-bind:index="index" >\
				<b>{{item.name}}<span>{{item.time}}</span></b>\
				<p @click="changeCommenter(item.name,index)">{{item.content}}</p>\
				<div v-if="item.reply.length > 0">\
					<div class="reply" v-for="reply in item.reply">\
						<b>{{reply.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.reviewers}}<span>{{reply.time}}</span></b>\
						<p @click="changeCommenter(reply.responder,index)"">{{reply.content}}</p>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>',
	props: ['comment'],
	methods: {
		changeCommenter: function(name,index) {
			this.$emit("change",name,index);
		}
	}
});

Vue.component('commentTextarea',{
	template:'\
	<div class="commentBox">\
		<h3>发表评论</h3>\
		<b v-if="type">你回复&nbsp;{{name}}</b>\
		<textarea name="" value="请填写评论内容" v-model="commentText"></textarea>\
		<button class="btn" @click="addComment">发表</button>\
		<button class="btn" @click="canelComment">取消</button>\
	</div>',
	props: ['type','name'],
	data: function(){
		return {commentText:""}
	},
	methods: {
		addComment: function() {
			this.$emit("submit",this.commentText);
			this.commentText = "";
		},
		canelComment: function() {
			this.$emit("canel");
			this.commentText = "";
		}
	}
});

var comment = new Vue({
	el: "#comment",
	data: {
		commenter: "session",   //评论人
		type: 0,                //0为评论作者1为评论别人的评论2为评论别人的别人
		oldComment: null,
		chosedIndex: -1,        //被选中的评论的index
		article: {
			title: "当归泡水喝的九大功效",
			time: "2016-07-12",
			read:50,
			content: "<p>当归是一种我们生活中经常使用到的药材，具有很好的活血补血以及调经止痛等功效，另外对女性月经不调或者是血虚等情况具有很好的治疗效果。日常生活中，很多人喜欢将当归泡水喝，这样不仅操作更加的简单，同时还能够调养身体。今天，小编就来和大家一起说说当归泡水喝的功效，来了解下吧！</p>\
				　　<p>当归泡水喝的功效</p>\
				　　<p>当归是一种非常常用的药材，并且在我国具有非常悠久的使用历史，历史的文献上记载，早在一千多年前我国就已经对当归进行人工培育了，而明朝就已经广泛种植。在我国的诸多中医名著之中，对于当归的药性还有使用方法都有着详细的介绍。具体的当归功效如下：</p>\
				　　<p>第一：改善肺部通气功能，提高体力</p>\
				　　<p>研究发现，将当归泡水喝或者是制作成为当归浸膏服用，能够很好的治疗各种各样的慢性气管炎，同时对于肺气肿还有各种心肺疾病都有着很好的疗效，有效的改善肺部通气情况，并且对于体力的恢复以及提高也有着很好的效果。</p>\
				　　<p>第二：提高身体免疫力</p>\
				　　<p>现代科学研究发现，当归中的萃取物阿魏酸钠，以及当归本身所含有的多糖，在进入身体之后对于体内的吞噬细胞系统具有非常明显的刺激作用，很好的调节以及刺激体内的免疫调节功能恢复。除此之外，健康的人群服用当归之后还能够很好的促进淋巴细胞的转化，令身体越来越健康。</p>"
		},
		comment: [
			{
				name: "有毒的黄同学",
				time: "2016-08-17",
				content: "好,讲得非常好，good",
				reply: [
					{
						responder: "有毒的黄同学",
						reviewers: "傲娇的",
						time: "2016-09-05",
						content: "你说得对"
					},
					{
						responder: "傲娇的",
						reviewers: "有毒的黄同学",
						time: "2016-09-05",
						content: "很强"
					}
				]
			},
			{
				name: "Freedom小黄",
				time: "2016-08-17",
				content: "好,讲得非常好，good",
				reply: []
			}
		]
	},
	methods: {
		addComment: function(data) {
			if(this.type == 0) {
				this.comment.push({
					name: 'session',
					time: getTime(),
					content: data,
					reply: []
				});
				//服务器端变
			}else if(this.type == 1){
				this.comment[this.chosedIndex].reply.push({
					responder: 'session',
					reviewers:this.comment[this.chosedIndex].name,
					time: getTime(),
					content: data
				});
				this.type = 0;
			}
		},
		changCommmer: function(name,index) {
			this.oldComment = name;
			this.chosedIndex = index;
			this.type = 1;
		},
		canelCommit: function() {
			this.type = 0;
		}
	}
})


//格式化时间
function getTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var day = now.getDate();
	month.length < 2 ?  "0" + month : month;
	day.length < 2 ?  "0" + day : day;
	return year+"-"+month+"-"+day;
}