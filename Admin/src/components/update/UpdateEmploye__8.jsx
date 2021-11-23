import React, { useState, useContext, useEffect } from 'react'
import Context from '../../context/Context'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from '../Loader'
import NavAddEmploye from '../navBar/NavAddEmploye'
import todayUpdateFunction from '../function/TodayUpdate'
import HeaderRight from '../includes/HeaderRight'

function UpdateEmploye__8() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { loader, setLoader } = useContext(Context)

    // useState
    const [designation, setdesignation] = useState('')
    const [nature, setnature] = useState('')
    const [date, setdate] = useState('')
    const [date_retour, setdate_retour] = useState('')
    const [duree, setduree] = useState('')
    const [duree_rest, setduree_rest] = useState('')

    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table8)
            const tab = response.data.table8[0]
            setdesignation(tab['designation'])
            setnature(tab['nature'])
            setdate(todayUpdateFunction(tab['date']))
            setdate_retour(todayUpdateFunction(tab['date_retour']))
            setduree(tab['duree'])
            setduree_rest(tab['duree_rest'])
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Update__8"
    }, [])

    // Yup
    let schema = yup.object().shape({
        // matricule: yup.number().positive().integer(),
        // nombreEnfants: yup.number().positive().integer(),

    })

    // useForm
    const { handleSubmit, formState: { errors }, reset } = useForm({
        // resolver: yupResolver(schema),
    })


    // Form Submit 
    const submitForm = () => {
        const data = {
            designation, nature, date, date_retour, duree, duree_rest
        }
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/edit_8`, { data, id: { id } }).then((response) => {
            console.log(response.data)
            setLoader(false)
            window.alert(response.data.msg)
        }).catch((error) => {
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
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Employe" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <form onSubmit={handleSubmit(submitForm)}>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdesignation(e.target.value)}
                                        value={designation}
                                    />
                                    <span className="floating-label">Exercice ex: 2021/2022</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setnature(e.target.value)} value={nature} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Nature du congé</option>
                                        <option value="reliquat">reliquat</option>
                                        <option value="annuel">annuel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdate(e.target.value)}
                                        value={date}
                                    />
                                    <span className="floating-label label-date">Date de départ</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdate_retour(e.target.value)}
                                        value={date_retour}
                                    />
                                    <span className="floating-label label-date">Date de retour</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        required
                                        onChange={(e) => setduree(e.target.value)}
                                        value={duree}
                                    />
                                    <span className="floating-label">Nombre de jours congé</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        required
                                        onChange={(e) => setduree_rest(e.target.value)}
                                        value={duree_rest}
                                    />
                                    <span className="floating-label">Nombre de jours restant </span>
                                </div>
                            </div>

                            <div className="btn-container">
                                {loader ?
                                    <Loader />
                                    :
                                    <button
                                        type="submit"
                                        className="btn btn-secondary btn-add">
                                        Save
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </section>
            </div>

        </>
    )
}

export default UpdateEmploye__8
