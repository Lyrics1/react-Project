import axios from 'axios'


import io from 'socket.io-client'
const socket = io('ws://localhost:8080')
//聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState={
	chatmsg:[],
	unread:0,
	users:{}

}
//reduce
export function chat(state = initState,action){
	switch(action.type){
		case MSG_LIST:
			return {...state,chatmsg:action.payload,users:action.users,unread:action.payload.filter(v=>!v.read&& v.to == action.userid).length}
		case MSG_RECV:
		const n= action.payload.to == action.userid ? 1:0
			return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
		// case MSG_READ:

		default :
			return state
	}
}

function msgList(msgs,users,userid){
	return {type:MSG_LIST,payload:msgs,users:users,userid:userid}
}
function msgRecv(msg,userid){

	return {type:MSG_RECV,payload:msg,userid:userid}
}
export function getMsgList(){

	return (dispatch,getState)=>{
		console.log('getstate',getState())
		axios.get('/user/getmsglist')
			.then(res=>{
				if(res.status === 200 && res.data.code ===0 ){
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs,res.data.users,userid))
				}
			})
	}
}

export function sendMsg({from ,to ,msg}){
	return dispatch=>{
		socket.emit('sendmsg',{from,to,msg})
	}
}

export function recvMsg(){
	return (dispatch,getState)=>{
		socket.on('recvmsg',function(data){
		const userid = getState().user._id

			dispatch(msgRecv(data,userid))
		})
	}
}