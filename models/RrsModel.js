const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RrsSchema = new Schema({
    username: {type:String},
    password: {type:String},
    addressName: {type:String},
    fullname: {type:String},
    deviceName: {type:String},
    linkProduct: {type:String},
    phoneNumber: {type:String},
    isRestore: {type:Boolean},
    isBackUp: {type:Boolean},
    rrsName: {type:String},
    ipAddr : {type:String},
    created: {type:Date, default: Date.now}
});

const Rrs = mongoose.model('Rrs', RrsSchema, 'rrs');
module.exports = Rrs;