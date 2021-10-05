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
    const todayDebutTable2 = todayFunction(debutTable2)
    const todayFinTable2 = todayFunction(finTable2)
    const todayDebutTable3 = todayFunction(debutTable3)
    const todayFinTable3 = todayFunction(finTable3)
    const todayDateTable4 = todayFunction(dateTable4)
    const todayDateTable5 = todayFunction(dateTable5)
    const todayDateTable6 = todayFunction(dateTable6)
    const todayAnneeTable7 = todayFunction(anneeTable7)
    const todayDateTable8 = todayFunction(dateTable8)




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
                                    <h3>Regeneraux</h3>
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
                                                <th>Ascendent</th>
                                                <th>Date Naissance</th>
                                                <th>Date Recrutement</th>
                                                <th>Region</th>
                                                <th>Diplome</th>
                                                <th>Specialité</th>
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
                                                    <td> {row['ascendant']} </td>
                                                    <td> {todayNaissance} </td>
                                                    <td> {todayRecrutement} </td>
                                                    <td> {row['region']} </td>
                                                    <td> {row['diplome']} </td>
                                                    <td> {row['specialite']} </td>
                                                    <td><Link to={`/employe/update__1/${row['rg_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- Second Table --> */}
                                <div className="table-title">
                                    <h3>Expérience Professional</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>post_oc</th>
                                            <th>employer</th>
                                            <th>date debut</th>
                                            <th>date fin</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table2.map(row => {
                                            return <tr>
                                                <td> {row['matricule']} </td>
                                                <td> {row['post_oc']}   </td>
                                                <td> {row['employer']}   </td>
                                                <td> {todayDebutTable2}  </td>
                                                <td> {todayFinTable2}</td>
                                                <td><Link to={`/employe/update__2/${row['exp_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                {/* <!-- Third Table --> */}
                                <div className="table-title">
                                    <h3>EvoCarriére</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>post_oc</th>
                                            <th>structure</th>
                                            <th>date debut</th>
                                            <th>date fin</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table3.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}   </td>
                                                <td> {row['post_oc']}   </td>
                                                <td> {row['structure']}   </td>
                                                <td> {todayDebutTable3}  </td>
                                                <td> {todayFinTable3} </td>
                                                <td><Link to={`/employe/update__3/${row['evo_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                {/* <!-- Fourth Table --> */}
                                <div className="table-title">
                                    <h3>Formation Professional</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>intitule</th>
                                            <th>organisme</th>
                                            <th>date</th>
                                            <th>duree</th>
                                            <th>titre</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table4.map(row => {
                                            return <tr>
                                                <td> {row['matricule']} </td>
                                                <td> {row['intitule']} </td>
                                                <td> {row['organisme']} </td>
                                                <td> {todayDateTable4} </td>
                                                <td> {row['duree']} </td>
                                                <td> {row['titre']} </td>
                                                <td><Link to={`/employe/update__4/${row['for_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                {/* <!-- Fifth Table --> */}
                                <div className="table-title">
                                    <h3>RevSalariale</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>salaire_initial</th>
                                            <th>salaire_rev</th>
                                            <th>date</th>
                                            <th>gain</th>
                                            <th>motif</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table5.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}  </td>
                                                <td> {row['salaire_initial']}   </td>
                                                <td> {row['salaire_rev']}   </td>
                                                <td> {todayDateTable5}   </td>
                                                <td> {row['gain']}   </td>
                                                <td> {row['motif']}   </td>
                                                <td><Link to={`/employe/update__5/${row['rev_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                {/* <!-- sixth Table --> */}
                                <div className="table-title">
                                    <h3>Mesures Disciplinaire</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>designation</th>
                                            <th>auteur</th>
                                            <th>date</th>
                                            <th>griefs</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table6.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}  </td>
                                                <td> {row['designation']}   </td>
                                                <td> {row['auteur']}   </td>
                                                <td> {todayDateTable6}   </td>
                                                <td> {row['griefs']}   </td>
                                                <td><Link to={`/employe/update__6/${row['mes_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                {/* <!-- Seventh Table --> */}
                                <div className="table-title">
                                    <h3>Assiduité</h3>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>absence_irr</th>
                                            <th>absence_aut</th>
                                            <th>annee</th>
                                            <th>conge</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table7.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}   </td>
                                                <td> {row['absence_irr']}  </td>
                                                <td> {row['absence_aut']}  </td>
                                                <td> {todayAnneeTable7}  </td>
                                                <td> {row['conge']}   </td>
                                                <td><Link to={`/employe/update__7/${row['ass_id']}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                {/* <!-- Eigth Table --> */}
                                <div className="table-title">
                                    <h3>Gratification</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Designation</th>
                                            <th>Nature</th>
                                            <th>Date</th>
                                            <th>Duree</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table8.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}   </td>
                                                <td> {row['designation']}  </td>
                                                <td> {row['nature']}  </td>
                                                <td> {todayDateTable8}  </td>
                                                <td> {row['duree']}   </td>
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
