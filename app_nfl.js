var cookie_session = require('cookie-session')
var csp = require('helmet-csp');
var helmet = require('helmet'); //ref:https://www.npmjs.com/package/helmet
var express = require('express');
var bodyParser = require('body-parser');
//var yo = require('yo');

var app = express();

var nfl_player = require('./api/nfl_players/index');


app.use(bodyParser.json());
app.use(helmet());

//stops attackes detecting app is using express
app.disable('x-powered-by');


app.use(csp({
            directives: {
            defaultSrc: ["'self'", 'default.com'],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ['style.com'],
            fontSrc: ["'self'", 'fonts.com'],
            imgSrc: ['img.com', 'data:'],
            sandbox: ['allow-forms', 'allow-scripts'],
            reportUri: '/report-violation',
            objectSrc: ["'none'"],
            upgradeInsecureRequests: true
            },
            
            // detects mistakes in directives and throws error
            loose: false,
            
            //true if you only want browsers to report errors, not block them.
            reportOnly: false,
            
          
            setAllHeaders: false,
            
            // true to disable CSP on Android where it can be buggy.
            disableAndroid: false,
            
            // Set to false if you want to completely disable any user-agent sniffing.
            browserSniff: false
            }))
//ref: https://www.npmjs.com/package/helmet-csp

app.set('trust proxy',1)

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(cookie_session({
        
                       name: 'session',
                       keys: ['key1', 'key2'],
                       cookie: {
                       secure: true,
                       httpOnly: true,
                       domain: 'example.com',
                       path: 'foo/bar',
                       expires: expiryDate
                       }
                       }))
app.get('/', function (req, res, next) {
        // Update views
        req.session.views = (req.session.views || 0) + 1
        
        // Write response
        res.end(req.session.views + ' views')
        })

//app.use(yo());


app.get('/api/nfl_players',nfl_player.index);
app.post('/api/nfl_players',nfl_player.create);
app.put('/api/nfl_players/:id',nfl_player.update);
app.delete('/api/nfl_players/:id',nfl_player.delete);


// App listens on port 8000
app.listen(8000)
// PMessage sent to terminal
console.log("Server running for NFL Players on port 8000");
