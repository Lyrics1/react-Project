import React from 'react'
import PropTypes from 'prop-types'
import { Card , WingBlank} from 'antd-mobile'
import { withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
	static propTypes={
		userList : PropTypes.array.isRequired
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
		
	}
	render(){
		return (
			<div>
				<WingBlank>
					{this.props.userList.map(v=>(
						v.avatar ?
						(<Card 
							key={v._id} 
							style={{zIndex:1}}
							onClick={()=>this.handleClick(v)}
							>
							<Card.Header 
							title={<span>{v.user}</span>}
							thumb={require(`../img/${v.avatar}.jpg`)}
							extra={<span>{v.title}</span>}
							>
							</Card.Header>
							<Card.Body>
							{v.type=='boss' ? 
								<div>公司:{v.company}</div>
							:null}
							{v.desc.split('\n').map(v=>(
								<div key={v}>{v}</div>
								))}
							{v.type=='boss' ? 
								<div >薪资:{v.money}</div>
							:null}
							</Card.Body>
						</Card>): null
						))}
				</WingBlank>
			</div>
			)
	}
}

export default UserCard