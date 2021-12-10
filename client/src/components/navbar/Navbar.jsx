import React from 'react';
import '../../css/navbar.css'
import Logo from '../../assets/img/logo.png'
import {NavLink} from "react-router-dom";

 const Navbar = () => {
	 return(
		 
		<div className="navbar">
			<div className="container">
				<img className="navbar__logo" src={Logo} alt="logo" />
				<div className="navbar__header">IAMCS</div>
				{/* Navlink - компонент по типу ссылки, который будет перекидывать нас на соответствующие маршруты */}
				<div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>
				<div className="navbar__registration"><NavLink to="/registration">Sign Up</NavLink></div>
			</div>
		</div>
		
	 );
 };

 export default Navbar;
