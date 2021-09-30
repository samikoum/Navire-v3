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

function UpdateEmploye__1() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { loader, setLoader } = useContext(Context)

    // useState
    const [matricule, setmatricule] = useState('')
    const [nom, setnom] = useState('')
    const [prenom, setprenom] = useState('')
    const [address, setaddress] = useState('')
    const [situation, setsituation] = useState('')
    const [nombreEnfants, setnombreEnfants] = useState('')
    const [ascendant, setascendant] = useState('')
    const [dateNaissance, setdateNaissance] = useState('')
    const [dateRecrutement, setdateRecrutement] = useState('')
    const [structure, setstructure] = useState('')
    const [region, setregion] = useState('')
    const [diplome, setdiplome] = useState('')
    const [specialite, setspecialite] = useState('')

    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`http://localhost:3001/employeUp/${id}`).then((response) => {
            console.log(response.data.table1)
            const tab = response.data.table1[0]
            setmatricule(tab['matricule'])
            setnom(tab['nom'])
            setprenom(tab['prenom'])
            setaddress(tab['address'])
            setsituation(tab['s_famille'])
            setnombreEnfants(tab['n_enfants'])
            setascendant(tab['ascendant'])
            setdateNaissance(tab['date_naissance'])
            setdateRecrutement(tab['date_recrutement'])
            setstructure(tab['structure'])
            setregion(tab['region'])
            setdiplome(tab['diplome'])
            setspecialite(tab['specialite'])
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
            matricule, prenom, nom, address, situation,
            nombreEnfants, ascendant, dateNaissance,
            dateRecrutement, structure, region, diplome, specialite
        }
        setLoader(true)
        axios.post(`http://localhost:3001/edit_1`, { data, id: { id } }).then((response) => {
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
    const todayNaissance = todayUpdateFunction(dateNaissance)
    const todayRecrutement = todayUpdateFunction(dateRecrutement)

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

                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="number"
                                    className="inputText"
                                    required
                                    onChange={(e) => setmatricule(e.target.value)}
                                    value={matricule}
                                />
                                <span className="floating-label">#xxxxxxxxxxxxxxxx</span>
                                <p>{errors.matricule?.message}</p>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setnom(e.target.value)}
                                        value={nom}

                                    />
                                    <span className="floating-label">Nom</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setprenom(e.target.value)}
                                        value={prenom}
                                    />
                                    <span className="floating-label">Prénom</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setaddress(e.target.value)}
                                        value={address}
                                    />
                                    <span className="floating-label">Address</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setsituation(e.target.value)} value={situation} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value={situation}>{situation}</option>
                                        <option value="marié (M)"> marié (M)</option>
                                        <option value="divorcé (D)">divorcé (D)</option>
                                        <option value="séparé (D)">séparé (D)</option>
                                        <option value="célibataire (C)"> célibataire (C)</option>
                                        <option value="veuf (V)">veuf (V)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        className="inputText"
                                        min="0"
                                        required
                                        onChange={(e) => setnombreEnfants(e.target.value)}
                                        value={nombreEnfants}
                                    />
                                    <span className="floating-label">Nombre d'enfants</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setascendant(e.target.value)}
                                        value={ascendant}
                                    />
                                    <span className="floating-label">Ascendant a charge</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdateNaissance(e.target.value)}
                                        value={todayNaissance}

                                    />
                                    <span className="floating-label"></span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdateRecrutement(e.target.value)}
                                        value={todayRecrutement}
                                    />
                                    <span className="floating-label"></span>
                                </div>
                            </div>

                            <div className="two-input">
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
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setregion(e.target.value)} value={region} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value={region}>{region}</option>
                                        <option value="Erenav Alger"> Erenav Alger</option>
                                        <option value="Erenav Oran">Erenav Oran</option>
                                        <option value="Erenav Bejaia">Erenav Bejaia</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdiplome(e.target.value)}
                                        value={diplome}
                                    />
                                    <span className="floating-label">Diplome (Niveau d'enseignement)</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        required
                                        onChange={(e) => setspecialite(e.target.value)}
                                        value={specialite}
                                    />
                                    <span className="floating-label">Specialité</span>
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

export default UpdateEmploye__1
