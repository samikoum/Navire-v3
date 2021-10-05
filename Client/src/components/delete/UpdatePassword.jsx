import React, { useState, useEffect, useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import './model.css'

function UpdatePassword({ admin_id }) {
    // useContext
    const { btnClose, btnCancel, overlayPassword } = useContext(Context)

    // useRef
    const [showPassword, setShowPassword] = useState(false)
    const modelUpdate = useRef(null)

    // handle Functions
    const handleCloseModel = () => {
        overlayPassword.current.classList.remove('active')
    }
    const handleClickOutsideModel = (e) => {
        var isClickInsideElement = modelUpdate.current.contains(e.target);
        if (!isClickInsideElement) {
            overlayPassword.current.classList.remove('active')
        }
    }

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    // Yup
    let schema = yup.object().shape({
        password: yup.string().min(3).max(15).required(),
    })

    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })


    // Form Submit 
    const submitForm = (data) => {
        overlayPassword.current.classList.remove('active')
        axios.post(`${process.env.REACT_APP_API}/adminPassword/edit`, { data, admin_id }).then((response) => {
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
            <div className="overlay-update" ref={overlayPassword} onClick={handleClickOutsideModel}>
                <div className="model-add" ref={modelUpdate}>

                    <div className="model-add-header">
                        <h2>Edit Password </h2>
                        <CloseIcon sx={{ color: '#A3A4B0', cursor: 'pointer' }} ref={btnClose} onClick={handleCloseModel} />
                    </div>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="model-add-content">

                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="inputText"
                                    {...register("password")}
                                    required
                                />
                                <span className="floating-label">Password</span>
                                <RemoveRedEyeIcon className="i-eye" onClick={handleShowHidePassword} />
                                <p>{errors.password?.message}</p>
                            </div>

                        </div>

                        <div className="model-add-footer">
                            <div>
                                <button type="button" className="btn btn-default" ref={btnCancel} onClick={handleCloseModel}>Cancel</button>
                                <button type="submit" className="btn btn-warning" >Save</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}

export default UpdatePassword
