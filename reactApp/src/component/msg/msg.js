import React from 'react'
import { connect } from  'react-redux'
import {
	List ,
	Badge
} from 'antd-mobile'
@connect(
	state=>state
	)

class Msg extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	getLast(arr){
		return arr[arr.length-1]
	}
	render(){
		// if(!this.props.chat.chatmsg.length){
		// 	return null
		// }
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		

		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		console.log(msgGroup)
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last - a_last
		})



		//按照chatid 分组
		return (
			<div>
				
					{chatList.map(v=>{
						const lastItem = this.getLast(v)
						console.log(v)
					const targetId = v[0].from == userid ? v[0].to:v[0].from
					const unreadNum = v.filter (v=>!v.read && v.to ==userid ).length
					if(!this.props.chat.users[targetId]){
						return null
					}
					console.log(this.props.chat.users[targetId])
					const name =this.props.chat.users[targetId].name 
					const avatar =this.props.chat.users[targetId].avatar 

					return(  
						<List key={lastItem._id}><Item 
							extra={<Badge text={unreadNum}></Badge>}
							thumb={require(`../img/${avatar}.jpg`)}
							arrow ="horizontal"
							onClick={()=>{
								this.props.history.push(`/chat/${targetId}`)
							}}
							>
							{lastItem.content}
							<Brief>{name}</Brief>	
							</Item></List>
						)
						})}
				
			</div>
			)
	}
}

export default Msg 