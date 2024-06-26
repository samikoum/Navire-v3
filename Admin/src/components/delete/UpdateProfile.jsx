import React, { useState, useEffect, useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import CloseIcon from '@mui/icons-material/Close';
import './model.css'

function UpdateProfile({ admin_id }) {
    // useContext
    const { btnClose, btnCancel, overlayUpdate } = useContext(Context)

    // useState
    const [nom, setNom] = useState(JSON.parse(localStorage.getItem('admin')).nom)
    const [prenom, setPrenom] = useState(JSON.parse(localStorage.getItem('admin')).prenom)
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('admin')).email)
    // const [password, setPassword] = useState('')

    // useRef
    const modelUpdate = useRef(null)
    // const inputPassword = useRef(null)

    // handle Functions
    const handleCloseModel = () => {
        overlayUpdate.current.classList.remove('active')
    }

    const handleClickOutsideModel = (e) => {
        var isClickInsideElement = modelUpdate.current.contains(e.target);
        if (!isClickInsideElement) {
            overlayUpdate.current.classList.remove('active')
        }
    }
    // var x = false
    // const handleShowHidePassword = () => {
    //     x = !x
    //     x ? inputPassword.current.type = 'text' :
    //         inputPassword.current.type = 'password'
    // }

    // Yup
    let schema = yup.object().shape({
        email: yup.string().email().required().trim(),
    })

    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    // Form Submit 
    const submitForm = () => {
        overlayUpdate.current.classList.remove('active')
        axios.post(`${process.env.REACT_APP_API}/adminProfile/edit`, { nom, prenom, email, admin_id }).then((response) => {
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
            <div className="overlay-update" ref={overlayUpdate} onClick={handleClickOutsideModel}>
                <div className="model-add" ref={modelUpdate}>

                    <div className="model-add-header">
                        <h2>Edit Profile </h2>
                        <CloseIcon sx={{ color: '#A3A4B0', cursor: 'pointer' }} ref={btnClose} onClick={handleCloseModel} />
                    </div>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="model-add-content">
                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="text"
                                    className="inputText"
                                    required
                                    onChange={(e) => setNom(e.target.value)}
                                    value={nom}
                                />
                                <span className="floating-label">Nom</span>
                            </div>

                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="text"
                                    className="inputText"
                                    required
                                    onChange={(e) => setPrenom(e.target.value)}
                                    value={prenom}
                                />
                                <span className="floating-label">Prénom</span>
                            </div>

                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="email"
                                    className="inputText"
                                    required
                                    {...register("email")}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <span className="floating-label">Email</span>
                                <p>{errors.email?.message}</p>
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

export default UpdateProfile
