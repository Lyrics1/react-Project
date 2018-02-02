import React from 'react'
import axios from 'axios'
import { withRouter }  from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
//获取用户信息并且进行跳转
@withRouter//实现看见history 对象

@connect(
	null,
	{loadData}
	)
class AuthRoute extends React.Component{

	componentDidMount(){
		const publicList = ['/login','/register']
		const pathname = this.props.location.pathname
		if(publicList.indexOf(pathname)>-1){
			return null
		}
		//获取用户信息
		axios.get('/user/info')
			.then(res=>{
				if(res.status === 200){
					if(res.data.code === 0){
						//有登录信息
						this.props.loadData(res.data.data)
					}else{
						
						
						this.props.history.push('/login')
					}
				}
			})
		//是否登录
		// 现在的url 地址 Login 不需要进行跳转

		//用户的身份 进行不同的跳转
		// 是否完善信息（头像和个人简介）

	}

	render(){
		return null
	}
}


export default AuthRoute
