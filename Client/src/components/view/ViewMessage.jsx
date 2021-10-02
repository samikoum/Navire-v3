import React, { useState, useContext, useEffect } from 'react'
import Context from '../../context/Context'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader'
import NavAddEmploye from '../navBar/NavAddEmploye'
import todayFunction from '../function/Today'
import HeaderRight from '../includes/HeaderRight'
import NotFoundPage from '../includes/NotFound'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './message-details.css'
function ViewMessage() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const [message, setMessage] = useState([])
    const [added_on, setAdded_on] = useState('')
    const [notFound, setNotFound] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/reclamations/${id}`).then((response) => {
            // console.log(response.data[0])
            setMessage(response.data[0])
            setAdded_on(response.data[0]['added_on'])
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 404) {
                    return setNotFound(true)
                }
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }

        })
    }, [])

    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])

    // Date
    const todayAdded_on = todayFunction(added_on)

    return (
        <>
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="manageReclamations" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        {notFound ?
                            <NotFoundPage />
                            :
                            <div className="message-details">
                                <h2>{message.title}</h2>
                                <div className="message-header">
                                    <div className="message-header-sender">
                                        <AccountCircleIcon className="i-mui" sx={{ fontSize: '35px', color: '#333', padding: 0 }} />
                                        <h4>{message.matricule}</h4>
                                    </div>
                                    <p>{todayAdded_on}</p>
                                </div>
                                <p className="message-content">
                                    {message.description}
                                </p>
                            </div>
                        }
                    </div>
                </section>
            </div>

        </>
    )
}

export default ViewMessage
