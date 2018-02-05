import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from  'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(
	state=>state.chat
	)
 class NavLinkBar extends React.Component{

	 static propTypes = {
		data:PropTypes.array.isRequired
	 }
 	constructor(props) {
 	  super(props)
 	
 	  this.state = {}
 	}

 	render(){
 		const navList = this.props.data.filter(v=>!v.hide)//过滤掉hide为true的
 		const {pathname} =  this.props.location
 		return (
 			<div className='fixd-footer'>
			<TabBar >
				{navList.map(v=>(
					<TabBar.Item 
						badge={v.path=='/msg' ?this.props.unread :0}
						key={v.path}
						title={v.text}
						icon={{uri:require(`./navimg/${v.icon}.png`)}}
						selectedIcon={{uri:require(`./navimg/${v.icon}-active.png`)}}
						selected={pathname === v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					>	
				</TabBar.Item>
				))}
			</TabBar>
			</div>
 			)
 	}
 }

 export default NavLinkBar