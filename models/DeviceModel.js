const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    deviceName:{type:String, lowercase:true},
    owner: {type: Schema.Types.ObjectId, ref:'User'},
    created:{type:Date, default: Date.now}
});

module.exports = mongoose.model('Device',DeviceSchema,'devices');