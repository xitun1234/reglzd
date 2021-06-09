const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    deviceName:{type:String},
    ipAddress: {type:String},
    created:{type:Date, default: Date.now}
});

module.exports = mongoose.model('Device',DeviceSchema,'devices');