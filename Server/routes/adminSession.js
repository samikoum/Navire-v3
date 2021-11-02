const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');


// --------------------------------Check Code----------------------------
router.post('/checkCode',async (req,res)=>{
  
    const { admin_id } = req.body
    const { w } = req.body
    const { password } = req.body.data

         try {
            sql2 = `SELECT * FROM admins WHERE admin_id='${admin_id}'`
            con.query(sql2, (err, select) => {
                if (err)  return res.status(402).send('Something went wrong !') 
                if(select[0].role !== w) return res.status(403).send('Code Invalid')
                if(select[0].code !== password) return res.status(403).send('Code Invalid')
                res.status(200).send(select[0].role)
            })
        } catch (err) {
            res.status(402).send('Something is wrong try again !');
        }
   
})



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

// --------------------------------Dashboard-------------------------
router.get('/dashboard', (req, res) => {

    sql1 = "SELECT COUNT(*) as countA from rgeneraux where region='Erenav Alger' AND status='on'; "
    sql2 = "SELECT COUNT(*) as countO from rgeneraux where region='Erenav Oran' AND status='on'; "
    sql3 = "SELECT COUNT(*) as countB from rgeneraux where region='Erenav Bejaia' AND status='on'; "
    con.query(sql1+sql2+sql3, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).send('Something went wrong !')
        }
        // console.log(data)
        res.send(data)
    })
})

router.get('/test',(req,res)=>{ 
// const data = [
//     { name: '2015', fv: 50, iv: 10, tv: 400 },
//     { name: '2016', fv: 70, iv: 20, tv: 90 },
//     { name: '2017', fv: 100, iv: 40, tv: 50 },
//     { name: '2018', fv: 150, iv: 70, tv: 10 },
//     { name: '2019', fv: 200, iv: 100, tv: 1 },
// ]
// const data__1 = [
//     { count: 2, region: 'Alger', year: 2019 },
//     { count: 3, region: 'Alger', year: 2021 },
//     { count: 2, region: 'Bejaia', year: 2021 },
//     { count: 1, region: 'Oran', year: 2020 },
//     { count: 4, region: 'Oran', year: 2021 },

// ]

sql = `SELECT COUNT(*) as total, YEAR(date_naissance) as year,
sum(case when region = 'Erenav Alger' then 1 else 0 end) AS countA,
sum(case when region = 'Erenav Bejaia' then 1 else 0 end) AS countB,
sum(case when region = 'Erenav Oran' then 1 else 0 end) AS countO
FROM rgeneraux 
where  YEAR(date_naissance) >= (SELECT MAX(YEAR(date_naissance)) from rgeneraux)-10
GROUP BY YEAR(date_naissance) ; `

sql2 = `SELECT COUNT(*) as count, region  FROM rgeneraux
GROUP BY  region `
con.query(sql+sql2,(err,data)=>{
    if(err){
        console.log(err)
        return res.status(400).send('Something went wrong !')
    }
    console.log(data)
    res.send(data)
})

})














module.exports = router