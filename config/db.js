var mongoose = require('mongoose');

var mongodb = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imagesearch';
mongoose.Promise = global.Promise;




exports.db = mongoose.connect(mongodb);