const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const utils = require('utility')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')
io.on('connection',function(socket){

		socket.on('sendmsg',function(data){
			const {from,to ,msg} =data
			const chatid = [from,to].sort().join('_')
			Chat.create({chatid,from,to,content:msg},function(err,doc){
				if(!err){
					io.emit('recvmsg',Object.assign({},doc._doc))
				}
			})

		
		
		})
})





const UserRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())


app.use('/user',UserRouter);//开启中间件

app.use(function(req,res,next){
	if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
		return next()
	}
	return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(8080,function(){
	console.log("port 8080");
})
