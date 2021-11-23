import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavAddEmploye from '../navBar/NavAddEmploye'
import todayFunction from '../function/Today'
import HeaderRight from '../includes/HeaderRight'
import NotFoundPage from '../includes/NotFound'

import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";

function ViewEmploye() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const [notFound, setNotFound] = useState(false)

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
    const [date_finTable7, setdate_finTable7] = useState('')
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
            setdate_finTable7(response.data.table7[0]['date_fin'])
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
    const todayDate_FinTable7 = todayFunction(date_finTable7)
    const todayDateTable8 = todayFunction(dateTable8)


    // Csv + Pdf
    const handleBtnExportPdf = (matricule) => {
        const headers1 = [["Matricule", "Nom", "Prénom", "Address", "Unité"]];
        const data1 = table1.map(elt => [elt.matricule, elt.nom, elt.prenom, elt.address, elt.region]);
        const headers2 = [["Post occupé", "Structure", "Date_debut", "Date_fin", "Contrat"]];
        const data2 = table2.map(elt => [elt.post_oc, elt.employer, todayFunction(elt.date_debut), todayFunction(elt.date_fin), elt.contrat]);
        const headers3 = [["Post occupé", "Structure", "Date_debut", "Date_fin", "Type"]];
        const data3 = table3.map(elt => [elt.post_oc, elt.structure, todayFunction(elt.date_debut), todayFunction(elt.date_fin), elt.carriere]);
        const headers4 = [["Intitule", "Organisme", "Date", "Duree", "Titre"]];
        const data4 = table4.map(elt => [elt.intitule, elt.organisme, todayFunction(elt.date), elt.duree, elt.titre]);
        const headers5 = [["Salaire Ini", "Salaire rev", "Date", "Gain", "Motif"]];
        const data5 = table5.map(elt => [elt.salaire_initial, elt.salaire_rev, todayFunction(elt.date), elt.gain, elt.motif]);
        const headers6 = [["Designation", "Auteur", "Date effet", "Motif", "Degré"]];
        const data6 = table6.map(elt => [elt.designation, elt.auteur, todayFunction(elt.date), elt.griefs, elt.degree]);
        const headers7 = [["Type d'absence", "Du", "Au", "Motif d'absence"]];
        const data7 = table7.map(elt => [elt.absence_irr, todayFunction(elt.annee), todayFunction(elt.date_fin), elt.conge]);
        const headers8 = [["Exercice", "Nature", "Date départ", "Date retour", "Duree", "Duree rest"]];
        const data8 = table8.map(elt => [elt.designation, elt.nature, todayFunction(elt.date), todayFunction(elt.date_retour), elt.duree, elt.duree_rest]);

        let content1 = { startY: 25, head: headers1, body: data1 };
        let content2 = { startY: height, head: headers2, body: data2 };
        let content3 = { startY: height, head: headers3, body: data3 };
        let content4 = { startY: height, head: headers4, body: data4 };
        let content5 = { startY: height, head: headers5, body: data5 };
        let content6 = { startY: height, head: headers6, body: data6 };
        let content7 = { startY: height, head: headers7, body: data7 };
        let content8 = { startY: height, head: headers8, body: data8 };

        const doc = new jsPDF();
        var height = doc.internal.pageSize.height;
        doc.text(`Matricule: ${matricule}`, 15, 20);
        doc.autoTable(content1);
        doc.autoTable(content2);
        doc.autoTable(content3);
        doc.autoTable(content4);
        doc.autoTable(content5);
        doc.autoTable(content6);
        doc.autoTable(content7);
        doc.autoTable(content8);
        doc.save("a4.pdf");
    }
    const handleBtnExportCsv = (matricule) => {
        console.log(matricule)
    }


    return (
        <>
            <div class="roww" ref={roww} >
                <section class="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Employe" />
                </section>
                <section class="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div class="coll-2-container" >
                        {notFound ?
                            <NotFoundPage />
                            :
                            <div className="employer-details">
                                <div className="table-title">
                                    <h3>Regeneraux</h3>
                                </div>
                                <div class="table-container">
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
                                                <th>Sexe</th>
                                                <th>Nationalité</th>
                                                <th>Piece</th>
                                                <th>PDF</th>
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
                                                    <td> {row['sexe']} </td>
                                                    <td> {row['nationalite']} </td>
                                                    <td> {row['piece']} </td>
                                                    {/* <td> <button className="btn btn-secondary" onClick={() => handleBtnExportCsv(row['matricule'])}>Csv</button> </td> */}
                                                    <td> <button className="btn btn-danger" onClick={() => handleBtnExportPdf(row['matricule'])}>Pdf</button> </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="table-title">
                                    <h3>Expérience Professional</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Fonction</th>
                                            <th>Structure</th>
                                            <th>Date de recrutememnt</th>
                                            <th>date fin</th>
                                            <th>Contrat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table2.map(row => {
                                            return <tr>
                                                <td> {row['matricule']} </td>
                                                <td> {row['post_oc']}   </td>
                                                <td> {row['employer']}   </td>
                                                <td> {todayFunction(row['date_debut'])}</td>
                                                <td> {todayFunction(row['date_fin'])} </td>
                                                <td> {row['contrat']}   </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                <div className="table-title">
                                    <h3>EvoCarriére</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Post Occupé</th>
                                            <th>Structure</th>
                                            <th>date debut</th>
                                            <th>date fin</th>
                                            <th>Type</th>
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
                                                <td> {row['carriere']}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                <div className="table-title">
                                    <h3>Formation Professional</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>intitule</th>
                                            <th>organisme</th>
                                            <th>date</th>
                                            <th>duree</th>
                                            <th>titre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table4.map(row => {
                                            return <tr>
                                                <td> {row['matricule']} </td>
                                                <td> {row['intitule']} </td>
                                                <td> {row['organisme']} </td>
                                                <td>{todayFunction(row['date'])}</td>
                                                <td> {row['duree']} </td>
                                                <td> {row['titre']} </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                <div className="table-title">
                                    <h3>RevSalariale</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>salaire_initial</th>
                                            <th>salaire_rev</th>
                                            <th>date</th>
                                            <th>gain</th>
                                            <th>motif</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table5.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}</td>
                                                <td> {row['salaire_initial']}</td>
                                                <td> {row['salaire_rev']}</td>
                                                <td> {todayFunction(row['date'])}</td>
                                                <td> {row['gain']}</td>
                                                <td> {row['motif']}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                <div className="table-title">
                                    <h3>Mesures Disciplinaire</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>designation</th>
                                            <th>auteur</th>
                                            <th>date effet</th>
                                            <th>motif</th>
                                            <th>degree</th>
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
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                <div className="table-title">
                                    <h3>Assiduité</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Type d'absence</th>
                                            <th>Du</th>
                                            <th>Au</th>
                                            <th>Motif d'absence</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table7.map(row => {
                                            return <tr>
                                                <td> {row['matricule']}</td>
                                                <td> {row['absence_irr']}</td>
                                                <td> {todayFunction(row['annee'])}</td>
                                                <td> {todayFunction(row['date_fin'])}</td>
                                                <td> {row['conge']}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                                <div className="table-title">
                                    <h3>Gratification</h3>
                                </div>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Exercice</th>
                                            <th>Nature</th>
                                            <th>Date Départ</th>
                                            <th>Date retour</th>
                                            <th>Duree</th>
                                            <th>Duree rest</th>
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

export default ViewEmploye
