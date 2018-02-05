import React from 'react'


// import logoImg from './logo.png'
import './logo.css'
class Logo extends React.Component{

	render(){
		return (
			<div className="logo-container">
				<img src={require('./logo.png')} alt="Logo"/>
			</div>

			)
	}
}


export default Logo