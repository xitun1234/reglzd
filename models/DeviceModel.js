const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    deviceName:{type:String},
    ipAddress: {type:String},
    owner: {type:String},
    isChoice: {type:Boolean},
    created:{type:Date, default: Date.now}
});

module.exports = mongoose.model('Device',DeviceSchema,'devices');