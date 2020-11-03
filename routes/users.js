var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.controller');
const checkJWT = require('../middlewares/check-jwt');
const deviceModel = require('../models/DeviceModel');
const accountModel = require('../models/LazadaAccountModel');
const userModel = require('../models/UserModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addAccount', async (req,res) =>{

  const idOwner = await userModel.findOne({username: req.body.owner});

  let newAccount = new accountModel();
  newAccount.account = req.body.account;
  newAccount.password = req.body.password;
  newAccount.phone = req.body.phone;
  newAccount.deviceName = req.body.deviceName;
  newAccount.owner = idOwner._id;

  newAccount.save();

  res.json({
      success:true,
      data:newAccount
  });
});

router.post('/addUser', async(req,res) =>{
  let newUser = new userModel();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.fullname= req.body.fullname;

  newUser.save();

  res.json({
    success:true,
    data:newUser
  });
});

router.get('/test',checkJWT,userController.getAllUser);
router.get('/create',userController.createAccount);
router.post('/Login',userController.LoginUser);

module.exports = router;
