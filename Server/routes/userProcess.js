const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()


// get Accounts employers 
router.get('/users',(req,res)=>{
    sql = "SELECT * from users "
    con.query(sql,(err,data)=>{
      if(err) {
        console.log(err)
        return res.status(400).send('Something went wrong !')
      } 
      res.send(data)
    })
  })

router.get('/users/:id',(req,res)=>{
    id = req.params.id
    sql = `SELECT * from users WHERE emp_id=${id}`
    con.query(sql,(err,select)=>{
        if(err) {
          console.log(err)
          return res.status(400).send('Something went wrong !')
        } 
      res.send(select)
      })
})

// --------------------------------Documents-------------------------


// --------------------------------Reclamation-------------------------
// get Reclamations
router.get('/reclamations',(req,res)=>{
    sql = "SELECT *, SubString(description, 1, 100) AS description from users u, reclamation r WHERE u.emp_id=r.sender   ORDER BY r.rec_id DESC"
    con.query(sql,(err,data)=>{
      if(err) {
        console.log(err)
        return res.status(400).send('Something went wrong !')
      } 
      res.send(data)
    })
  })

  router.get('/reclamations/:id',(req,res)=>{
    id = req.params.id
  
    sql2 = `SELECT * from users u, reclamation r WHERE rec_id=${id} AND u.emp_id=r.sender`
    con.query(sql2,(err,select)=>{
        if(err) {
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
router.post('/reclamations/update',(req,res)=>{

    const {rec_id} = req.body
    console.log(req.body)
    console.log(rec_id)
    sql = `UPDATE reclamation SET status='vu' WHERE rec_id='${rec_id}'`
    con.query(sql,(err,data)=>{
      if(err) {
        console.log(err)
        return res.status(400).send('Something went wrong !')
      } 
      res.send(data)
    })
  })

  router.post('/reclamations/delete',(req,res)=>{
    const {rec_id} = req.body
// update data into table
sql =`DELETE FROM reclamation  WHERE rec_id='${rec_id}'`
con.query(sql,(err,del)=>{
   if (err) {
    console.log(err)
    return res.status(402).send('Something went wrong !')
      }
      res.send('Successfully Deleted !')
})

})


//-------------------------------Insert User---------------------------------
router.post('/insert',(req,res)=>{

    const {matricule,password} = req.body
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

//-------------------------------edit User---------------------------------
router.post('/edit',(req,res)=>{
  
    const {emp_id, matricule} = req.body
  //check if there is a user with that email
  sql = `SELECT * from users where matricule='${matricule}'`
  con.query(sql,(err, select) => {
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

// -----------------------------------Del User---------------------------
router.post('/del',(req,res)=>{
    const {emp_id} = req.body
// update data into table
sql =`DELETE FROM users  WHERE emp_id='${emp_id}'`
con.query(sql,(err,del)=>{
   if (err) {
    console.log(err)
    return res.status(402).send('Something went wrong !')
      }
      res.send('Successfully Deleted !')
})

})





module.exports = router