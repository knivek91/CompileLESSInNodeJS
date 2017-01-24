var express         = require('express')
    , bodyParser    = require('body-parser')  
    , morgan        = require('morgan')
    , less          = require('less')
    , fs            = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

/* Get Initial View */
app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

/* buttons view */
app.get('/buttons', function (req, resp) {
    resp.sendFile(__dirname + '/buttons.html');
});

/* Compile less file */
app.post('/compile', function(req, resp, data) {
    
    var input = fs.readFileSync(__dirname + '/public/src/less/style.less', 'utf8');
    var options = req.body.data;
    
    less.render(input, options, function (err, result) {
        fs.writeFile(__dirname + '/public/src/css/style.css', result.css, function (err) {
            if(err)
                resp.send(err);
        });
        fs.writeFile(__dirname + '/variables.json', JSON.stringify(req.body.data.modifyVars), function (err) {
            if(err)
                resp.send(err);
        });
    });
    resp.send('');
});

/* get the json with the variables */
app.get('/getVariables', function(req, resp) {
    
   var input = fs.readFileSync(__dirname + '/variables.json', 'utf8', function (err) {
            if(err)
                resp.send(err);
        });
    resp.send(input);
    
});

app.listen(9191);