import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
	state=>state.chatuser,
	{getUserList})
class Genius extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	}
}

componentDidMount(){
	this.props.getUserList('boss')
}

	render(){
		return <UserCard userList = {this.props.userList}></UserCard>

	}
}

export default Genius