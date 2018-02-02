import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Card ,WhiteSpace , WingBlank} from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
	state=>state.chatuser,
	{getUserList})
class Boss extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	data:[]
	}

}

componentDidMount(){
	this.props.getUserList('genius')
}

	render(){
		return (
			<div>
				<WingBlank>
					{this.props.userList.map(v=>(
						v.avatar ?
						(<Card key={v._id}>
							<Card.Header 
							title={<span>{v.user}</span>}
							thumb={require(`../img/${v.avatar}.jpg`)}
							extra={<span>{v.title}</span>}
							>

							</Card.Header>
							<Card.Body>
							{v.desc.split('\n').map(v=>(
								<div key={v}>{v}</div>
								))}
							</Card.Body>
						</Card>): null
						))}
				</WingBlank>
			</div>
			)
	}
}

export default Boss