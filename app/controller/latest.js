var searchHistory = require('../models/search-history-model.js');

module.exports = function(req, res) {
    var query = searchHistory.find({}, {term: 1, when: 1, _id:0 })
                        .limit(10)
                        .sort({_id: -1});
    query.exec(function (err, posts) {
        if (err) {
            throw err;
        }
        res.send(posts);
    });
};