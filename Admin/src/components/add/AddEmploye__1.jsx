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
    useEffect(() => {
        document.title = "Add__1"
    }, [])

    const handleBtnNext = () => {
        if (isX > 1) {
            console.log('btn clicked')
            return history.push('/add__2')
        }
    }

    const handleBtnPrevious = () => {
        return history.push('/employers')
    }

    // Yup
    let schema = yup.object().shape({
        // matricule: yup.number().positive().integer(),
        matricule: yup.string().required().trim(),
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
        axios.post(`${process.env.REACT_APP_API}/add_1`, data).then((response) => {
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
            axios.get(`${process.env.REACT_APP_API}/employe/${localStorage.getItem('mat')}`).then((response) => {
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
                setValue("sexe", tab['sexe'])
                setValue("nationalite", tab['nationalite'])
                setValue("piece", tab['piece'])

                setValue("mariage", tab['mariage'])
                setValue("nom_fille", tab['nom_fille'])
                setValue("nom_conjoint", tab['nom_conjoint'])
                setValue("prenom_conjoint", tab['prenom_conjoint'])
                setValue("dateNaissance_conjoint", todayUpdateFunction(tab['dateNaissance_conjoint']))
                setValue("nombreEnfants_scolarise", tab['nombreEnfants_scolarise'])
                setValue("prenom_pere", tab['prenom_pere'])
                setValue("nom_mere", tab['nom_mere'])
                setValue("prenom_mere", tab['prenom_mere'])
                setValue("mail", tab['mail'])
                setValue("telephone", tab['telephone'])
                setValue("salarie", tab['salarie'])
                setValue("mutuelle", tab['mutuelle'])
                setValue("groupage", tab['groupage'])
                setValue("compte", tab['compte'])
                setValue("intitule_compte", tab['intitule_compte'])
                setValue("code_banc", tab['code_banc'])
                setValue("intitule_banc", tab['intitule_banc'])
                setValue("code_agence", tab['code_agence'])
                setValue("date_piece_du", todayUpdateFunction(tab['date_piece_du']))
                setValue("date_piece_au", todayUpdateFunction(tab['date_piece_au']))
                setValue("passeport", tab['passeport'])
                setValue("date_passeport_du", todayUpdateFunction(tab['date_passeport_du']))
                setValue("date_passeport_au", todayUpdateFunction(tab['date_passeport_au']))
                setValue("piece_security", tab['piece_security'])
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
                        <form onSubmit={handleSubmit(submitForm)} className="form-1">

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("matricule")}
                                        required
                                    />
                                    <span className="floating-label">#xxxxxxxxxxxxxxxx</span>
                                    <p>{errors.matricule?.message}</p>
                                </div>
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
                                        type="date"
                                        className="inputText"
                                        {...register("dateNaissance")}
                                        required
                                    />
                                    <span className="floating-label label-date">Date de Naissance</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("structure")}
                                        required
                                    />
                                    <span className="floating-label">Lieu de Naissence</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("dateRecrutement")}
                                        required
                                    />
                                    <span className="floating-label label-date">Date de recrutememnt</span>
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
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("mariage")}
                                        required
                                    />
                                    <span className="floating-label">Numéro acte de marriage </span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("sexe")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Sexe</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("piece_security")}
                                        required
                                    />
                                    <span className="floating-label">Numéro sécurité sociale</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("nom_fille")}
                                        required
                                    />
                                    <span className="floating-label">Nom jeune fille</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("nom_conjoint")}
                                        required
                                    />
                                    <span className="floating-label">Nom du conjoint(e)</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("prenom_conjoint")}
                                        required
                                    />
                                    <span className="floating-label">Prénom du conjoint(e) </span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("dateNaissance_conjoint")}
                                        required
                                    />
                                    <span className="floating-label label-date">Date de Naissance du conjoint(e)</span>
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
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        {...register("nombreEnfants_scolarise")}
                                        required
                                    />
                                    <span className="floating-label">Nombre d'enfant scolarisé </span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("region")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Unité</option>
                                        <option value="Unité Alger"> Unité Alger</option>
                                        <option value="Unité Oran">Unité Oran</option>
                                        <option value="Unité Bejaia">Unité Bejaia</option>
                                        <option value="Unité Siège">Unité Siège</option>
                                    </select>
                                </div>
                            </div>
                            {/* ----------hna habs----------------- */}
                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("prenom_pere")}
                                        required
                                    />
                                    <span className="floating-label">Prénom du père</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("nom_mere")}
                                        required
                                    />
                                    <span className="floating-label">Nom de la mère</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("prenom_mere")}
                                        required
                                    />
                                    <span className="floating-label">Prénom de la mère</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="email"
                                        className="inputText"
                                        {...register("mail")}
                                        required
                                    />
                                    <span className="floating-label">Adresse mail</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("telephone")}
                                        required
                                    />
                                    <span className="floating-label">Téléphone</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("nationalite")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Nationalité</option>
                                        <option value="Algérienne">Algérienne</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("salarie")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Salarié</option>
                                        <option value="actif">actif</option>
                                        <option value="bloqué">bloqué</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("mutuelle")}
                                        required
                                    />
                                    <span className="floating-label">Numéro mutuelle</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("groupage")}
                                        required
                                    />
                                    <span className="floating-label">Groupage</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("compte")}
                                        required
                                    />
                                    <span className="floating-label">N° de compte</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("intitule_compte")}
                                        required
                                    />
                                    <span className="floating-label">Intitule compte/banque salarié</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("code_banc")}
                                        required
                                    />
                                    <span className="floating-label">Code banque entreprise</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("intitule_banc")}
                                        required
                                    />
                                    <span className="floating-label">Intitule banque entreprise</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("code_agence")}
                                        required
                                    />
                                    <span className="floating-label">Code agence CNAS</span>
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

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("piece")}
                                        required
                                    />
                                    <span className="floating-label">Numéro piece d'identité</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("date_piece_du")}
                                        required
                                    />
                                    <span className="floating-label label-date">Délivré le:</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("date_piece_au")}
                                        required
                                    />
                                    <span className="floating-label label-date">à</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("passeport")}
                                        required
                                    />
                                    <span className="floating-label">Numéro passeport</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("date_passeport_du")}
                                        required
                                    />
                                    <span className="floating-label label-date">Délivré le:</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("date_passeport_au")}
                                        required
                                    />
                                    <span className="floating-label label-date">à</span>
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
                            </div>

                            <div className="btn-container" style={{ width: '60%', margin: '0 auto' }}>
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
                        <div className="two-input btn-containers " style={{ margin: '0 auto 20px' }}>
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
