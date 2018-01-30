import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA =' LOAD_DATA'


const initState = {
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}

//reducer
export function user(state=initState,action){
	console.log(action)
	switch (action.type){
		case REGISTER_SUCCESS:
			return {...state,redirectTo:getRedirectPath(action.payload), msg:'',isAuth:true,...action.payload}
		case LOGIN_SUCCESS:
			return {...state,redirectTo:getRedirectPath(action.payload.data), msg:'',isAuth:true,...action.payload}
		case LOAD_DATA:
			return {...state,...action.payload}
		case ERROR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		default :
			return state
	}
	
}

function errorMsg(msg){
	return {msg,type:ERROR_MSG}//return {type:ERROR_MSG,msg:msg}
}
function registerSuccess(data){
	return {type:REGISTER_SUCCESS,payload:data}
}

function loginSuccess(data){
	console.log(data)
	return {type:LOGIN_SUCCESS,payload:data}
}

export function loadData(userinfo){
	console.log(userinfo)
	return {type:LOAD_DATA,payload:userinfo}
}

export function login({user,pwd}){

	if(!user || !pwd ){
		return errorMsg("用户名密码必须输入")
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{

				if(res.status == 200 && res.data.code ===0){
					console.log(user)
						dispatch(loginSuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
}



export function register({user,pwd,repeatpwd,type}){
	if(!user || !pwd || !type){
		return errorMsg("用户名密码必须输入")
	}
	if(pwd != repeatpwd){
		console.log(pwd,repeatpwd)
		return errorMsg("密码和确认密码不一致")
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
				if(res.status == 200 && res.data.code ===0){
						dispatch(registerSuccess({user,pwd,type}))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})

	}
	
}