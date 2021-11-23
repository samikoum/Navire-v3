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

function UpdateEmploye__5() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { loader, setLoader } = useContext(Context)

    // useState
    const [salaire_ini, setsalaire_ini] = useState('')
    const [salaire_reval, setsalaire_reval] = useState('')
    const [date, setdate] = useState('')
    const [gain, setgain] = useState('')
    const [motif, setmotif] = useState('')

    const [decision, setdecision] = useState('')
    const [primes, setprimes] = useState('')

    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table5)
            const tab = response.data.table5[0]
            setsalaire_ini(tab['salaire_initial'])
            setsalaire_reval(tab['salaire_rev'])
            setdate(todayUpdateFunction(tab['date']))
            setgain(tab['gain'])
            setmotif(tab['motif'])

            setdecision(tab['decision'])
            setprimes(tab['primes'])


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
        document.title = "Update__5"
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
            salaire_ini, salaire_reval, date, gain, motif, decision, primes
        }
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/edit_5`, { data, id: { id } }).then((response) => {
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
    // Date
    const todayDate = todayUpdateFunction(date)

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
                                        type="number"
                                        className="inputText"
                                        required
                                        onChange={(e) => setsalaire_ini(e.target.value)}
                                        value={salaire_ini}

                                    />
                                    <span className="floating-label">Salaire de base</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        className="inputText"
                                        required
                                        onChange={(e) => setsalaire_reval(e.target.value)}
                                        value={salaire_reval}
                                    />
                                    <span className="floating-label">Nouveau Salaire de base</span>
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
                                    <span className="floating-label label-date">Date de décision</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setdecision(e.target.value)}
                                        value={decision}
                                        required
                                    />
                                    <span className="floating-label">Décision / contrat</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        className="inputText"
                                        required
                                        onChange={(e) => setgain(e.target.value)}
                                        value={gain}
                                    />
                                    <span className="floating-label">Ecart</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setmotif(e.target.value)} value={motif} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Saisier Le motif</option>
                                        <option value="Promotion">Promotion</option>
                                        <option value="Avancement">Avancement</option>
                                        <option value="Rétrogradation">Rétrogradation</option>
                                        <option value="Réorganisation">Réorganisation</option>
                                        <option value="Autres">Autres</option>
                                    </select>
                                </div>
                            </div>
                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="number"
                                    min="0"
                                    className="inputText"

                                    onChange={(e) => setprimes(e.target.value)}
                                    value={primes}
                                    required
                                />
                                <span className="floating-label">Primes et intemnité</span>
                                <p>{errors.nom?.message}</p>
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

export default UpdateEmploye__5
