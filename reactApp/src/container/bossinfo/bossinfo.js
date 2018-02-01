import React from 'react'
import { NavBar, Icon, InputItem,WhiteSpace,TextareaItem ,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
	state=>state.user,
	{update})
class BossInfo extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	title:'',
	  	company:'',
	  	money:'',
	  	desc:'',
	  	avatar:''
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
				<NavBar mode="dark" >Boss</NavBar>
				<AvatarSelector
					selectAvatar={this.selectAvatar}
				></AvatarSelector>
				<InputItem 
					onChange={v=>this.handleChange('title',v)}>
					招聘职位
				</InputItem>
				<InputItem 
					onChange={v=>this.handleChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem 
					onChange= {v=>this.handleChange('money',v)}>
					职位薪资
				</InputItem>
				<TextareaItem 
					onChange={v=>this.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
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

export default BossInfo