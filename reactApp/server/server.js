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
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'

assethook({
	extensions:['jpg','png']
})
import React from 'react'
import {renderToString} from 'react-dom/server';
import  { createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import reducers from '../src/reducer'
import App from '../src/app'
import staticPath from '../build/asset-manifest.json'
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
const store = createStore(reducers,compose(
	applyMiddleware(thunk)
	))
const context = {}
const markup = renderToString(
		(<Provider store={store}>
			<StaticRouter
				location = {req.url}
				context={context}
			>
				<App></App>
				
			</StaticRouter>
		</Provider>)
		)

const pageHTML = `
	<!DOCTYPE html>
	<html lang="en">
	  <head>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	    <meta name="theme-color" content="#000000">
	  
	    <title>Lyrics</title>
	   <link rel="stylesheet" href="/${staticPath['main.css']}" />
	  </head>
	  <body>
	    <noscript>
	      You need to enable JavaScript to run this app.
	    </noscript>
	    <div id="root">${markup}</div>
	    <script src="/${staticPath['main.js']}"></script>
	  </body>
	</html>
`
res.send(pageHTML)
	// return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(8080,function(){
	console.log("port 8080");
})
