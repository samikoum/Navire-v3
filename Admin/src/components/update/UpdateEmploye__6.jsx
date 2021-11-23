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

function UpdateEmploye__6() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { loader, setLoader } = useContext(Context)

    // useState
    const [designation, setdesignation] = useState('')
    const [auteur, setauteur] = useState('')
    const [date, setdate] = useState('')
    const [griefs, setgriefs] = useState('')
    const [degree, setdegree] = useState('')

    const [classification, setclassification] = useState('')
    const [salaire, setsalaire] = useState('')
    const [duree, setduree] = useState('')
    const [date_licen, setdate_licen] = useState('')
    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table6)
            const tab = response.data.table6[0]
            setdesignation(tab['designation'])
            setauteur(tab['auteur'])
            setdate(todayUpdateFunction(tab['date']))
            setgriefs(tab['griefs'])
            setdegree(tab['degree'])

            setclassification(tab['classification'])
            setsalaire(tab['salaire'])
            setduree(tab['duree'])
            setdate_licen(todayUpdateFunction(tab['date_licen']))
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
        document.title = "Update__6"
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
            designation, auteur, date, griefs, degree, classification, salaire, duree, date_licen
        }
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/edit_6`, { data, id: { id } }).then((response) => {
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
                                    <span className="floating-label">Nouveau Post</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setauteur(e.target.value)}
                                        value={auteur}
                                    />
                                    <span className="floating-label">Nature de la sanction</span>
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
                                    <span className="floating-label label-date">Date effet</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setgriefs(e.target.value)}
                                        value={griefs}
                                    />
                                    <span className="floating-label">Motif de la sanction </span>
                                </div>
                            </div>
                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="text"
                                    className="inputText"
                                    required
                                    onChange={(e) => setdegree(e.target.value)}
                                    value={degree}
                                />
                                <span className="floating-label">Degré de la sanction </span>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setclassification(e.target.value)}
                                        value={classification}
                                        required
                                    />
                                    <span className="floating-label">Nouveau classification</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        className="inputText"
                                        onChange={(e) => setsalaire(e.target.value)}
                                        value={salaire}
                                        required
                                    />
                                    <span className="floating-label">Nouveau Salaire de base</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        onChange={(e) => setduree(e.target.value)}
                                        value={duree}
                                        required
                                    />
                                    <span className="floating-label">Durée retard échelon (par nombre de mois)</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        onChange={(e) => setdate_licen(e.target.value)}
                                        value={date_licen}
                                        required
                                    />
                                    <span className="floating-label label-date">Date de licenciment</span>
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

export default UpdateEmploye__6
