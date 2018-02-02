import axios from 'axios'
import { getRedirectPath } from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA =' LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const initState = {
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}

//reducer
export function user(state=initState,action){

	switch (action.type){
		case AUTH_SUCCESS:
			return {...state,redirectTo:getRedirectPath(action.payload), msg:'',...action.payload,pwd:''}
		case LOAD_DATA:
			return {...state,...action.payload}
		case ERROR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		case LOGOUT:
			return{...initState,redirectTo:'/login'}
		default :
			return state
	}
	
}
export function logoutSubmit(){
	return {type:LOGOUT}
}
function errorMsg(msg){
	return {msg,type:ERROR_MSG}//return {type:ERROR_MSG,msg:msg}
}
function authSuccess(obj){
	//过滤密码
	const {pwd,...data} = obj
	return {type:AUTH_SUCCESS,payload:data}
}


export function loadData(userinfo){
	return {type:LOAD_DATA,payload:userinfo}
}
export function update(data){
	return 	dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
				if(res.status == 200 && res.data.code ===0){
						dispatch(authSuccess(res.data.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
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
						dispatch(authSuccess(res.data.data))
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
						dispatch(authSuccess({user,pwd,type}))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})

	}
	
}

