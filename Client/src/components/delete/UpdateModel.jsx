import React, { useState, useEffect, useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './model.css'



function UpdateModel({ emp_id, listen, setListen }) {
    // useContext
    const { btnClose, btnCancel, overlayUpdate } = useContext(Context)

    // useState
    const [matricule, setmatricule] = useState('')
    console.log(matricule)
    // useRef
    const modelUpdate = useRef(null)

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
        axios.post(`http://localhost:3001/edit`, { matricule, emp_id }).then((response) => {
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

    useEffect(() => {
        axios.get(`http://localhost:3001/users/${emp_id}`).then((response) => {
            console.log(response.data[0].matricule)
            setmatricule(response.data[0].matricule)
        }).catch((error) => {
            console.log(error)
        })
    }, [emp_id])

    return (
        <>
            <div className="overlay-update" ref={overlayUpdate} onClick={handleClickOutsideModel}>
                <div className="model-add" ref={modelUpdate}>

                    <div className="model-add-header">
                        <h2>Edit Employer ?</h2>
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
                                    required
                                    onChange={(e) => setmatricule(e.target.value)}
                                    value={matricule}
                                />
                                <span className="floating-label">#xxxxxxxxxxxxxxxx</span>
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
