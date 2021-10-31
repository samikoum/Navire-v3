import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from '../Loader';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import './login.css'


function LoginUser() {

    // useState
    const { loader, setLoader } = useContext(Context)
    const { setIsAuth } = useContext(Context)
    let history = useHistory()



    // Yup
    let schema = yup.object().shape({
        // email: yup.string().email().required().trim(),
        password: yup.string().min(3).max(15).required(),
    })

    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })


    // Form Submit 
    const submitForm = (data) => {
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/user/login`, data).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('isAuth', response.data.auth)
            setIsAuth(localStorage.getItem('isAuth'))
            setLoader(false)
            console.log(JSON.parse(localStorage.getItem('user')))
            // history.push("/user/profile")
        }).catch((error) => {
            console.log(error)
            setLoader(false)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
        // reset()
    }
    return (
        <>
            <div className="sign-in">
                <div className="sign-in-container">
                    <h1 className="text-primary">Sign In </h1>
                    <div className="sign-in-model">
                        <form onSubmit={handleSubmit(submitForm)} >
                            <div className="input-div">
                                <label >Matricule</label>
                                <div className="input-container" >
                                    <VpnKeyIcon className="i-icon" />
                                    <input
                                        className="input-field"
                                        type="number"
                                        min="0"
                                        placeholder="Matricule"
                                        {...register("matricule")}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-div">
                                <label >Password</label>
                                <div className="input-container" >
                                    <LockIcon className="i-icon" />
                                    <input
                                        className="input-field"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                        required
                                    />
                                </div>
                                <p>{errors.password?.message}</p>
                            </div>

                            <div className="btn-container">
                                {loader ?
                                    <Loader />
                                    : <button
                                        type="submit"
                                        className="btn btn-primary btn-login-user"
                                        style={{ width: '100%' }}>
                                        Login
                                    </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginUser