import React, { useState } from 'react';
import { login } from '../../../api';
import { createNotification } from '../../../functions';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { Link } from "react-router-dom";


const Login = props => {

    const emailInput = React.createRef();
    const tokenInput = React.createRef();

    const [data, setData] = useState({
        email: "",
        token: ""
    })

    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const onSubmit = e => {
        e.preventDefault();
        login(data.email, data.token)
        .then(res => {
            props.setToken(res.data.token);
            window.location.replace('/research/');
        })
        .catch(err => {
            createNotification('error', 'Email lub token są błędne');
            emailInput.current.classList.add('border-red-500');
            tokenInput.current.classList.add('border-red-500');
        })
    }

    return(
        <form
            onSubmit={onSubmit}
            className="p-10 mx-auto border shadow-xl w-11/12 md:2/3 lg:w-1/2 mx-auto mt-36 mb-64 flex"
        >
            <div className="w-full md:w-1/2 mr-10">
                <b className="text-center md:text-left text-2xl block my-10">Logowanie</b>
                <label>
                    <i className="fa fa-user mr-2"></i>
                    <b>Email</b>
                    <br/>
                    <input
                        ref={emailInput}
                        type="email"
                        name="email"
                        className="border w-full p-1 px-3 rounded-3xl shadow mt-2"
                        onChange={onChange}
                        value={data.email}
                    />
                </label>
                <br/>
                <br/>
                <label>
                    <i className="fa fa-lock mr-2"></i>
                    <b>Token</b>
                    <br/>
                    <input
                        ref={tokenInput}
                        type="password"
                        name="token"
                        className="border w-full p-1 px-3 rounded-3xl shadow mt-2"
                        onChange={onChange}
                        value={data.token}
                    />
                </label>
                <br/>
                <input
                    type="submit"
                    className="w-full bg-blue-500 rounded-2xl py-1 mt-10 hover:bg-blue-600 text-blue-300 cursor-pointer"
                    value="Zaloguj się"
                />
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(authActions.setToken(token))
})

export const LoginContainer = connect(null, mapDispatchToProps)(Login);
