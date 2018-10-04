var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'),function(){
    console.log('Запущена база')
});

module.exports = mongoose;