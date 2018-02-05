import React from 'react'
import { List ,InputItem ,Radio,WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import Logo from '../../component/logo/logo'
import { register} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import  reactFrom from '../../component/react-from/react-from'

@connect(
	state=>state.user,
	{ register }
	)
@reactFrom
class Register extends React.Component{
	constructor(props) {
	  super(props)

	this.handleRegister = this.handleRegister.bind(this)
	}
	componentDidMount(){
		this.props.handleChange('type','genius')
	}
	handleRegister(){
		this.props.register(this.props.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
			{this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect>:null } 
				<Logo></Logo>
				<List>
				{this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
					<InputItem
						onChange = {v=>this.props.handleChange('user',v)}
					>用户名</InputItem>
					<WhiteSpace/>
					<InputItem type="password"
						onChange = {v=>this.props.handleChange('pwd',v)}
					>密码</InputItem>
					<WhiteSpace/>
					<InputItem type="password"
						onChange = {v=>this.props.handleChange('repeatpwd',v)}
					>确认密码</InputItem>
					<WhiteSpace/>
					<RadioItem 
						checked={this.props.state.type == 'genius'}
						onChange={()=>this.props.handleChange('type','genius')}
					>
						牛人
					</RadioItem>
					<RadioItem 
						checked={this.props.state.type == 'boss'}
						onChange={()=>this.props.handleChange('type','boss')}
					>
						BOSS
					</RadioItem>
					<WhiteSpace/>
					<Button type='primary' onClick={this.handleRegister}>注册</Button>
				</List>
			</div>

			)
	}
}



export default Register