const express = require('express')
const router = express.Router()
// const fastcsv = require("fast-csv");
// const fs = require("fs");

// const ws = fs.createWriteStream("./csv/parce.csv");


router.post('/csv',(req,res)=>{
    sql = `SELECT emp_id, nom, prenom from users `
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
            res.status(200).send(data)
//         fastcsv
//           .write(data, { headers: true })
//           .on("finish", function() {
//            console.log("Write to test.csv successfully!");
//           })
//           .pipe(ws);
//           
    })
})



module.exports = router