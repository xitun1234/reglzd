const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  ScriptSchema = new Schema({
    scriptName: {type:String},
    deviceName: {type:String},
});

const Script = mongoose.model('Script', ScriptSchema, 'scripts');
module.exports = Script;