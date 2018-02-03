import React from 'react'
import io from 'socket.io-client'
import {List ,InputItem ,NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
const socket = io('ws://localhost:8080')

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg}
	)

class Chat extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	text:'',
	  	msg:[]
	  };
	}
	componentDidMount(){
		this.props.getMsgList()
		this.props.recvMsg()
		
	}
	handlesubmit(){
		console.log("l")
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text

		this.props.sendMsg({from,to,msg})
		this.setState({
			text:''
		})
			
	}

	render(){
		const user = this.props.match.params.user
		return (
			<div id='chat-page'>
			<NavBar mode='dark'>
				{user}
			</NavBar>
				{this.props.chat.chatmsg.map(v=>{
					return v.from == user ?(
					 <p key={v._id}>对方发来的 {v.content} </p>):
					 (<p key={v._id}>我 {v.content} </p>)

				})}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange ={v=>{
								this.setState({text:v})
							}}
							extra = {<span  onClick={()=>this.handlesubmit()}>发送</span>}
						></InputItem>
					</List>
				</div>
				Chat {this.props.match.params.user}
			</div>
			)
	}
} 

export default Chat