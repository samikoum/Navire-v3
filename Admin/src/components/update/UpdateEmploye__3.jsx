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

function UpdateEmploye__3() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { loader, setLoader } = useContext(Context)

    // useState
    const [post, setpost] = useState('')
    const [structure, setstructure] = useState('')
    const [debut, setdebut] = useState('')
    const [fin, setfin] = useState('')
    const [carriere, setcarriere] = useState('')

    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table3)
            const tab = response.data.table3[0]
            setpost(tab['post_oc'])
            setstructure(tab['structure'])
            setdebut(tab['date_debut'])
            setfin(tab['date_fin'])
            setcarriere(tab['carriere'])
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
        document.title = "Update__3"
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
            post, structure, debut, fin, carriere
        }
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/edit_3`, { data, id: { id } }).then((response) => {
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
    const todayDebut = todayUpdateFunction(debut)
    const todayFin = todayUpdateFunction(fin)

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
                                        onChange={(e) => setpost(e.target.value)}
                                        value={post}

                                    />
                                    <span className="floating-label">Post Occupé</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setstructure(e.target.value)}
                                        value={structure}
                                    />
                                    <span className="floating-label">Structure</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdebut(e.target.value)}
                                        value={todayDebut}
                                    />
                                    <span className="floating-label label-date">Date début</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setfin(e.target.value)}
                                        value={todayFin}
                                    />
                                    <span className="floating-label label-date">Date fin</span>
                                </div>
                            </div>
                            <div className="user-input-wrp">
                                <br />
                                <select className="inputText" onChange={(e) => setcarriere(e.target.value)} value={carriere} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                    {/* <option selected disabled value={sexe}>{sexe}</option> */}
                                    <option value="Interne">Interne</option>
                                    <option value="Externe">Externe</option>
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

export default UpdateEmploye__3