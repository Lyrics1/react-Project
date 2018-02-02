import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from  'react-router-dom'
@withRouter
 class NavLinkBar extends React.Component{

	 static propTypes = {
		data:PropTypes.array.isRequired
	 }
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {};
 	}

 	render(){
 		const navList = this.props.data.filter(v=>!v.hide)//过滤掉hide为true的
 		console.log(navList)
 		const {pathname} =  this.props.location
 		return (
			<TabBar >
				{navList.map(v=>(
					<TabBar.Item
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
 			)
 	}
 }

 export default NavLinkBar