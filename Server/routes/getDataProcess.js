const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()


// get employers with status='on'
router.get('/employes', (req, res) => {

    sql = "SELECT * from rgeneraux where status='on' "
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

// get employers with status='off'
router.get('/employes/trash', (req, res) => {

    sql = "SELECT * from rgeneraux where status='off' "
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

// get employer with matricule
router.get('/employe/:id', (req, res) => {

    id = req.params.id

    sql = `SELECT * from rgeneraux where matricule='${id}'; `
    sql2 = `SELECT * from exprofessionnelle where matricule='${id}'; `
    sql3 = `SELECT * from evocarriere where matricule='${id}'; `
    sql4 = `SELECT * from formationpro where matricule='${id}'; `
    sql5 = `SELECT * from revsalairiale where matricule='${id}'; `
    sql6 = `SELECT * from mesures_disc where matricule='${id}'; `
    sql7 = `SELECT * from assiduite where matricule='${id}'; `
    sql8 = `SELECT * from gratification where matricule='${id}'; `
    con.query(sql + sql2 + sql3 + sql4 + sql5 + sql6 + sql7 + sql8, (err, select) => {
        console.log(select[0].length)
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select[0].length <= 0) {
            return res.status(404).send('404 not found');
        }
        res.json({
            table1: select[0],
            table2: select[1],
            table3: select[2],
            table4: select[3],
            table5: select[4],
            table6: select[5],
            table7: select[6],
            table8: select[7]
        })

    })
})

// get employer with ID
router.get('/employeUp/:id', (req, res) => {

    id = req.params.id
    
    sql = `SELECT * from rgeneraux where rg_id='${id}'; `
    sql2 = `SELECT * from exprofessionnelle where exp_id='${id}'; `
    sql3 = `SELECT * from evocarriere where evo_id='${id}'; `
    sql4 = `SELECT * from formationpro where for_id='${id}'; `
    sql5 = `SELECT * from revsalairiale where rev_id='${id}'; `
    sql6 = `SELECT * from mesures_disc where mes_id='${id}'; `
    sql7 = `SELECT * from assiduite where ass_id='${id}'; `
    sql8 = `SELECT * from gratification where matricule='${id}'; `
    con.query(sql + sql2 + sql3 + sql4 + sql5 + sql6 + sql7 + sql8, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.json({
            table1: select[0], table2: select[1],
            table3: select[2], table4: select[3],
            table5: select[4], table6: select[5],
            table7: select[6]
        })

    })
})










module.exports = router