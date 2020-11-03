const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
module.exports = function(req,res,next){
    let token = req.headers["authorization"];
    

    if (token){
        jwt.verify(token, process.env.SECRET,function(err,decoded){
            if (err){
                res.json({
                    success:false,
                    message:'Failed to authenticate token'
                });
            } else {
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        });
    } else{
        res.status(403).json({
            success:false,
            message:'No token provided'
        });
    }
};