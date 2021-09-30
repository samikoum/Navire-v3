import React, { useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import './model.css'



function ModelDef({ emp_id, listen, setListen }) {

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
        axios.post(`http://localhost:3001/delete`, { emp_id }).then((response) => {
            console.log(response.data)
            setListen(!listen)
            window.alert(response.data.msg)
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
                        <h2>be careful !! Delete Employer ?</h2>
                        <i className="fas fa-times" ref={btnClose} onClick={handleCloseModel}></i>
                    </div>

                    <div className="model-content">
                        <p>Are you sure to want to delete this employer Permanently ?</p>
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

export default ModelDef
