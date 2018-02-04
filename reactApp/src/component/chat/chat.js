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
		// this.props.getMsgList()
		// this.props.recvMsg()
		
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
		const Item = List.Item
		console.log(this.props)

		return (
			<div id='chat-page'>
			<NavBar mode='dark' className='fixd-header'>
				{user}
			</NavBar>
			<div className='page-content'>
				{this.props.chat.chatmsg.map(v=>{
					
					return v.from == user ?(
						<List key={v._id}>
							<Item 
								
							>{v.content}</Item>
						</List>
					 ):
					 (<List key={v._id}>
							<Item 
								extra={'dd'}
							className='chat-me'> {v.content}</Item>
						</List>)

				})}
			</div>
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
				
			</div>
			)
	}
} 

export default Chat