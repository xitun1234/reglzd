const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GmailSchema = new Schema({
    gmail: {type:String},
    password: {type:String},
    phone: {type:String},
    deviceName: {type:String},
    fullname: {type:String},
    first_name: {type:String},
    last_name_group: {type:String},
    ipAddr: {type:String},
    dateOfBirth: {type:Number},
    monthOfBirth:{type:Number},
    yearOfBirth: {type:Number},
    status: {type:Boolean},
    isRestore: {type:Boolean},
    isBackUp: {type:Boolean},
    created:{type:Date, default:Date.now}
});

const Gmail = mongoose.model('gmail',GmailSchema,'gmails');
module.exports = Gmail;