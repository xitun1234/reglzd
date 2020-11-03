const userModel = require('../models/UserModel');
const deviceModel = require('../models/DeviceModel');
const accountModel = require('../models/LazadaAccountModel');
const checkJWT = require('../middlewares/check-jwt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req,res,next) =>{
    // 1)Getting the token and check of it's there
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return next(new AppError('You are not logged in! Please log in to get access'),401)
    }
    // 2) Verification token

    const decoded = await promisify(jwt.verify(token,process.env.SECRET));

    // 3)Check if user still exists
    const freshUser = await userModel.findById(decoded._id);
    if(!freshUser){
        return next(new AppError('The token belonging to this user does no'));
    }

    req.user = freshUser;
    next();
});