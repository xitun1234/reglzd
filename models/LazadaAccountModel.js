const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {type:String},
    password: {type:String},
    phone: {type:String},
    deviceName: {type:String},
    gmail: {type:String},
    fullname: {type:String},
    first_name: {type:String},
    last_name_group: {type:String},
    ipAddr: {type:String},
    status: {type:Boolean},
    created:{type:Date, default:Date.now}
});

const Account = mongoose.model('Account',AccountSchema,'accounts');
module.exports = Account;