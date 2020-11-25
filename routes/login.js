const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    
    res.render('login',{
        title:'AAAA',
        layout:false,
        loginMsg: req.flash('loginMsg'),
        usernameDefault: req.flash('usernameDefault'),
    });
});


module.exports = router;