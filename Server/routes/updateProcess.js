const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()



//------------------------------update__1--------------------------------
router.post('/edit_1', (req, res) => {

    const { id } = req.body.id

    const { matricule, prenom, nom, address, situation,
        nombreEnfants, ascendant, dateNaissance,
        dateRecrutement, structure, region, diplome, specialite,
        sexe, nationalite, piece, piece_security,
        mariage, nom_fille, nom_conjoint, prenom_conjoint, dateNaissance_conjoint,
        nombreEnfants_scolarise, prenom_pere, nom_mere, prenom_mere, mail, telephone,
        salarie, mutuelle, groupage, compte, intitule_compte, code_banc, intitule_banc,
        code_agence, date_piece_du, date_piece_au, passeport, date_passeport_du, date_passeport_au } = req.body.data

    //check if there is a user with that matricule
    sql = `SELECT * from rgeneraux where matricule='${matricule}' AND rg_id!=${id}; `
    sql_2 = `SELECT * from rgeneraux where rg_id=${id}`
    con.query(sql + sql_2, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select[0].length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // update data into table
        sql2 = `UPDATE  rgeneraux SET matricule='${matricule}' , prenom='${prenom}',nom='${nom}',address="${address}",
        s_famille='${situation}',n_enfants='${nombreEnfants}',ascendant="${ascendant}",
        date_naissance='${dateNaissance}',date_recrutement='${dateRecrutement}',
        structure="${structure}",region='${region}',diplome="${diplome}",
        specialite="${specialite}", sexe="${sexe}",
        nationalite="${nationalite}",piece="${piece}",piece_security="${piece_security}",
        
        mariage="${mariage}",nom_fille="${nom_fille}",nom_conjoint="${nom_conjoint}",prenom_conjoint="${prenom_conjoint}",
        dateNaissance_conjoint="${dateNaissance_conjoint}",nombreEnfants_scolarise="${nombreEnfants_scolarise}",prenom_pere="${prenom_pere}",
        nom_mere="${nom_mere}",prenom_mere="${prenom_mere}",mail="${mail}",telephone="${telephone}",salarie="${salarie}",
        mutuelle="${mutuelle}",groupage="${groupage}",compte="${compte}",intitule_compte="${intitule_compte}",
        code_banc="${code_banc}",intitule_banc="${intitule_banc}",code_agence="${code_agence}",date_piece_du="${date_piece_du}",
        date_piece_au="${date_piece_au}",passeport="${passeport}",date_passeport_du="${date_passeport_du}",date_passeport_au="${date_passeport_au}" WHERE rg_id='${id}'; `

        sql22 = `UPDATE ExProfessionnelle SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `
        sql3 = `UPDATE evocarriere SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `
        sql4 = `UPDATE formationpro SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `
        sql5 = `UPDATE RevSalairiale  SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `
        sql6 = `UPDATE mesures_disc SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `
        sql7 = `UPDATE assiduite SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `
        sql8 = `UPDATE gratification SET matricule='${matricule}' WHERE matricule='${select[1][0]['matricule']}'; `

        con.query(sql2 + sql22 + sql3 + sql4 + sql5 + sql6 + sql7 + sql8, (err, update) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong  !')
            }
            res.json({ msg: 'Successfully updated' })

        })


    })

})

//------------------------------update__2--------------------------------
router.post('/edit_2', (req, res) => {

    const { id } = req.body.id

    const { post, employer, debut, fin, contrat, num_contrat, date_depart,
        motif, date_reprise, decision, classe, qualification, salaire } = req.body.data

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE ExProfessionnelle SET post_oc="${post}",employer="${employer}",
    date_debut='${debut}',date_fin='${fin}', contrat="${contrat}",
    num_contrat="${num_contrat}",date_depart="${date_depart}",motif="${motif}",
    date_reprise="${date_reprise}",decision="${decision}",classe="${classe}",
    qualification="${qualification}",salaire="${salaire}" WHERE exp_id='${id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })


})

//------------------------------update__3--------------------------------
router.post('/edit_3', (req, res) => {

    const { id } = req.body.id

    const { post, structure, debut, fin, carriere,
        motif, decision, contrat, num_annee, classe, qualification, salaire } = req.body.data

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE evocarriere SET post_oc="${post}",structure="${structure}",
    date_debut='${debut}',date_fin='${fin}', carriere="${carriere}",
    motif="${motif}",decision="${decision}",contrat="${contrat}",
    num_annee="${num_annee}",classe="${classe}",qualification="${qualification}",
    salaire="${salaire}" WHERE evo_id='${id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })


})

//------------------------------update__4-------------------------------
router.post('/edit_4', (req, res) => {

    const { id } = req.body.id

    const { intitule, organisme, date, duree, titre } = req.body.data

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE formationpro SET intitule="${intitule}",organisme="${organisme}",
date='${date}',duree='${duree}',titre="${titre}" WHERE for_id='${id}' `
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })


})

//------------------------------update__5-------------------------------
router.post('/edit_5', (req, res) => {

    const { id } = req.body.id

    const { salaire_ini, salaire_reval, date, gain, motif, decision, primes } = req.body.data

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE RevSalairiale SET salaire_initial='${salaire_ini}',salaire_rev='${salaire_reval}',
date='${date}',gain="${gain}",motif="${motif}",decision="${decision}",primes="${primes}" WHERE rev_id='${id}' `
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })


})

//------------------------------update__6--------------------------------
router.post('/edit_6', (req, res) => {

    const { id } = req.body.id

    const { designation, auteur, date, griefs, degree, classification, salaire, duree, date_licen } = req.body.data

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE mesures_disc SET designation="${designation}",auteur="${auteur}",
     date='${date}',griefs="${griefs}", degree="${degree}",classification="${classification}",
     salaire="${salaire}",duree="${duree}",date_licen="${date_licen}" WHERE mes_id='${id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })



})

//------------------------------update__7--------------------------------
router.post('/edit_7', (req, res) => {

    const { id } = req.body.id

    const { absence_irr, date, date_fin, conge, absence_num } = req.body.data

    console.log(date)

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE assiduite SET  absence_irr='${absence_irr}',annee='${date}',
    date_fin='${date_fin}', conge='${conge}',absence_num='${absence_num}' WHERE ass_id='${id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })

})

//------------------------------update__8--------------------------------
router.post('/edit_8', (req, res) => {

    const { id } = req.body.id

    const { designation, nature, date, date_retour, duree, duree_rest } = req.body.data

    //check if there is a user with that matricule

    // update data into table
    sql2 = `UPDATE gratification SET designation="${designation}",nature="${nature}",
date='${date}', date_retour='${date_retour}', duree='${duree}', duree_rest='${duree_rest}' WHERE gra_id='${id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully updated' })
    })



})












module.exports = router