const mysql = require('mysql');

// --------------dbconnect-----------------
// function verifyConnection(req,res,next) {
  
  con = mysql.createPool({
    host: "localhost",
    database: 'navire',
    user: "root",
    password: "",
    multipleStatements: true
  });
  con.getConnection(function(err) {
    if(!err) {
      console.log("Connected!");
    }
    else {
        console.log("Connection failed")
    }
  })

// }    
  //-------------end-----------------------


  // module.exports = verifyConnection