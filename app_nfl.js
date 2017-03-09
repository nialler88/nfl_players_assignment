var helmet = require('helmet');
var express = require('express');
var bodyParser = require('body-parser');
//var yo = require('yo');

var app = express();

var nfl_player = require('./api/nfl_players/index');



//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());
app.use(helmet());
//app.use(yo());


app.get('/api/nfl_players',nfl_player.index);
app.post('/api/nfl_players',nfl_player.create);
app.put('/api/nfl_players/:id',nfl_player.update);
app.delete('/api/nfl_players/:id',nfl_player.delete);


// App listens on port 8000
app.listen(8000)
// Put a friendly message on the terminal
console.log("Server running for NFL Players on port 8000");
