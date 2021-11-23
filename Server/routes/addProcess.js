const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()



//------------------------------add__1--------------------------------
router.post('/add_1', (req, res) => {

    const { matricule, prenom, nom, address, situation,
        nombreEnfants, ascendant, dateNaissance,
        dateRecrutement, structure, region, diplome, specialite,
        sexe, nationalite, piece, piece_security,
        mariage, nom_fille, nom_conjoint, prenom_conjoint, dateNaissance_conjoint,
        nombreEnfants_scolarise, prenom_pere, nom_mere, prenom_mere, mail, telephone,
        salarie, mutuelle, groupage, compte, intitule_compte, code_banc, intitule_banc,
        code_agence, date_piece_du, date_piece_au, passeport, date_passeport_du, date_passeport_au } = req.body

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
        sql2 = `INSERT into rgeneraux (matricule,prenom,nom,address,s_famille,n_enfants,ascendant,
        date_naissance,date_recrutement,structure,region,diplome,specialite,sexe,nationalite,piece,piece_security,
        mariage, nom_fille, nom_conjoint, prenom_conjoint, dateNaissance_conjoint,
        nombreEnfants_scolarise, prenom_pere, nom_mere, prenom_mere, mail, telephone,
        salarie, mutuelle, groupage, compte, intitule_compte, code_banc, intitule_banc,
        code_agence, date_piece_du, date_piece_au, passeport, date_passeport_du, date_passeport_au, etat,status) 
        VALUES ('${matricule}',"${prenom}", "${nom}","${address}",'${situation}','${nombreEnfants}',
        "${ascendant}",'${dateNaissance}','${dateRecrutement}',"${structure}",
        '${region}',"${diplome}","${specialite}","${sexe}" ,"${nationalite}" ,
        "${piece}","${piece_security}",
        "${mariage}","${nom_fille}","${nom_conjoint}","${prenom_conjoint}","${dateNaissance_conjoint}","${nombreEnfants_scolarise}",
        "${prenom_pere}","${nom_mere}","${prenom_mere}","${mail}","${telephone}","${salarie}","${mutuelle}","${groupage}",
        "${compte}","${intitule_compte}","${code_banc}","${intitule_banc}","${code_agence}","${date_piece_du}","${date_piece_au}",
        "${passeport}","${date_passeport_du}","${date_passeport_au}",'2','on')`

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
    const { post, employer, debut, fin, contrat, num_contrat, date_depart,
        motif, date_reprise, decision, classe, qualification, salaire } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }

        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into exprofessionnelle (matricule,post_oc,employer,date_debut,date_fin,contrat, num_contrat, date_depart,
        motif, date_reprise, decision, classe, qualification, salaire) VALUES ('${matricule}',"${post}","${employer}",'${debut}','${fin}',"${contrat}",
        "${num_contrat}","${date_depart}","${motif}","${date_reprise}","${decision}","${classe}","${qualification}","${salaire}")`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 2) {
                sql3 = `UPDATE rgeneraux SET etat='3' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 3 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }

        })

    })

})

//-------------------------------add__3---------------------------------
router.post('/add_3', (req, res) => {

    const { matricule } = req.body
    const { post, structure, debut, fin, carriere,
        motif, decision, contrat, num_annee, classe, qualification, salaire } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }

        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into evocarriere (matricule,post_oc,structure,date_debut,date_fin,carriere,
        motif, decision, contrat, num_annee, classe, qualification, salaire) VALUES ('${matricule}',"${post}","${structure}",'${debut}','${fin}',"${carriere}",
        "${motif}","${decision}","${contrat}","${num_annee}","${classe}","${qualification}","${salaire}")`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 3) {
                sql3 = `UPDATE rgeneraux SET etat='4' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 4 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }

        })

    })

})

//-------------------------------add__4---------------------------------
router.post('/add_4', (req, res) => {

    const { matricule } = req.body
    const { intitule, organisme, date, date_fin, duree, titre } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into formationpro (matricule,intitule,organisme,date,date_fin,duree,titre) 
        VALUES ('${matricule}',"${intitule}","${organisme}",'${date}','${date_fin}','${duree}',"${titre}")`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 4) {
                sql3 = `UPDATE rgeneraux SET etat='5' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 5 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }
        })

    })

})

//-------------------------------add__5---------------------------------
router.post('/add_5', (req, res) => {

    const { matricule } = req.body
    const { salaire_ini, salaire_reval, date, gain, motif, decision, primes } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }

        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into RevSalairiale (matricule,salaire_initial,salaire_rev,date,gain,motif,decision, primes) VALUES ('${matricule}','${salaire_ini}','${salaire_reval}','${date}',"${gain}","${motif}",
            "${decision}","${primes}")`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 5) {
                sql3 = `UPDATE rgeneraux SET etat='6' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 6 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }
        })

    })

})

//-------------------------------add__6---------------------------------
router.post('/add_6', (req, res) => {
    console.log(req.body)
    const { matricule, designation, auteur, date, griefs, degree, classification, salaire, duree, date_licen } = req.body
    if (req.files) {
        console.log('rani hna')
        const file = req.files.file;
        var filename = file.name;
        file.mv('./displinaire/' + filename, (err) => {
            if (err) {
                return res.status(500).send("File upload failed");
            }
        })
    }
    console.log('manish hna')
    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }

        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into mesures_disc (matricule,designation,auteur,date,griefs,degree,name,
        classification, salaire, duree, date_licen) VALUES ('${matricule}',"${designation}","${auteur}",
        '${date}',"${griefs}","${degree}","${filename}","${classification}","${salaire}","${duree}","${date_licen}")`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 6) {
                sql3 = `UPDATE rgeneraux SET etat='7' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 7 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }
        })

    })

})

//-------------------------------add__7---------------------------------
router.post('/add_7', (req, res) => {

    const { matricule } = req.body
    const { absence_irr, absence_num, date, date_fin, conge } = req.body.data

    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }

        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into assiduite (matricule,absence_irr, absence_num,annee,date_fin,conge) 
        VALUES ('${matricule}','${absence_irr}','${absence_num}','${date}','${date_fin}','${conge}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 7) {
                sql3 = `UPDATE rgeneraux SET etat='8' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 8 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }
        })

    })

})

//-------------------------------add__8---------------------------------
router.post('/add_8', (req, res) => {

    const { matricule } = req.body
    const { designation, nature, date, date_retour, duree, duree_rest } = req.body.data
    console.log(matricule)

    //check if there is a user with that matricule
    sql = `SELECT etat from rgeneraux where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }

        // return res.status(401).send('Matricule Already Exists')
        sql2 = `INSERT into gratification (matricule,designation,nature,date,date_retour,duree,duree_rest) 
            VALUES ('${matricule}',"${designation}","${nature}",'${date}','${date_retour}','${duree}','${duree_rest}')`
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            if (select[0].etat == 8) {
                sql3 = `UPDATE rgeneraux SET etat='9' WHERE matricule='${matricule}' `
                con.query(sql3, (err, update) => {
                    if (err) {
                        console.log(err)
                        return res.status(402).send('Something went wrong !')
                    }
                })
                res.json({ msg: 'Successfully added', x: 9 })
            } else {
                res.json({ msg: 'Successfully added', x: select[0].etat })
            }
        })

    })

})






module.exports = router