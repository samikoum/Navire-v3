const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');


// --------------------------------Update Profile-------------------------
router.post('/adminPassword/edit',async (req,res)=>{
  
    const {admin_id } = req.body
    const {password} = req.body.data
    
 //encrypt password
   const salt = await bcrypt.genSalt(10);
   hashedPassword = await bcrypt.hash(password, salt);

         try {
            sql2 = `UPDATE admins SET password='${hashedPassword}'  WHERE admin_id='${admin_id}'`
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










module.exports = router