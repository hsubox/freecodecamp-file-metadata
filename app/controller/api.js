var googleImages = require('../lib/google-images/google-images.js');
var searchHistory = require('../models/search-history-model.js');

module.exports = function(req, res, env) {
    var param = decodeURIComponent(req.params[0]);
    var client = googleImages(env.GOOGLE_CSE_ID, env.GOOGLE_API_KEY);
    
    if (req.query) {
        var options = {
            page: req.query.offset
        };
    }
    
    client.search(param, options)
        .then(function (images) {
            saveToHistory(param);
            res.send(images);
        });
};

function saveToHistory (query) {
    var searchTime = new Date();
    
    var thisSearch = new searchHistory({
        term: query,
        when: searchTime.toString()
    });
    
    thisSearch.save(function (err) {
        if (err) {
            throw err;
        }
    });
}