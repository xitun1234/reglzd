var express = require('express');
const router = express.Router();
const scriptModel = require('../../models/ScriptModel');

router.get('/', async function (req, res) {
  const listScript = await scriptModel.find().exec((err, result) => {
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
    const result = await scriptModel.deleteMany();
  
  
    res.status(200).json({
      success: true,
      msg: 'Da xoa toan bo du lieu',
      data: result,
    });
  });

module.exports = router;
