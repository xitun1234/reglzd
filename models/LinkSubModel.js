const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSubSchema = new Schema({
    linkSub : {type:String}
});

const LinkSub = mongoose.model('LinkSub', LinkSubSchema, 'linksub');
module.exports = LinkSub;