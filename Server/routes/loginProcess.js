const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//-----------------------Admin Process---------------------------------- 
// admin login
router.post('/login', (req, res) => {

    const { email, password } = req.body

    //check if there is a user with that email
    sql = `SELECT * from admins where email='${email}'`
    con.query(sql, async (err, select) => {
        if (err) return res.status(400).send('Something went wrong !')
        if (select.length <= 0) {
            return res.status(401).send('Email doesn\'t Exists');
        }

        //compare password
        const validpassword = await bcrypt.compare(password, select[0].password);
        if (!validpassword) {
            return res.status(401).send('Invalid Password');
        }

        //give a token to our user
        const token = jwt.sign({ id: select[0].id }, process.env.SECRET_TOKEN)
        res.json({
            admin: {
                token: token,
                admin_id: select[0].admin_id,
                nom: select[0].nom,
                prenom: select[0].prenom,
                email: select[0].email
            },
            auth: true
        })
    })
})

// update admin profile
router.post('/adminProfile/edit', async (req, res) => {

    const { admin_id, nom, prenom, email } = req.body

    try {
        sql2 = `UPDATE admins SET nom='${nom}',prenom='${prenom}' , email='${email}'  WHERE admin_id='${admin_id}'`
        con.query(sql2, (err, update) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.send('Successfully Updated !')
        })
    } catch (err) {
        res.status(402).send('Something is wrong try again !');
    }

})

// user login
router.post('/user/login', (req, res) => {

    const { matricule, password } = req.body
    
    //check if there is a user with that email
    sql = `SELECT * from users where matricule='${matricule}'`
    con.query(sql, async (err, select) => {
        if (err) return res.status(400).send('Something went wrong !')
        if (select.length <= 0) {
            return res.status(401).send('Matricule doesn\'t Exists');
        }

        //compare password
        const validpassword = await bcrypt.compare(password, select[0].password);
        if (!validpassword) {
            return res.status(401).send('Invalid Password');
        }

        //give a token to our user
        const token = jwt.sign({
            id: select[0].emp_id,
            matricule: select[0].matricule
        },
            process.env.SECRET_TOKEN)

        res.json({
            user: {
                token: token,
                user_id: select[0].emp_id,
                nom: select[0].nom,
                prenom: select[0].prenom,
                matricule: select[0].matricule
            },
            auth: true
        })
    })
})





module.exports = router