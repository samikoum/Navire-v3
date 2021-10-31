const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()


// get employers Alger with status='on'
router.get('/employes/alger', (req, res) => {

    sql = "SELECT * from rgeneraux where status='on' AND region='Erenav Alger' ORDER BY rg_id DESC "
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

// get employers Oran with status='on'
router.get('/employes/oran', (req, res) => {

    sql = "SELECT * from rgeneraux where status='on' AND region='Erenav Oran' ORDER BY rg_id DESC "
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

// get employers Oran with status='on'
router.get('/employes/bejaia', (req, res) => {

    sql = "SELECT * from rgeneraux where status='on' AND region='Erenav Bejaia' ORDER BY rg_id DESC "
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})



module.exports = router