import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/Context'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import NavAddEmploye from '../navBar/NavAddEmploye'
import todayFunction from '../function/Today'
import HeaderRight from '../includes/HeaderRight'
import ScrollToTop from '../ScrollToTop'
import NotFoundPage from '../includes/NotFound'

function UpdateEmploye() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const [notFound, setNotFound] = useState(false)

    // useState
    const [table1, setTable1] = useState([])
    const [table2, setTable2] = useState([])
    const [table3, setTable3] = useState([])
    const [table4, setTable4] = useState([])
    const [table5, setTable5] = useState([])
    const [table6, setTable6] = useState([])
    const [table7, setTable7] = useState([])
    const [table8, setTable8] = useState([])
    const [dateNaissance, setdateNaissance] = useState('')
    const [dateRecrutement, setdateRecrutement] = useState('')
    const [debutTable2, setdebutTable2] = useState('')
    const [finTable2, setfinTable2] = useState('')
    const [debutTable3, setdebutTable3] = useState('')
    const [finTable3, setfinTable3] = useState('')
    const [dateTable4, setdateTable4] = useState('')
    const [dateTable5, setdateTable5] = useState('')
    const [dateTable6, setdateTable6] = useState('')
    const [anneeTable7, setanneeTable7] = useState('')
    const [dateTable8, setdateTable8] = useState('')

    const { id } = useParams()


    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/employe/${id}`).then((response) => {
            // console.log(response.data)
            setTable1(response.data.table1)
            setTable2(response.data.table2)
            setTable3(response.data.table3)
            setTable4(response.data.table4)
            setTable5(response.data.table5)
            setTable6(response.data.table6)
            setTable7(response.data.table7)
            setTable8(response.data.table8)
            // setDate
            setdateNaissance(response.data.table1[0]['date_naissance'])
            setdateRecrutement(response.data.table1[0]['date_recrutement'])
            setdebutTable2(response.data.table2[0]['date_debut'])
            setfinTable2(response.data.table2[0]['date_fin'])
            setdebutTable3(response.data.table3[0]['date_debut'])
            setfinTable3(response.data.table3[0]['date_fin'])
            setdateTable4(response.data.table4[0]['date'])
            setdateTable5(response.data.table5[0]['date'])
            setdateTable6(response.data.table6[0]['date'])
            setanneeTable7(response.data.table7[0]['annee'])
            setdateTable8(response.data.table8[0]['date'])
        }).catch((error) => {
            console.log(error)
            if (error.response) {
                if (error.response.status == 404) {
                    return setNotFound(true)
                }
            }
        })
    }, [])
    useEffect(() => {

        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])

    // Date
    const todayNaissance = todayFunction(dateNaissance)
    const todayRecrutement = todayFunction(dateRecrutement)

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
                        {notFound ?
                            <NotFoundPage />
                            :
                            <div className="employer-details">
                                {/* <!-- First Table --> */}
                                <div className="table-title">
                                    <h3>Informations Generales</h3>
                                </div>
                                <div className="table-container">
                                    <table id="testtable">
                                        <thead>
                                            <tr>
                                                <th>Matricule</th>
                                                <th>prenom</th>
                                                <th>nom</th>
                                                <th>address</th>
                                                <th>Situation</th>
                                                <th>N: d'enfants</th>
                                                <th>Date Naissance</th>
                                                <th>Lieu de Naissence</th>
                                                <th>Date Recrutement</th>
                                                <th>Region</th>
                                                <th>Specialité</th>
                                                <th>Sexe</th>
                                                <th>Nationalité</th>

                                                <th>Numéro acte de marriage</th>
                                                <th>Numéro sécurité sociale</th>
                                                <th>Nom jeune fille</th>
                                                <th>Nom du conjoint(e)</th>
                                                <th>Prénom du conjoint(e)</th>
                                                <th>Nombre d'enfant scolarisé</th>
                                                <th>Prénom du père</th>
                                                <th>Nom de la mère</th>
                                                <th>Prénom de la mère</th>
                                                <th>Adresse mail</th>
                                                <th>Téléphone</th>
                                                <th>Salarié</th>
                                                <th>Numéro mutuelle</th>
                                                <th>Groupage</th>
                                                <th>N° de compte</th>
                                                <th>Intitule compte/banque salarié</th>
                                                <th>Code banque entreprise</th>
                                                <th>Intitule banque entreprise</th>
                                                <th>Code agence CNAS</th>
                                                <th>Numéro piece d'identité</th>
                                                <th>Délivré le:(identité)</th>
                                                <th>à:(identité)</th>
                                                <th>Numéro passeport</th>
                                                <th>Délivré le:(passeport)</th>
                                                <th>à:(passeport)</th>
                                                <th>Diplome</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table1.map((row, key) => {
                                                return <tr>
                                                    <td> {row['matricule']} </td>
                                                    <td> {row['prenom']} </td>
                                                    <td> {row['nom']} </td>
                                                    <td> {row['address']} </td>
                                                    <td> {row['s_famille']}</td>
                                                    <td> {row['n_enfants']} </td>
                                                    <td> {todayNaissance} </td>
                                                    <td> {row['structure']} </td>
                                                    <td> {todayRecrutement} </td>
                                                    <td> {row['region']} </td>
                                                    <td> {row['specialite']} </td>
                                                    <td> {row['sexe']} </td>
                                                    <td> {row['nationalite']} </td>

                                                    <td> {row['mariage']} </td>
                                                    <td> {row['piece_security']} </td>
                                                    <td> {row['nom_fille']} </td>
                                                    <td> {row['nom_conjoint']} </td>
                                                    <td> {row['prenom_conjoint']} </td>
                                                    <td> {row['nombreEnfants_scolarise']} </td>
                                                    <td> {row['prenom_pere']} </td>
                                                    <td> {row['nom_mere']} </td>
                                                    <td> {row['prenom_mere']} </td>
                                                    <td> {row['mail']} </td>
                                                    <td> {row['telephone']} </td>
                                                    <td> {row['salarie']} </td>
                                                    <td> {row['mutuelle']} </td>
                                                    <td> {row['groupage']} </td>
                                                    <td> {row['compte']} </td>
                                                    <td> {row['intitule_compte']} </td>
                                                    <td> {row['code_banc']} </td>
                                                    <td> {row['intitule_banc']} </td>
                                                    <td> {row['code_agence']} </td>
                                                    <td> {row['piece']} </td>
                                                    <td> {todayFunction(row['date_piece_du'])} </td>
                                                    <td> {todayFunction(row['date_piece_au'])} </td>
                                                    <td> {row['passeport']} </td>
                                                    <td> {todayFunction(row['date_passeport_du'])} </td>
                                                    <td> {todayFunction(row['date_passeport_au'])} </td>
                                                    <td> {row['diplome']} </td>
                                                    <td><Link to={`/employe/update__1/${row['rg_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- Second Table --> */}
                                <div className="table-title">
                                    <h3>Expérience Professionnelle</h3>
                                </div>
                                <div className="table-container">
                                    <table id="testtable-2">
                                        <thead>
                                            <tr>
                                                <th>Matricule</th>
                                                <th>Fonction</th>
                                                <th>Structure</th>
                                                <th>Date de recrutememnt</th>
                                                <th>date fin</th>
                                                <th>Type de Contrat</th>
                                                <th>Numéro du contrat</th>
                                                <th>Date de départ</th>
                                                <th>Date de reprise</th>
                                                <th>Motif du Départ</th>
                                                <th>Décision</th>
                                                <th>Classe</th>
                                                <th>Qualification</th>
                                                <th>Salaire de base</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table2.map(row => {
                                                return <tr>
                                                    <td> {row['matricule']}</td>
                                                    <td>{row['post_oc']} </td>
                                                    <td>{row['employer']} </td>
                                                    <td>{todayFunction(row['date_debut'])}</td>
                                                    <td>{todayFunction(row['date_fin'])} </td>
                                                    <td>{row['contrat']}</td>
                                                    <td>{row['num_contrat']}</td>
                                                    <td>{todayFunction(row['date_depart'])}</td>
                                                    <td>{row['motif']}</td>
                                                    <td>{todayFunction(row['date_reprise'])}</td>
                                                    <td>{row['decision']}</td>
                                                    <td>{row['classe']}</td>
                                                    <td>{row['qualification']}</td>
                                                    <td>{row['salaire']}</td>
                                                    <td><Link to={`/employe/update__2/${row['exp_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- Third Table --> */}
                                <div className="table-title">
                                    <h3>Gestion des Carriéres</h3>
                                </div>
                                <div className="table-container">
                                    <table id="testtable-2">
                                        <thead>
                                            <tr>
                                                <th>Matricule</th>
                                                <th>Post Occupé</th>
                                                <th>Structure</th>
                                                <th>date debut</th>
                                                <th>date fin</th>
                                                <th>Motif du contrat</th>
                                                <th>Décision</th>
                                                <th>Nature de Contrat</th>
                                                <th>Nombre d'années travaillés</th>
                                                <th>Classe</th>
                                                <th>Qualification</th>
                                                <th>Salaire de base</th>
                                                <th>Type de Carriére</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table3.map(row => {
                                                return <tr>
                                                    <td> {row['matricule']}</td>
                                                    <td> {row['post_oc']}</td>
                                                    <td> {row['structure']}</td>
                                                    <td> {todayFunction(row['date_debut'])}</td>
                                                    <td> {todayFunction(row['date_fin'])}</td>
                                                    <td> {row['motif']}</td>
                                                    <td> {row['decision']}</td>
                                                    <td> {row['contrat']}</td>
                                                    <td> {row['num_annee']}</td>
                                                    <td> {row['classe']}</td>
                                                    <td> {row['qualification']}</td>
                                                    <td> {row['salaire']}</td>
                                                    <td> {row['carriere']}</td>
                                                    <td><Link to={`/employe/update__3/${row['evo_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- Fourth Table --> */}
                                <div className="table-title">
                                    <h3>Formations Professionnelles</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Thème de la Formation</th>
                                            <th>Organisme Formateur</th>
                                            <th>du</th>
                                            <th>au</th>
                                            <th>Saisier La Durée en mois</th>
                                            <th>Diplôme Obtenu</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table4.map(row => {
                                            return <tr>
                                                <td> {row['matricule']} </td>
                                                <td> {row['intitule']} </td>
                                                <td> {row['organisme']} </td>
                                                <td>{todayFunction(row['date'])}</td>
                                                <td>{todayFunction(row['date_fin'])}</td>
                                                <td> {row['duree']} </td>
                                                <td> {row['titre']} </td>
                                                <td><Link to={`/employe/update__4/${row['for_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                {/* <!-- Fifth Table --> */}
                                <div className="table-title">
                                    <h3>Revalorisation Salariale</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Salaire de base</th>
                                            <th>Nouveau Salaire de base</th>
                                            <th>Date de décision</th>
                                            <th>Décision/contrat</th>
                                            <th>Ecart</th>
                                            <th>Motif</th>
                                            <th>Primes et intemnité</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table5.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}</td>
                                                <td> {row['salaire_initial']}</td>
                                                <td> {row['salaire_rev']}</td>
                                                <td> {todayFunction(row['date'])}</td>
                                                <td> {row['decision']}</td>
                                                <td> {row['gain']}</td>
                                                <td> {row['motif']}</td>
                                                <td> {row['primes']}</td>
                                                <td><Link to={`/employe/update__5/${row['rev_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                {/* <!-- sixth Table --> */}
                                <div className="table-title">
                                    <h3>Sanctions Disciplinaires</h3>
                                </div>
                                <div className="table-container">
                                    <table id="testtable-2">
                                        <thead>
                                            <tr>
                                                <th>Matricule</th>
                                                <th>Nouveau Post</th>
                                                <th>Nature de la sanction</th>
                                                <th>date effet</th>
                                                <th>Motif de la sanction</th>
                                                <th>Degré de la sanction</th>
                                                <th>Nouveau classification</th>
                                                <th>Nouveau Salaire de base</th>
                                                <th>Durée retard échelon</th>
                                                <th>Date de licenciment</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table6.map(row => {
                                                return <tr>
                                                    <td> {row['matricule']}</td>
                                                    <td> {row['designation']}</td>
                                                    <td> {row['auteur']}</td>
                                                    <td> {todayFunction(row['date'])}</td>
                                                    <td> {row['griefs']}</td>
                                                    <td> {row['degree']}</td>
                                                    <td> {row['classification']}</td>
                                                    <td> {row['salaire']}</td>
                                                    <td> {row['duree']}</td>
                                                    <td> {row['date_licen']}</td>
                                                    <td><Link to={`/employe/update__6/${row['mes_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- Seventh Table --> */}
                                <div className="table-title">
                                    <h3>Assiduité</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Type d'absence</th>
                                            <th>Nombre d'absence</th>
                                            <th>Du</th>
                                            <th>Au</th>
                                            <th>Motif d'absence</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table7.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}</td>
                                                <td> {row['absence_irr']}</td>
                                                <td> {row['absence_num']}</td>
                                                <td> {todayFunction(row['annee'])}</td>
                                                <td> {todayFunction(row['date_fin'])}</td>
                                                <td> {row['conge']}</td>
                                                <td><Link to={`/employe/update__7/${row['ass_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                {/* <!-- Eigth Table --> */}
                                <div className="table-title">
                                    <h3>Gestion des Congés</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Exercice</th>
                                            <th>Nature du congé</th>
                                            <th>Date Départ</th>
                                            <th>Date retour</th>
                                            <th>Nombre de jours congé</th>
                                            <th>Nombre de jours restant</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table8.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}</td>
                                                <td> {row['designation']}</td>
                                                <td> {row['nature']}</td>
                                                <td> {todayFunction(row['date'])}</td>
                                                <td> {todayFunction(row['date_retour'])}</td>
                                                <td> {row['duree']}</td>
                                                <td> {row['duree_rest']}</td>
                                                <td><Link to={`/employe/update__8/${row['gra_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default UpdateEmploye
