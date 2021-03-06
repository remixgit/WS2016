process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//IMPORTANT!: mongoose module must be loaded before everything else, because only
//            then mongoose schemeas can be used without other models needed to loaded
//            it themselves!
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);

module.exports = app;


console.log('Server running at http://localhost:3000/');
