const mongoose = require('mongoose');
const db_url = 'mongodb://name:12345bb@ds145921.mlab.com:45921/homeexpenses';
mongoose.connect(db_url, function(){
    console.log('MongoDB connected sucessfully')
});

module.exports = mongoose;