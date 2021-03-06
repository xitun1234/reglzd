var express = require('express');
const router = express.Router();
const scriptModel = require('../../models/ScriptModel');

router.use((req, res, next) => {
  if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
  next();
});

router.get('/', async function (req, res) {
  const listScript = await scriptModel.find({owner:req.owner}).exec((err, result) => {
    console.log(listScript);
    res.render('remote/addScript', {
      userData: req.user,
      RemoteSlideBarActive: true,
      active: {
        addScript: true,
      },
      listScript: result,
    });
  });
});

router.post('/addKichBan', async function (req, res) {
  let newScript = new scriptModel();

  newScript.scriptName = req.body.scriptName;
  newScript.duongDan = req.body.duongDan;
  newScript.scriptType = req.body.scriptType;
  newScript.owner = req.owner;
  console.log(newScript);

  newScript.save().then((result) => {
    res.status(200).json({
      success: true,
      data: result,
      msg: 'Thêm ' + newScript.scriptName + ' thành công',
    });
  });
});

router.post('/deleteKichBan', async (req, res) => {
    //const test = await scriptModel.find({_id:"610fbe1a7816f0d7f473c87e"});
    console.log(req.body.scriptID)
    //console.log(test)
    
    const result = await scriptModel.deleteOne({owner:req.owner,_id: req.body.scriptID});


    res.status(200).json({
      success: true,
      msg: 'Da xoa toan bo du lieu',
      data: result,
    });
  });

module.exports = router;
