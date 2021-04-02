const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TelegramSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    phoneNumber: {type:String},
    otp: {type:String},
    rrsName: {type:String},
    deviceName: {type:String},
    status: {type:Boolean},
    created:{type:Date, default:Date.now}
});

const Telegram = mongoose.model('telegram', TelegramSchema, 'telegrams');
module.exports = Telegram;