import React from 'react';
import '../../css/navbar.css'
import Logo from '../../assets/img/logo.png'
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

 const Navbar = () => {
	const isAuth = useSelector(state => state.user.isAuth);
	const dispatch = useDispatch();
	 return(
		<div className="navbar">
			<div className="container">
				<img className="navbar__logo" src={Logo} alt="logo" />
				<div className="navbar__header">IAMCS</div>
				{/* Navlink - компонент по типу ссылки, который будет перекидывать нас на соответствующие маршруты */}
				{!isAuth && <div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>}
				{!isAuth && <div className="navbar__registration"><NavLink to="/registration">Sign Up</NavLink></div>}
				{isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Exit</div>}	{/* Если пользователь залогинен */}
			</div>
		</div>
		
	 );
 };

 export default Navbar;
