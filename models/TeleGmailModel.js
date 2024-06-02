const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeleGmailSchema = new Schema({
    gmail: {type:String},
    password: {type:String},
    mailKP: {type:String},
    otpRegTele: {type:String, default: ""},
    deviceName: {type:String, default: ""},
    isGet: {type: Boolean, default: false},
    created:{type:Date, default:Date.now}
});

const TeleGmail = mongoose.model('telegmail',TeleGmailSchema,'telegmails');
module.exports = TeleGmail;