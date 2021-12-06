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
    const [sexe, setsexe] = useState('')
    const [nationalite, setnationalite] = useState('')
    const [piece, setpiece] = useState('')

    const [mariage, setmariage] = useState('')
    const [nom_fille, setnom_fille] = useState('')
    const [nom_conjoint, setnom_conjoint] = useState('')
    const [prenom_conjoint, setprenom_conjoint] = useState('')
    const [dateNaissance_conjoint, setdateNaissance_conjoint] = useState('')
    const [nombreEnfants_scolarise, setnombreEnfants_scolarise] = useState('')
    const [prenom_pere, setprenom_pere] = useState('')
    const [nom_mere, setnom_mere] = useState('')
    const [prenom_mere, setprenom_mere] = useState('')
    const [mail, setmail] = useState('')
    const [telephone, settelephone] = useState('')
    const [salarie, setsalarie] = useState('')
    const [mutuelle, setmutuelle] = useState('')
    const [groupage, setgroupage] = useState('')
    const [compte, setcompte] = useState('')
    const [intitule_compte, setintitule_compte] = useState('')
    const [code_banc, setcode_banc] = useState('')
    const [intitule_banc, setintitule_banc] = useState('')
    const [code_agence, setcode_agence] = useState('')
    const [date_piece_du, setdate_piece_du] = useState('')
    const [date_piece_au, setdate_piece_au] = useState('')
    const [passeport, setpasseport] = useState('')
    const [date_passeport_du, setdate_passeport_du] = useState('')
    const [date_passeport_au, setdate_passeport_au] = useState('')
    const [piece_security, setpiece_security] = useState('')


    const history = useHistory()

    const { id } = useParams()

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employeUp/${id}`).then((response) => {
            console.log(response.data.table1)
            const tab = response.data.table1[0]
            setmatricule(tab['matricule'])
            setnom(tab['nom'])
            setprenom(tab['prenom'])
            setaddress(tab['address'])
            setsituation(tab['s_famille'])
            setnombreEnfants(tab['n_enfants'])
            setascendant(tab['ascendant'])
            setdateNaissance(todayUpdateFunction(tab['date_naissance']))
            setdateRecrutement(todayUpdateFunction(tab['date_recrutement']))
            setstructure(tab['structure'])
            setregion(tab['region'])
            setdiplome(tab['diplome'])
            setspecialite(tab['specialite'])
            setsexe(tab['sexe'])
            setnationalite(tab['nationalite'])
            setpiece(tab['piece'])

            setmariage(tab['mariage'])
            setnom_fille(tab['nom_fille'])
            setnom_conjoint(tab['nom_conjoint'])
            setprenom_conjoint(tab['prenom_conjoint'])
            setdateNaissance_conjoint(todayUpdateFunction(tab['dateNaissance_conjoint']))
            setnombreEnfants_scolarise(tab['nombreEnfants_scolarise'])
            setprenom_pere(tab['prenom_pere'])
            setnom_mere(tab['nom_mere'])
            setprenom_mere(tab['prenom_mere'])
            setmail(tab['mail'])
            settelephone(tab['telephone'])
            setsalarie(tab['salarie'])
            setmutuelle(tab['mutuelle'])
            setgroupage(tab['groupage'])
            setcompte(tab['compte'])
            setintitule_compte(tab['intitule_compte'])
            setcode_banc(tab['code_banc'])
            setintitule_banc(tab['intitule_banc'])
            setcode_agence(tab['code_agence'])
            setdate_piece_du(todayUpdateFunction(tab['date_piece_du']))
            setdate_piece_au(todayUpdateFunction(tab['date_piece_au']))
            setpasseport(tab['passeport'])
            setdate_passeport_du(todayUpdateFunction(tab['date_passeport_du']))
            setdate_passeport_au(todayUpdateFunction(tab['date_passeport_au']))
            setpiece_security(tab['piece_security'])
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
        document.title = "Update__1"
    }, [])

    // Yup
    let schema = yup.object().shape({
        // matricule: yup.number().positive().integer(),
        // matricule: yup.string().required().trim(),
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
            dateRecrutement, structure, region, diplome, specialite,
            sexe, nationalite, piece, piece_security,
            mariage, nom_fille, nom_conjoint, prenom_conjoint, dateNaissance_conjoint,
            nombreEnfants_scolarise, prenom_pere, nom_mere, prenom_mere, mail, telephone,
            salarie, mutuelle, groupage, compte, intitule_compte, code_banc, intitule_banc,
            code_agence, date_piece_du, date_piece_au, passeport, date_passeport_du, date_passeport_au
        }
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/edit_1`, { data, id: { id } }).then((response) => {
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
                        <form onSubmit={handleSubmit(submitForm)} className="form-1">

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setmatricule(e.target.value)}
                                        value={matricule}
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
                                        onChange={(e) => setnom(e.target.value)}
                                        value={nom}
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
                                        onChange={(e) => setprenom(e.target.value)}
                                        value={prenom}
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
                                        required
                                        onChange={(e) => setdateNaissance(e.target.value)}
                                        value={dateNaissance}

                                    />
                                    <span className="floating-label label-date">Date de Naissance</span>
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
                                    <span className="floating-label">Lieu de Naissance</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        required
                                        onChange={(e) => setdateRecrutement(e.target.value)}
                                        value={dateRecrutement}
                                    />
                                    <span className="floating-label label-date">Date de recrutement</span>
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
                                        onChange={(e) => setmariage(e.target.value)}
                                        value={mariage}
                                        required
                                    />
                                    <span className="floating-label">Numéro acte de marriage </span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setsexe(e.target.value)} value={sexe} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Sexe</option>
                                        <option value="Masculin">Masculin</option>
                                        <option value="Féminin">Féminin</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setpiece_security(e.target.value)}
                                        value={piece_security}
                                        required
                                    />
                                    <span className="floating-label">Numéro sécurité sociale</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setnom_fille(e.target.value)}
                                        value={nom_fille}
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

                                        onChange={(e) => setnom_conjoint(e.target.value)}
                                        value={nom_conjoint}
                                        required
                                    />
                                    <span className="floating-label">Nom du conjoint(e)</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"

                                        onChange={(e) => setprenom_conjoint(e.target.value)}
                                        value={prenom_conjoint}
                                        required
                                    />
                                    <span className="floating-label">Prénom du conjoint(e) </span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"

                                        onChange={(e) => setdateNaissance_conjoint(e.target.value)}
                                        value={dateNaissance_conjoint}
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
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        onChange={(e) => setnombreEnfants_scolarise(e.target.value)}
                                        value={nombreEnfants_scolarise}
                                        required
                                    />
                                    <span className="floating-label">Nombre d'enfant scolarisé </span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setregion(e.target.value)} value={region} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Unité</option>
                                        <option value="Unité Alger"> Unité Alger</option>
                                        <option value="Unité Oran">Unité Oran</option>
                                        <option value="Unité Bejaia">Unité Bejaia</option>
                                        <option value="Unité Siège">Unité Siège</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setprenom_pere(e.target.value)}
                                        value={prenom_pere}
                                        required
                                    />
                                    <span className="floating-label">Prénom du père</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setnom_mere(e.target.value)}
                                        value={nom_mere}
                                        required
                                    />
                                    <span className="floating-label">Nom de la mère</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setprenom_mere(e.target.value)}
                                        value={prenom_mere}
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
                                        onChange={(e) => setmail(e.target.value)}
                                        value={mail}
                                        required
                                    />
                                    <span className="floating-label">Adresse mail</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => settelephone(e.target.value)}
                                        value={telephone}
                                        required
                                    />
                                    <span className="floating-label">Téléphone</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setnationalite(e.target.value)} value={nationalite} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Nationalité</option>
                                        <option value="Algérienne">Algérienne</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" onChange={(e) => setsalarie(e.target.value)} value={salarie} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
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
                                        onChange={(e) => setmutuelle(e.target.value)}
                                        value={mutuelle}
                                        required
                                    />
                                    <span className="floating-label">Numéro mutuelle</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setgroupage(e.target.value)}
                                        value={groupage}
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
                                        onChange={(e) => setcompte(e.target.value)}
                                        value={compte}
                                        required
                                    />
                                    <span className="floating-label">N° de compte</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setintitule_compte(e.target.value)}
                                        value={intitule_compte}
                                        required
                                    />
                                    <span className="floating-label">Intitule compte/banque salarié</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setcode_banc(e.target.value)}
                                        value={code_banc}
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
                                        onChange={(e) => setintitule_banc(e.target.value)}
                                        value={intitule_banc}
                                        required
                                    />
                                    <span className="floating-label">Intitule banque entreprise</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setcode_agence(e.target.value)}
                                        value={code_agence}
                                        required
                                    />
                                    <span className="floating-label">Code agence CNAS</span>
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

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        onChange={(e) => setpiece(e.target.value)}
                                        value={piece}
                                        required
                                    />
                                    <span className="floating-label">Numéro piece d'identité</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        onChange={(e) => setdate_piece_du(e.target.value)}
                                        value={date_piece_du}
                                        required
                                    />
                                    <span className="floating-label label-date">Délivré le:</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        onChange={(e) => setdate_piece_au(e.target.value)}
                                        value={date_piece_au}
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
                                        onChange={(e) => setpasseport(e.target.value)}
                                        value={passeport}
                                        required
                                    />
                                    <span className="floating-label">Numéro passeport</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        onChange={(e) => setdate_passeport_du(e.target.value)}
                                        value={date_passeport_du}
                                        required
                                    />
                                    <span className="floating-label label-date">Délivré le:</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        onChange={(e) => setdate_passeport_au(e.target.value)}
                                        value={date_passeport_au}
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
                                        required
                                        onChange={(e) => setdiplome(e.target.value)}
                                        value={diplome}
                                    />
                                    <span className="floating-label">Diplome (Niveau d'enseignement)</span>
                                </div>
                            </div>

                            <div className="btn-container btn-update-1">
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
