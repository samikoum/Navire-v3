const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()



//------------------------------Suspend emp--------------------------------
router.post('/suspend', (req, res) => {

    const { emp_id } = req.body

    // update data into table
    sql2 = `UPDATE rgeneraux SET status='off' WHERE rg_id='${emp_id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully Deleted !' })
    })

})

router.post('/restore', (req, res) => {

    const { id } = req.body

    // update data into table
    sql2 = `UPDATE rgeneraux SET status='on' WHERE rg_id='${id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully Restored !' })
    })

})

router.post('/delete', (req, res) => {

    const { emp_id } = req.body
    console.log(emp_id)

    // Delete all data from table
    sql2 = `DELETE rgeneraux  FROM  WHERE rg_id='${emp_id}'`
    con.query(sql2, (err, update) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.json({ msg: 'Successfully Deleted !' })
    })

})

//------------------------------Delete from tables--------------------------------
router.post('/table2/delete', (req, res) => {

    const { matricule, rec_id } = req.body

    sql = `SELECT COUNT(*) as count from exprofessionnelle where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        console.log(select[0].count)
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        // if (select[0].count <= 1) {
        //     return res.status(400).send('Can not delete it')
        // } else {
        // update data into table
        sql = `DELETE FROM exprofessionnelle  WHERE exp_id='${rec_id}'`
        con.query(sql, (err, del) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.send('Successfully Deleted !')
        })

        // }
    })


})

router.post('/table3/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM evocarriere  WHERE evo_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})

router.post('/table4/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM formationpro  WHERE for_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})

router.post('/table5/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM revsalairiale  WHERE rev_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})

router.post('/table6/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM mesures_disc  WHERE mes_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})

// Delete Assiduité 
router.post('/table7/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM assiduite  WHERE ass_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})

router.post('/table8/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM gratification  WHERE gra_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})


module.exports = router