const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const utils = require('utility')

const UserRouter = require('./user')
const app = express();
app.use(cookieParser())
app.use(bodyParser.json())


app.use('/user',UserRouter);//开启中间件
app.listen(8080,function(){
	console.log("port 8080");
})
