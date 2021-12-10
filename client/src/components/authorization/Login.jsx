import '../../css/authorization.css';
import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("")	//useState - хук
    const [password, setPassword] = useState("")
	const dispatch = useDispatch();	//хук

    return (
        <div className='authorization'>
            <div className="authorization__header">Log In</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Log In</button>
        </div>
    );
};

export default Login;