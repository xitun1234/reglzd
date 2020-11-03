const userModel = require('../models/UserModel');
const deviceModel = require('../models/DeviceModel');
const accountModel = require('../models/LazadaAccountModel');
const checkJWT = require('../middlewares/check-jwt');
const jwt = require('jsonwebtoken');

exports.getAllUser = async(req,res) =>{
    res.send(req.decoded.user);
    // const user = await userModel.find();
    // res.send(user);
};

exports.createAccount = async(req,res) =>{
    // const dataAccount = {
    //     username: 'test',
    //     password: 'N7h9a#2020',
    //     phone: 'test',
    //     device:'5f9eefff93afaa57c7566e22',
    //     owner: '5f9ef3cc0e96fe58a0459f71'
    // };

    // const newAccount = await accountModel.create(dataAccount);
    // newAccount.save().then(result =>{
    //     res.status(200).json({
    //         status:'success',
    //         message:'Added success',
    //         data:result
    //     });
    // });
    // const dataDevice = await deviceModel.find({deviceName: 'device 1'}).populate('owner','username').exec((err,result)=>{
    //     console.log(result);
    // });

    // const accounts = await accountModel.find({}).populate({path:'owner',match:{username:'nghia'}}).populate('device','deviceName').exec((err,result)=>{
    //     console.log(result);
    // })
    console.log(process.env.SECRET)
    res.send('a');
};

exports.LoginUser = async(req,res,next)=>{
    const {username, password} = req.body;
    
    userModel.findOne({username: username}, (err,user) =>{
        if (err) throw err;

        if (!user){
            res.json({
                success:false,
                message:'Authentication failed, User not found'
            });
        } else if (user){
            var validPassword = user.comparePassword(password);

            if (!validPassword){
                res.json({
                    success:false,
                    message:'Authentication failed, Password wrong'
                })
            }else{
                var token = jwt.sign({
                    user:user,
                },process.env.SECRET,{
                    expiresIn:'1d'
                });

                res.json({
                    success:true,
                    message:'Enjoy your token',
                    token:token
                });
          
            }
        }
    });
    // 1)Check username exists

    // 2)Check password correct when username exists

    // if everything is ok, send token to client
};
