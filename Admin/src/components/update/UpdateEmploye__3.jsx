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

    const [motif, setmotif] = useState('')
    const [decision, setdecision] = useState('')
    const [contrat, setcontrat] = useState('')
    const [num_annee, setnum_annee] = useState('')
    const [classe, setclasse] = useState('')
    const [qualification, setqualification] = useState('')
    const [salaire, setsalaire] = useState('')




    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table3)
            const tab = response.data.table3[0]
            setpost(tab['post_oc'])
            setstructure(tab['structure'])
            setdebut(todayUpdateFunction(tab['date_debut']))
            setfin(todayUpdateFunction(tab['date_fin']))
            setcarriere(tab['carriere'])

            setmotif(tab['motif'])
            setdecision(tab['decision'])
            setcontrat(tab['contrat'])
            setnum_annee(tab['num_annee'])
            setclasse(tab['classe'])
            setqualification(tab['qualification'])
            setsalaire(tab['salaire'])
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
            post, structure, debut, fin, carriere,
            motif, decision, contrat, num_annee, classe, qualification, salaire
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

    var row__1 = []
    var row__2 = []
    for (let i = 1; i <= 22; i++) {
        row__1.push(i)
    }
    for (let i = 1; i <= 20; i++) {
        row__2.push(i)
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
                                        value={debut}
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
                                        value={fin}
                                    />
                                    <span className="floating-label label-date">Date fin</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText" onChange={(e) => setmotif(e.target.value)} value={motif} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Motif du contrat</option>
                                        <option value="Reconduction">Reconduction</option>
                                        <option value="Promotion">Promotion</option>
                                        <option value="Redéploiement">Redéploiement</option>
                                        <option value="Mutation">Mutation</option>
                                        <option value="Autres">Autres</option>
                                    </select>
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
                                    <span className="floating-label">Décision</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText" onChange={(e) => setcontrat(e.target.value)} value={contrat} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Nature de Contrat</option>
                                        <option value="cdi">cdi</option>
                                        <option value="cdd">cdd</option>
                                        <option value="stagiare">stagiare</option>
                                        <option value="autres">autres</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        onChange={(e) => setnum_annee(e.target.value)}
                                        value={num_annee}
                                        required
                                    />
                                    <span className="floating-label">Nombre d'années travaillés</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText" onChange={(e) => setclasse(e.target.value)} value={classe} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Classe</option>
                                        {row__1.map((classe, key) => {
                                            return <option value={`${classe}`} key={key}>{classe <= 9 ? 0 + '' + classe : classe}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText" onChange={(e) => setqualification(e.target.value)} value={qualification} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Qualification</option>
                                        {row__2.map((qualification, key) => {
                                            return <option value={`${qualification}`} key={key}>{qualification <= 9 ? 0 + '' + qualification : qualification}</option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        onChange={(e) => setsalaire(e.target.value)}
                                        value={salaire}
                                        required
                                    />
                                    <span className="floating-label">Salaire de base</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setcarriere(e.target.value)} value={carriere} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Type de Carriére</option>
                                        <option value="Interne">Interne</option>
                                        <option value="Externe">Externe</option>
                                    </select>
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

export default UpdateEmploye__3
