import React, { useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'

import CloseIcon from '@mui/icons-material/Close';

import './model.css'



function DeleteModel({ emp_id, listen, setListen }) {

    // useContext
    const { btnClose, btnCancel, overlay } = useContext(Context)

    // useRef
    const model = useRef(null)

    // handle Functions
    const handleCloseModel = () => {
        overlay.current.classList.remove('active')
    }

    const handleClickOutsideModel = (e) => {
        var isClickInsideElement = model.current.contains(e.target);
        if (!isClickInsideElement) {
            overlay.current.classList.remove('active')
        }
    }

    const handleBtnDelete = () => {
        overlay.current.classList.remove('active')
        axios.post(`${process.env.REACT_APP_API}/del`, { emp_id }).then((response) => {
            console.log(response.data)
            setListen(!listen)
            window.alert(response.data)
        }).catch((error) => {
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
    }

    return (
        <>
            <div className="overlay" ref={overlay} onClick={handleClickOutsideModel}>
                <div className="model" ref={model}>

                    <div className="model-header">
                        <h2>Delete Account ?</h2>
                        <CloseIcon sx={{ color: '#A3A4B0', cursor: 'pointer' }} ref={btnClose} onClick={handleCloseModel} />
                    </div>

                    <div className="model-content">
                        <p>Are you sure to want to delete this Account from this List ?</p>
                    </div>

                    <div className="model-footer">
                        <div>
                            <button className="btn btn-default" ref={btnCancel} onClick={handleCloseModel}>Cancel</button>
                            <button className="btn btn-danger" onClick={handleBtnDelete}>Delete</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DeleteModel
