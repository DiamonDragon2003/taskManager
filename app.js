var express = require('express'),
    config = require('config'),
    bodyParser = require("body-parser");
mongoose = require('lib/mongoose');

//мини модули
favicon = require('serve-favicon'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    app = express();


app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    var contentType = req.headers['content-type'] || ''
    var mime = contentType.split(';')[0];
     if(mime != 'application/octet-stream') {
         return next();
     }
    var data = '';
    req.setEncoding('binary');
     req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
       req.rawBody = data;
       next();
   });
 });

var session = require('express-session');

var sessionStore = require('lib/sessionStore');

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    saveUninitialized: false,
    resave: false,
    store: sessionStore
}));



require('routes')(app);

app.use(express.static(path.join(__dirname, 'public')));



app.listen(config.get('port'), function () {
    console.log('Started')
})