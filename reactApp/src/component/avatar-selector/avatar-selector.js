import React from 'react'
import { Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
	static propTypes = {
		selectAvatar:PropTypes.func.isRequired
	}

	constructor(props) {
	  super(props)
	
	  this.state = {}
	}
	render(){

		const avatarList ='1,2,3,4,5,6,7,8,9,10,11,12,13,14,15'
							.split(',')
							.map(v=>({
								icon:require(`../img/${v}.jpg`),
								text:v
							}))

		const gridHeader = this.state.text ?
						 (<div>
						 	<span>已选择头像</span>
						 	<img style={{width:20}} src={this.state.icon} alt=""/>
						 </div>)
						 : <div>请选择头像</div>
		return (
			<div>
				<List renderHeader={()=>gridHeader}>
					<Grid
					data={avatarList}
					columnNum={5}
					onClick={(e)=>{
						this.setState(e)
						this.props.selectAvatar(e.text)
					}}
					/>
				</List>
				
			</div>
			)
	}
}

export default AvatarSelector