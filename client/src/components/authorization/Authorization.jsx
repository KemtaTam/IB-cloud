import '../../css/authorization.css';
import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("")	//useState - хук
    const [password, setPassword] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Sign Up</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
            <button className="authorization__btn" onClick={() => registration(email, password)}>Sign In</button>
        </div>
    );
};

export default Registration;