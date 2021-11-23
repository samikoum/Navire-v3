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

function UpdateEmploye__7() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { loader, setLoader } = useContext(Context)

    // useState
    const [absence_irr, setabsence_irr] = useState('')
    const [date, setdate] = useState('')
    const [date_fin, setdate_fin] = useState('')
    const [conge, setconge] = useState('')

    const [absence_num, setabsence_num] = useState('')
    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table7)
            const tab = response.data.table7[0]
            setabsence_irr(tab['absence_irr'])
            setdate(todayUpdateFunction(tab['annee']))
            setdate_fin(todayUpdateFunction(tab['date_fin']))
            setconge(tab['conge'])
            setabsence_num(tab['absence_num'])
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
        document.title = "Update__7"
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
            absence_irr, date, date_fin, conge, absence_num
        }
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/edit_7`, { data, id: { id } }).then((response) => {
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
                                    <select className="inputText" onChange={(e) => setabsence_irr(e.target.value)} value={absence_irr} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Type d'absence</option>
                                        <option value="autorisé">autorisé</option>
                                        <option value="irrégulière">irrégulière</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        className="inputText"

                                        onChange={(e) => setabsence_num(e.target.value)}
                                        value={absence_num}
                                        required
                                    />
                                    <span className="floating-label">Nombre d'absence</span>
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
                                    <span className="floating-label label-date">Du</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdate_fin(e.target.value)}
                                        value={date_fin}
                                    />
                                    <span className="floating-label label-date">Au</span>
                                </div>

                            </div>

                            <div className="user-input-wrp">
                                <br />
                                <select className="inputText" onChange={(e) => setconge(e.target.value)} value={conge} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                    <option selected disabled value="">Motif d'absence</option>
                                    <option value="maladie">maladie</option>
                                    <option value="maternité">maternité</option>
                                    <option value="accident du travail">accident du travail</option>
                                    <option value="autre">autre</option>
                                </select>
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

export default UpdateEmploye__7
