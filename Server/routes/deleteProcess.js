const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
require('dotenv').config()



//------------------------------update__2--------------------------------
router.post('/suspend',(req,res)=>{
    const {emp_id} = req.body
// update data into table
sql2 =`UPDATE rgeneraux SET status='off' WHERE rg_id='${emp_id}'`
  con.query(sql2,(err,update)=>{
     if (err) {
      console.log(err)
      return res.status(402).send('Something went wrong !')
        }
        res.json({msg:'Successfully Deleted !'})
 })
 
})

router.post('/restore',(req,res)=>{
  const {id} = req.body
// update data into table
sql2 =`UPDATE rgeneraux SET status='on' WHERE rg_id='${id}'`
con.query(sql2,(err,update)=>{
   if (err) {
    console.log(err)
    return res.status(402).send('Something went wrong !')
      }
      res.json({msg:'Successfully Restored !'})
})

})

router.post('/delete',(req,res)=>{
  const {emp_id} = req.body
// update data into table
sql2 =`DELETE rgeneraux  FROM  WHERE rg_id='${emp_id}'`
con.query(sql2,(err,update)=>{
   if (err) {
    console.log(err)
    return res.status(402).send('Something went wrong !')
      }
      res.json({msg:'Successfully Deleted !'})
})

})


module.exports = router