import React, { useState, useEffect, useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './model.css'



function UpdateModel({ emp_id }) {
    // useContext
    const { btnClose, btnCancel, overlayUpdate, setIsAuth } = useContext(Context)

    // useState
    const [nom, setNom] = useState(JSON.parse(localStorage.getItem('user')).nom)
    const [prenom, setPrenom] = useState(JSON.parse(localStorage.getItem('user')).prenom)
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem('user')).password)

    // useRef
    const modelUpdate = useRef(null)
    const inputPassword = useRef(null)

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
    var x = false
    const handleShowHidePassword = () => {
        x = !x
        x ? inputPassword.current.type = 'text' :
            inputPassword.current.type = 'password'
    }

    // Yup
    let schema = yup.object().shape({

    })

    // useForm
    const { handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    // Form Submit 
    const submitForm = () => {
        overlayUpdate.current.classList.remove('active')
        axios.post(`http://localhost:3001/profile/edit`, { emp_id, nom, prenom, password },
            { headers: { "Authorization": `${JSON.parse(localStorage.getItem('user')).token}` } })
            .then((response) => {
                console.log(response.data)
                window.alert(response.data)
                reset()
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status == 403) {
                        setIsAuth(localStorage.removeItem('isAuth'))
                    }
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
                        <i className="fas fa-times" ref={btnClose} onClick={handleCloseModel}></i>
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
                                    type="password"
                                    className="inputText"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    ref={inputPassword}
                                />
                                <span className="floating-label">Password</span>
                                <RemoveRedEyeIcon className="i-eye" onClick={handleShowHidePassword} />
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

export default UpdateModel
