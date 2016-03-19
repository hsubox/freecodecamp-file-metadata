var api = require("../controller/api.js");
var latest = require("../controller/latest.js");

module.exports = function(app, env) {
    app.get('/', function (req, res) {
        res.sendFile(process.cwd() + '/index.html');
    });
    
    app.get('/api/imagesearch/*', function(req, res) {
        api(req, res, env);
    });
    
    app.get('/api/latest/imagesearch/', function (req, res) {
        latest(req, res);
    });
};