import React from 'react'
import { connect } from 'react-redux'
import { Result,  WhiteSpace ,List,Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies'
import {logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
	state=>state.user,
	{logoutSubmit})
class User extends  React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.logout = this.logout.bind(this)
	}

	logout(){
		const alert = Modal.alert
		alert('注销', '确定退出吗???', [
      	{ text: '取消', onPress: () => console.log('cancel') },
      	{ text: '确认', onPress: () =>{
      		browserCookie.erase('userid')
      		this.props.logoutSubmit()
      		console.log(this.props)
      	}}
    	])
	}
	render(){

		const Item = List.Item
		const Brief = Item.Brief
		console.log(this.props)
		return this.props.user?(

			<div >

				<Result
				img={<img src={require(`../img/${this.props.avatar}.jpg`)} alt="头像"/>}
				title={this.props.user}
				message={this.props.type =='boss'? this.props.company:null}
				/>
				<List renderHeader={()=>'简介'}>
					<Item
					multipleLine					>
						{this.props.title}
						{this.props.desc.split('\n').map(
							v=>(<Brief key={v}>{v}</Brief>))}
						{this.props.money ? <Brief>薪资：{this.props.money}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item style={{zIndex:1}} onClick={this.logout}>退出登录</Item>
				</List>	
			</div>
			):<Redirect to={this.props.redirectTo}/>
	}
}

export default User