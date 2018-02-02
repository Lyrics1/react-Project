import React from 'react'
import PropTypes from 'prop-types'
import { Card ,WhiteSpace , WingBlank} from 'antd-mobile'



class UserCard extends React.Component{
	static propTypes={
		userList : PropTypes.array.isRequired
	}

	render(){
		return (
			<div>
				<WingBlank>
					{this.props.userList.map(v=>(
						v.avatar ?
						(<Card key={v._id}>
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