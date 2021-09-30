const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()


// --------------------------------Update Profile-------------------------
router.post('/profile/edit',async (req,res)=>{
  
    const {emp_id ,nom,prenom,password} = req.body

    if( emp_id !== req.user.id  ) return res.status(403).send('Access Denied')
         
 //encrypt password
   const salt = await bcrypt.genSalt(10);
   hashedPassword = await bcrypt.hash(password, salt);

         try {
            sql2 = `UPDATE users SET nom='${nom}',prenom='${prenom}' , password='${hashedPassword}'  WHERE emp_id='${emp_id}'`
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

// --------------------------------Documents-------------------------
router.post('/documents/user',(req,res)=>{

    const { emp_id, matricule } = req.body
 
    if( (emp_id !== req.user.id) || (matricule !== req.user.matricule) ) return res.status(403).send('Access Denied')

    sql = `SELECT * from  users u RIGHT JOIN documents d ON u.emp_id=d.reciver 
    WHERE (d.reciver='0') OR (d.reciver='${emp_id}')  ORDER BY d.doc_id DESC`
    con.query(sql,(err,data)=>{
        if(err) {
          console.log(err)
          return res.status(400).send('Something went wrong !')
        } 
        res.send(data)
      })
})

router.post('/download/:doc_name', function(req, res){
    const { doc_id } = req.body
    const { emp_id, matricule } = req.body

    if( (emp_id !== req.user.id) || (matricule !== req.user.matricule) ) return res.status(403).send('Access Denied')

    const doc_name = req.params.doc_name
    const file = `./uploads/${doc_name}`;
    sql = sql = `UPDATE documents SET status='vu' WHERE doc_id='${doc_id}'`
    con.query(sql)
    res.download(file); // Set disposition and send it.
  });

// --------------------------------Reclamation-------------------------
router.post('/reclamation',(req,res)=>{

    const { emp_id, matricule } = req.body
    const {title,description} = req.body.data

    if( (emp_id !== req.user.id) || (matricule !== req.user.matricule) ) return res.status(403).send('Access Denied')

    sql = `SELECT * from users where emp_id='${emp_id}'`
    con.query(sql, (err, select) => {

        if (err) return res.status(400).send('Something went wrong !')

        try {
            sql2 = `INSERT into reclamation (sender, title, description, added_on) VALUES ('${select[0].emp_id}', "${title}","${description}",now())`
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




module.exports = router