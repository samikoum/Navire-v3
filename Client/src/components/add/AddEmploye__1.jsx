import React, { useContext, useEffect } from 'react'
import Context from '../../context/Context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from '../Loader';
import ProgressBar from './ProgressBar'
import NavAddEmploye from '../navBar/NavAddEmploye'
import todayUpdateFunction from '../function/TodayUpdate'
import HeaderRight from '../includes/HeaderRight'
import ScrollToTop from '../ScrollToTop'

function AddEmploye__1() {
    const { isX, setIsX } = useContext(Context)
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { step__1 } = useContext(Context)
    const { loader, setLoader, btnNext } = useContext(Context)

    // useState
    const history = useHistory()

    // useEffect
    useEffect(() => {
        if (isX > 1) {
            step__1.current.classList.add('completed', 'active')
            btnNext.current.classList = "btn btn-primary btn-add"
        }
    }, [isX])

    const handleBtnNext = () => {
        if (isX > 1) {
            console.log('btn clicked')
            return history.push('/add__2')
        }
    }

    const handleBtnPrevious = () => {
        return history.push('/employe')
    }

    // Yup
    let schema = yup.object().shape({
        // matricule: yup.number().positive().integer(),
        // nombreEnfants: yup.number().positive().integer().,
    })

    // useForm
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })


    // Form Submit 
    const submitForm = (data) => {
        localStorage.setItem('mat', data.matricule)
        setLoader(true)
        axios.post(`http://localhost:3001/add_1`, data).then((response) => {
            localStorage.setItem('isX', response.data.x)
            setIsX(localStorage.getItem('isX'))
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

    useEffect(() => {
        if (localStorage.getItem('mat') !== null) {
            axios.get(`http://localhost:3001/employe/${localStorage.getItem('mat')}`).then((response) => {
                console.log(response.data.table1)
                const tab = response.data.table1[0]
                setValue("matricule", tab['matricule'])
                setValue("nom", tab['nom'])
                setValue("prenom", tab['prenom'])
                setValue("address", tab['address'])
                setValue("situation", tab['s_famille'])
                setValue("nombreEnfants", tab['n_enfants'])
                setValue("ascendant", tab['ascendant'])
                setValue("dateNaissance", todayUpdateFunction(tab['date_naissance']))
                setValue("dateRecrutement", todayUpdateFunction(tab['date_recrutement']))
                setValue("structure", tab['structure'])
                setValue("region", tab['region'])
                setValue("diplome", tab['diplome'])
                setValue("specialite", tab['specialite'])
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])

    return (
        <>
            <ScrollToTop />
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Employe" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <ProgressBar />
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="user-input-wrp">
                                <br />
                                <input
                                    type="number"
                                    min="0"
                                    className="inputText"
                                    {...register("matricule")}
                                    required
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
                                        {...register("nom")}
                                        required
                                    />
                                    <span className="floating-label">Nom</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("prenom")}
                                        required
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
                                        {...register("address")}
                                        required
                                    />
                                    <span className="floating-label">Address</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("situation")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Situation de Famille</option>
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
                                        min="0"
                                        className="inputText"
                                        {...register("nombreEnfants")}
                                        required
                                    />
                                    <span className="floating-label">Nombre d'enfants</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("ascendant")}
                                        required
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
                                        {...register("dateNaissance")}
                                        required
                                    />
                                    <span className="floating-label"></span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("dateRecrutement")}
                                        required
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
                                        {...register("structure")}
                                        required
                                    />
                                    <span className="floating-label">Structure</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("region")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Région</option>
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
                                        {...register("diplome")}
                                        required
                                    />
                                    <span className="floating-label">Diplome (Niveau d'enseignement)</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("specialite")}
                                        required
                                    />
                                    <span className="floating-label">Specialité</span>
                                </div>
                            </div>
                            <div className="btn-container">
                                {loader ?
                                    <Loader />
                                    : isX > 1 ?
                                        <p>First Step Completed !</p>
                                        :
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-add">
                                            Save
                                        </button>
                                }
                            </div>
                        </form>
                        <div className="two-input btn-containers">
                            <button className="btn btn-primary btn-add " onClick={handleBtnPrevious}>Cancel</button>
                            <button ref={btnNext} className="btn  btn-add btn-next" onClick={handleBtnNext}>Suivant</button>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default AddEmploye__1
