var express = require('express');
const router = express.Router();
const linkModel = require('../../models/LinkModel');
router.use((req, res, next) => {
  if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
  next();
});

router.get('/', async function (req, res) {
  const linkMGG = await linkModel.find({linkType: 'LinkMGG', owner: req.owner});
  const linkSanPham = await linkModel.find({linkType: 'LinkSanPham', owner: req.owner});


  res.render('remote/addLink', {
    userData: req.user,
    RemoteSlideBarActive: true,
    active: {
      addLink: true,
    },
    linkMGG: linkMGG[0],
    linkSanPham: linkSanPham[0]
  });
});

router.post('/updateLink', async function (req, res) {
  const filter = {_id: req.body.linkID, linkType: req.body.linkType, owner: req.owner};
  const update = {
    linkName: req.body.linkName,
    linkPath: req.body.linkPath,
  };

  let doc = await linkModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (doc) {
    res.json({
      status: 'success',
      data: doc,
    });
  } else {
    res.json({
      status: 'fail',
      data: null,
    });
  }
  
});

router.post('/deleteKichBan', async (req, res) => {
  // const result = await scriptModel.deleteMany();
  // res.status(200).json({
  //   success: true,
  //   msg: 'Da xoa toan bo du lieu',
  //   data: result,
  // });
});

module.exports = router;
