import React from 'react'
import { connect} from 'react-redux'
import { NavBar} from 'antd-mobile';
import  NavLinkBar  from '../navlink/navlink'
function Boss(){
	return <h1>Boss</h1>
}
function Genius(){
	return <h1>Genius</h1>
}
function Msg(){
	return <h1>Msg</h1>
}
function User(){
	return <h1>User</h1>
}
@connect(
	state=>state
	)
class Dashboard extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	
	

	render(){
		const { pathname } = this.props.location
		
		const user = this.props.user
		console.log( this.props)
		const navList =[
		{
			path:'/boss',
			text:'牛人',
			icon:'boss',
			title:'牛人列表',
			component:Boss,
			hide:user.type == 'genuis'
			
		},
		{
			path:'/genuis',
			text:'Boss',
			icon:'job',
			title:'Boss列表',
			component:Genius,
			hide:user.type == 'boss'
			
		},
		{
			path:'/msg',
			text:'消息',
			icon:'msg',
			title:'消息列表',
			component:Msg
			
		},
		{
			path:'/me',
			text:'我',
			icon:'user',
			title:'个人中心',
			component:User
			
		}
	]
		return (
			<div>
				<NavBar mode='dard'>{navList.find(v=>v.path== pathname).title}</NavBar>
				gggg
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
			)
	}
}

export default Dashboard