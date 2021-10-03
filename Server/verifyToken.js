const jwt = require('jsonwebtoken')

function verifyToken(req,res,next) {
    const token = req.headers['authorization']
    if(token !=='null') {
     jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
         if(err) return res.status(403).send('Access Denied 1')
         req.user = user
         next()
     })
    }else {
        res.status(403).send('Access Denied 2')
    }
  }


module.exports = verifyToken