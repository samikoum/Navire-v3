const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()



// get Accounts employers 
router.get('/users', (req, res) => {

    sql = "SELECT * from users ORDER BY emp_id DESC "
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

router.get('/users/:id', (req, res) => {

    id = req.params.id

    sql = `SELECT * from users WHERE emp_id=${id}`
    con.query(sql, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(select)
    })
})

// get Notifications 
router.get('/reclamations/notifications/count',(req,res)=>{
    // sql = "SELECT matricule from users u, reclamation r WHERE  r.status='' AND u.emp_id=r.sender ORDER BY r.rec_id DESC; "
    sql = "SELECT matricule, status from users u, reclamation r WHERE u.emp_id=r.sender ORDER BY r.rec_id DESC LIMIT 10; "
    sql2 ="SELECT COUNT(*) as count from reclamation WHERE status='' "
    con.query(sql+sql2, (err, rows) => {
        // console.log(rows[0])  
        res.send(rows)
    })
})


// --------------------------------Documents---------------------------
// get Documents
router.get('/documents', (req, res) => {
   
    sql = "SELECT * from users u RIGHT JOIN  documents d  ON u.emp_id=d.reciver  ORDER BY d.doc_id DESC"
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

router.post('/admin/download/:doc_name', function (req, res) {

    const doc_name = req.params.doc_name
    const file = `./uploads/${doc_name}`;
    res.download(file); // Set disposition and send it.

});

// Delete Documents
router.post('/documents/delete', (req, res) => {

    const { doc_id } = req.body

    sql = `DELETE FROM documents  WHERE doc_id='${doc_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})

// --------------------------------Reclamation-------------------------
// get Reclamations
router.get('/reclamations', (req, res) => {

    sql = "SELECT *, SubString(description, 1, 70) AS description from users u, reclamation r WHERE u.emp_id=r.sender   ORDER BY r.rec_id DESC"
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

router.get('/reclamations/:id', (req, res) => {

    id = req.params.id

    sql2 = `SELECT * from users u, reclamation r WHERE rec_id=${id} AND u.emp_id=r.sender`
    con.query(sql2, (err, select) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        if (select.length <= 0) {
            return res.status(404).send('404 not found');
        }
        res.send(select)
    })
})

// Vu Reclamations
router.post('/reclamations/update', (req, res) => {

    const { rec_id } = req.body

    sql = `UPDATE reclamation SET status='vu' WHERE rec_id='${rec_id}'`
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        res.send(data)
    })
})

// Delete Reclamations 
router.post('/reclamations/delete', (req, res) => {

    const { rec_id } = req.body

    // update data into table
    sql = `DELETE FROM reclamation  WHERE rec_id='${rec_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})


//-------------------------------Accounts---------------------------------
// insert User Account
router.post('/insert', (req, res) => {

    const { matricule, password } = req.body

    //check if there is a user with that email
    sql = `SELECT * from users where matricule='${matricule}'`
    con.query(sql, async (err, select) => {
        if (err) return res.status(400).send('Something went wrong !')
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists');
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);

        //save user to DB we must use try and catch
        try {
            sql2 = `INSERT into users (matricule,password,confirmpassword,added_on) VALUES ('${matricule}','${hashedPassword}','${hashedPassword}',now())`
            con.query(sql2, (err, insert) => {
                if (err) {
                    console.log(err)
                    return res.status(402).send('Something went wrong !')
                }
                res.send('Successfully added !')
            })
        } catch (err) {
            res.status(402).send('Something is wrong try again !');
        }

    })
})

// Edit User Account
router.post('/edit', (req, res) => {

    const { emp_id, matricule } = req.body

    //check if there is a user with that email
    sql = `SELECT * from users where matricule='${matricule}'`
    con.query(sql, (err, select) => {
        if (err) return res.status(400).send('Something went wrong !')
        if (select.length > 0) {
            return res.status(401).send('Matricule Already Exists');
        }

        //save user to DB we must use try and catch
        try {
            sql2 = `UPDATE users SET matricule='${matricule}' WHERE emp_id='${emp_id}'`
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
})

// Delete User Account
router.post('/del', (req, res) => {

    const { emp_id } = req.body

    // update data into table
    sql = `DELETE FROM users  WHERE emp_id='${emp_id}'`
    con.query(sql, (err, del) => {
        if (err) {
            console.log(err)
            return res.status(402).send('Something went wrong !')
        }
        res.send('Successfully Deleted !')
    })

})





module.exports = router