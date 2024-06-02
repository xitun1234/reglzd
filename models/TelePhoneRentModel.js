const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TelePhoneRentSchema = new Schema({
    phoneRent: {type:String},
    otp: {type:String, default: ""},
    deviceName: {type:String},
    created:{type:Date, default:Date.now}
});

const TelePhoneRent = mongoose.model('telephonerent',TelePhoneRentSchema,'telephonerents');
module.exports = TelePhoneRent;