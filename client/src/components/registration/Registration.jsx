import '../../css/registration.css';
import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("")	//useState - хук
    const [password, setPassword] = useState("")

    return (
        <div className='registration'>
            <div className="registration__header">Sign up</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
            <button className="registration__btn" onClick={() => registration(email, password)}>Sign in</button>
        </div>
    );
};

export default Registration;