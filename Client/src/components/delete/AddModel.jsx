import React, { useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './model.css'



function AddModel({ listen, setListen }) {

    // useContext
    const { btnClose, btnCancel, overlayAdd } = useContext(Context)

    // useRef
    const modelAdd = useRef(null)

    // handle Functions
    const handleCloseModel = () => {
        overlayAdd.current.classList.remove('active')
    }

    const handleClickOutsideModel = (e) => {
        var isClickInsideElement = modelAdd.current.contains(e.target);
        if (!isClickInsideElement) {
            overlayAdd.current.classList.remove('active')
        }
    }

    // Yup
    let schema = yup.object().shape({
        password: yup.string().min(3).max(15).required(),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    })

    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    // Form Submit 
    const submitForm = (data) => {
        overlayAdd.current.classList.remove('active')
        axios.post(`http://localhost:3001/insert`, data).then((response) => {
            setListen(!listen)
            window.alert(response.data)
            reset()
        }).catch((error) => {
            console.log(error)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
    }


    return (
        <>
            <div className="overlay-add" ref={overlayAdd} onClick={handleClickOutsideModel}>
                <div className="model-add" ref={modelAdd}>

                    <div className="model-add-header">
                        <h2>Add Employer ?</h2>
                        <i className="fas fa-times" ref={btnClose} onClick={handleCloseModel}></i>
                    </div>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="model-add-content">
                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="number"
                                    min="0"
                                    className="inputText"
                                    {...register("matricule")}
                                    required
                                />
                                <span className="floating-label">#xxxxxxxxxxxxxxxx</span>
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
                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="password"
                                    className="inputText"
                                    {...register("confirmpassword")}
                                    required
                                />
                                <span className="floating-label">Confirm Password</span>
                                <p>{errors.confirmpassword?.message}</p>
                            </div>
                        </div>

                        <div className="model-add-footer">
                            <div>
                                <button type="button" className="btn btn-default" ref={btnCancel} onClick={handleCloseModel}>Cancel</button>
                                <button type="submit" className="btn btn-primary" >Insert</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddModel
