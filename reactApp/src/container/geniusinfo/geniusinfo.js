import React from 'react'
import { NavBar, Icon, InputItem,WhiteSpace,TextareaItem ,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
	state=>state.user,
	{update})
class GeniusInfo extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	title:'',
	  	company:'',
	  	money:'',
	  	desc:'',
	  	avatar:'',
	  	person:''
	  };

	  this.handleChange = this.handleChange.bind(this)
	  this.selectAvatar = this.selectAvatar.bind(this)
	}
	
	handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
	selectAvatar(imgname){
		console.log(imgname)
		this.setState({
			avatar:imgname
		})
	}
	render(){
	
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
			{redirect && redirect!=path ? <Redirect to={this.props.redirectTo}></Redirect>:null } 
				<NavBar mode="dark" >牛人完善信息</NavBar>
				<AvatarSelector
					selectAvatar={this.selectAvatar}
				></AvatarSelector>
				<InputItem 
					onChange={v=>this.handleChange('title',v)}>
					求职岗位
				</InputItem>
				<InputItem 
					onChange={v=>this.handleChange('desc',v)}>
					技能
				</InputItem>
				<TextareaItem 
					onChange={v=>this.handleChange('person',v)}
					rows={3}
					autoHeight
					title='个人简介'
					/>
					
				
				<Button type="primary"
					onClick={()=>{
						this.props.update(this.state)
					}}
				> 保存</Button>
				
			</div>
			)
	}
}

export default GeniusInfo