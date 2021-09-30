const express = require("express");
const router = express.Router()
const fileupload = require("express-fileupload");
require('dotenv').config()

    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

  
// const data = [{id:2,name:'khaled'},{id:5,name:'bilal'}];

// const result = data.filter(x => x.id !== 2);


// router.post('/test',(req,res)=>{
//     const {user} = req.body 
//     if(localStorage.getItem('users')!==null) {
//       console.log('keyen')
//       const users = JSON.parse(localStorage.getItem('users')) 
//       users.push(user)
//       localStorage.setItem('users',JSON.stringify(users))
//     }else {
//       console.log('makansh')
//       const users = []
//       users.push(user)
//       localStorage.setItem('users',JSON.stringify(users))
//     }
//    console.log(localStorage.getItem('users'))
//     res.send('hey test...')
// })




router.post("/documents/upload", (req, res) => {

    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    const  { matricule, subject, description} = req.body
    const file = req.files.file;
    const filename = file.name;
 
    file.mv('./uploads/'+filename, (err) => {
      if (err) {
        return res.status(500).send( "File upload failed");
      }

       //check if there is a user with that email
      sql = `SELECT * from users where matricule='${matricule}'`
      con.query(sql, (err, select) => {
      if (err) return res.status(400).send('Something went wrong !')

      if ( (select.length <= 0) && (matricule !== '222') ) {
              return res.status(401).send('Matricule doesn\'t Exists');
      }
      
      try {
        if(matricule == '222') { 
          sql2 = `INSERT into documents (reciver, subject, description, name, added_on) VALUES ('0', "${subject}",N"${description}", "${filename}", now())`
        }else {
          sql2 = `INSERT into documents (reciver, subject, description, name, added_on) VALUES ('${select[0].emp_id}', "${subject}","${description}", "${filename}", now())`
        }  
  
        con.query(sql2, (err, insert) => {
            if (err) {
                console.log(err)
                return res.status(402).send('Something went wrong !')
            }
            res.status(200).send("File Uploaded");
        })
      } catch (err) {
        res.status(402).send('Something is wrong try again !');
      }

    })
    
    });
  });


  module.exports = router