const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    linkPath : {type:String},
    linkType: {type:String},
    linkName: {type:String}
});

const Link = mongoose.model('Link', LinkSchema, 'link');
module.exports = Link;