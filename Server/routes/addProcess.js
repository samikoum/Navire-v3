const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()



//------------------------------add__1--------------------------------
router.post('/add_1', (req, res) => {

    const { matricule, prenom, nom, address, situation,
        nombreEnfants, ascendant, dateNaissance,
        dateRecrutement, structure, region, diplome, specialite } = req.body

    //check if there is a user with that matricule
    sql = `SELECT * from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into rgeneraux (matricule,prenom,nom,address,s_famille,n_enfants,ascendant,date_naissance,date_recrutement,structure,region,diplome,specialite,status) 
     VALUES ('${matricule}','${prenom}', '${nom}',"${address}",'${situation}','${nombreEnfants}','${ascendant}','${dateNaissance}','${dateRecrutement}',"${structure}",'${region}',"${diplome}","${specialite}",'on')`

        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 2 })
        })

    })


})

//-------------------------------add__2---------------------------------
router.post('/add_2', (req, res) => {

    const { matricule } = req.body
    const { post, employer, debut, fin } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from exprofessionnelle where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into exprofessionnelle (matricule,post_oc,employer,date_debut,date_fin) VALUES ('${matricule}','${post}','${employer}','${debut}','${fin}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 3 })
        })


    })

})

//-------------------------------add__3---------------------------------
router.post('/add_3', (req, res) => {

    const { matricule } = req.body
    const { post, structure, debut, fin } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from evocarriere where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into evocarriere (matricule,post_oc,structure,date_debut,date_fin) VALUES ('${matricule}','${post}','${structure}','${debut}','${fin}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 4 })
        })


    })

})

//-------------------------------add__4---------------------------------
router.post('/add_4', (req, res) => {

    const { matricule } = req.body
    const { intitule, organisme, date, duree, titre } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from formationpro where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into formationpro (matricule,intitule,organisme,date,duree,titre) VALUES ('${matricule}','${intitule}','${organisme}','${date}','${duree}','${titre}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 5 })
        })


    })

})

//-------------------------------add__5---------------------------------
router.post('/add_5', (req, res) => {

    const { matricule } = req.body
    const { salaire_ini, salaire_reval, date, gain, motif } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from RevSalairiale where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into RevSalairiale (matricule,salaire_initial,salaire_rev,date,gain,motif) VALUES ('${matricule}','${salaire_ini}','${salaire_reval}','${date}','${gain}','${motif}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 6 })
        })


    })

})

//-------------------------------add__6---------------------------------
router.post('/add_6', (req, res) => {

    const { matricule } = req.body
    const { designation, auteur, date, griefs } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from mesures_disc where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into mesures_disc (matricule,designation,auteur,date,griefs) VALUES ('${matricule}','${designation}','${auteur}','${date}','${griefs}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 7 })
        })


    })

})

//-------------------------------add__7---------------------------------
router.post('/add_7', (req, res) => {

    const { matricule } = req.body
    const { absence_irr, absence_aut, date, conge } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from assiduite where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }

        // insert data into table
        sql2 = `INSERT into assiduite (matricule,absence_irr,absence_aut,annee,conge) VALUES ('${matricule}','${absence_irr}','${absence_aut}','${date}','${conge}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 8 })
        })


    })

})

//-------------------------------add__8---------------------------------
router.post('/add_8', (req, res) => {

    const { matricule } = req.body
    const { designation, nature, date, duree } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT * from gratification where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists')
        }
        
        // insert data into table
        sql2 = `INSERT into gratification (matricule,designation,nature,date,duree) VALUES ('${matricule}','${designation}','${nature}','${date}','${duree}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.json({ msg: 'Successfully added', x: 9 })
        })


    })

})






module.exports = router