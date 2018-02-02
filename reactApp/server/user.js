const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}



Router.get('/list',function(req,res){
	const {type } = req.query


	// User.remove({},function(err,dic){

	// })
	User.find({type},function(err,doc){
		return res.json({code:0,data:doc})
	})   
})

Router.post('/update',function(req,res){

	const userid= req.cookies.userid
		console.log(req.body,userid)
	if(!userid){
		return json.dumps({code:1})
	}
	const body = req.body

	User.findByIdAndUpdate(userid,body,function(err,doc){
		//使用es5合并数据
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		console.log(data)
		return res.json({code:0,data}) 
	})

})
Router.post('/login',function(req,res){
	
	const {user,pwd} = req.body
	User.findOne({user,pwd:md5Pwd(pwd)},function(err,doc){
		if(err){
			return res.json({code:1,msg:'用户不存在或者密码错误'})
		}else{
			if(doc == null){
				return res.json({code:1,msg:'用户不存在或者密码错误'})
			}
			console.log(doc+"HH")
			res.cookie('userid',doc._id)
			return res.json({code:0,data:doc})
		}
		
	})
})
Router.post('/register',function(req,res){
	console.log(req.body)
	const {user,pwd,type} = req.body
	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
		//因为create 无法获取保存成功之后的_id ，所以要使用其他的
		const userModel = new User({user,pwd:md5Pwd(pwd),type})
		userModel.save(function(err,doc){
			if(err){
				return res.json({code:1,msg:'后端出错'})
			}else{
				if(doc == null){
				return res.json({code:1,msg:'用户不存在或者密码错误'})
			}
				const {user,type,_id} = doc
				res.cookie('userid',_id)
				return res.json({code:0,data:{user,type,_id}})
			}
		})
		// User.create({user,pwd:md5Pwd(pwd),type},function(err,doc){
		// 	if(err){
		// 		return res.json({code:1,msg:'后端出错'})
		// 	}else{
		// 		const {user,type,_id} = doc
		// 		res.cookie('userid',_id)
		// 		return res.json({code:0,data:{user,type,_id}})
		// 	}
		// })
	})
})
Router.get('/info',function(req,res){
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid} , _filter ,function(err,doc){
		if(err){
			return res.json({code:1,msg:'后端出错'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
	
})

function md5Pwd(pwd){
	const salt = 'zhangfanzcy_i_9.~~~%$####*&^'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router 