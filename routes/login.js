const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    console.log(req.body);
    res.render('login',{
        title:'AAAA',
        layout:false
    });
});


module.exports = router;