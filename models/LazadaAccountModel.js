const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    account: {type:String},
    password: {type:String},
    phone: {type:String},
    deviceName: {type:String},
    owner : {type:Schema.Types.ObjectId, ref:'User'},
    ipAddr: {type:String},
    created:{type:Date, default:Date.now}
});

const Account = mongoose.model('Account',AccountSchema,'accounts');
module.exports = Account;