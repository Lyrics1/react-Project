const mongoose = require('mongoose');
//链接mongo 并且使用react 这个集合
const DB_URL = 'mongodb://localhost:27017/react-chat'
mongoose.connect(DB_URL)

const models = {
	user:{
		'user':{'type':String,'require':true},
		'pwd':{'type':String,'require':true},
		'type':{'type':String,'require':true},
		'avatar':{'type':String},//头像,
		'desc':{'type':String},//个人简介
		'title':{'type':String},//职位名
		//专属boss字段
		'company':{'type':String},
		'money':{'type':String}

	},
	chat:{
		'chatid':{'type':String,'require':true},
		'read':{'type':Boolean,'require':false},
		'from':{'type':String,'require':true},
		'to':{'type':String,'require':true},
		'content':{'type':String,'require':true,'default':''},
		'create_time':{'type':Number,'default':new Date().getTime()}
	}
}


//批量生成
for(let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]))
}


module.exports  = {
	getModel:function(name){
		return mongoose.model(name)
	}
}