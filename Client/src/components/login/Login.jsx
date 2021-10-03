import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from '../Loader'
import './login.css'

function Login() {
    // useState
    const { loader, setLoader } = useContext(Context)
    const { setIsAuth } = useContext(Context)
    let history = useHistory()

    // Yup
    let schema = yup.object().shape({
        email: yup.string().email().required().trim(),
        password: yup.string().min(3).max(15).required(),
    })

    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    // Form Submit 
    const submitForm = (data) => {
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/login`, data).then((response) => {
            localStorage.setItem('admin', JSON.stringify(response.data.admin))
            localStorage.setItem('isAuth', response.data.auth)
            setIsAuth(localStorage.getItem('isAuth'))
            setLoader(false)
            history.push("/dashboard")
        }).catch((error) => {
            console.log(error)
            setLoader(false)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
    }

    return (
        <>
            <div className="login">
                <div className="login-container">
                    <div className="login-left">
                        <img src="/images/auto.png" />
                    </div>
                    <div className="login-right">
                        <div className="login-right-content">
                            <h1>Bienvenu !</h1>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("email")}
                                        required
                                    />
                                    <span className="floating-label">Email</span>
                                    <p>{errors.email?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="password"
                                        className="inputText"
                                        {...register("password")}
                                        required
                                    />
                                    <span className="floating-label">Password</span>
                                    <p>{errors.password?.message}</p>
                                </div>
                                <div className="btn-container btn-login-container">
                                    {loader ?
                                        <Loader />
                                        : <button className="btn btn-primary btn-add btn-login">Connexion</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
