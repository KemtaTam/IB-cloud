import '../css/app.css'
import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./authorization/Authorization";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";

function App() {
	const isAuth = useSelector(state => state.user.isAuth);	//хук из redux
	const dispatch = useDispatch();	//хук

	//хук, первым параметром принимает функцию, вторым массив зависимостей
	useEffect(() => {
        dispatch(auth())
    }, [])

	return (
		<BrowserRouter>
			<div className="app">
				<Navbar />
				<div className="wrap">
					{!isAuth &&
						<Routes>
							<Route path="/registration" element={<Registration />}></Route>
							<Route path="/login" element={<Login />}></Route>
						</Routes>
					}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;