# react-Project
一个完整的react项目


#### react + react-redux + react-router4 + node + mongodb

#### 前后端请求： 使用asios 发送异步请求，

1. 端口不一致： 使用proxy 配置转发（package.json)中进行设置 ，（解决跨域，将所有的请求转发）

2. axios 拦截器，统一进行loading 处理

3. redux 使用异步数据，渲染页面

### axios 

1. 安装： npm install axios --save 

2. 在package.json 添加  "proxy":"http://localhost:8080"

3. 没有使用redux 的时候进行的请求代码

```
Auth.js

import React from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from './Auth.redux'
import  axios  from 'axios'


class Auth extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:{}
	  };
	}

	componentDidMount(){
		axios.get('/data')
			.then(res=>{
				if(res.status == 200){
					this.setState({data:res.data})
					console.log(res)
					console.log(this.state.data)
				}
				
			})
	}

	render(){
		if(!this.state.data.length){
					return null
		}
		console.log(this.props.auth.isAuth)
		return(
			<div>
				<h2>ss{this.state.data[1].user}</h2>
				{  this.props.auth.isAuth ? <Redirect to='/dashboard' /> :null}
				<h1>需等登录</h1>	
				<button onClick={this.props.login}>登录</button>
			</div>
			)
	}
}

const mapStateToProps=(state)=>{
	return (state:state.auth)
}
const actionCreators = {login}

Auth = connect(mapStateToProps,actionCreators)(Auth)
export default Auth

```
使用redux 的axios 请求代码：

```
Auth.js
import React from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login ,getUserData} from './Auth.redux'
import  axios  from 'axios'


class Auth extends React.Component{
	// constructor(props) {
	//   super(props);
	
	//   this.state = {
	//   	data:{}
	//   };
	// }

	componentDidMount(){
		this.props.getUserData();//修改数据
	}

	render(){
		console.log(this.props)
		// if(!this.props.data.length){
		// 	return null;
		// }
		return(
			<div>
				<h2>user:{this.props.auth.user} age:{this.props.auth.age}</h2>
				{  this.props.auth.isAuth ? <Redirect to='/dashboard' /> :null}
				<h1>需等登录</h1>	
				<button onClick={this.props.login}>登录</button>
			</div>
			)
	}
}

const mapStateToProps=(state)=>{
	return (state:state.auth)
}
const actionCreators = {login,getUserData}

Auth = connect(mapStateToProps,actionCreators)(Auth)
export default Auth

```

```
Auth.redux.js

import  axios  from 'axios'

const LOGIN = "LOGIN"
const LOGOUT = "LOGUT"
const USER_DATA = 'USER_DATA'

const initState = {
	isAuth:false,
	user:"A",
	age:20
}


export function auth(state=initState,action){
	console.log(state,action)
	switch(action.type){
		case LOGIN:
			return {...state,isAuth:true}
		case LOGOUT:
			return {...state,isAuth:false}
		case USER_DATA:
			return {...state,...action.payload}
		default:
			return state;
	}
}

//actions

export function getUserData(){
	//利用dispatch 通知数据修改
	return dispatch =>{
		 	axios.get('/data')
			.then(res=>{
				if(res.status == 200){
					dispatch(userData(res.data))
				}
				
			})
	}
}

export function userData(data){
	return {type:USER_DATA,payload:data}
}
export function login(){
	return {type:LOGIN}
}

export function logout (){
	return {type:LOGOUT}
}


```


4. axios 拦截器：
```
import axios from 'axios'
import { Toast } from 'antd-mobile'

//拦截请求
axios.interceptors.request.use(function(config){
	Toast.loading('加载中',0)
	return config
})


//拦截响应

axios.interceptors.response.use(function(config){
	Toast.hide();
	return config
})

```






