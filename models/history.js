var mongoose = require('mongoose');
 
var historySchema = new mongoose.Schema({
 term: String,
 when: { type: Date, default: Date.now }
});
 
var History = mongoose.model('History', historySchema);
module.exports = History;