var mongoose = require("mongoose");

var searchHistory = mongoose.model('searchHistory', {
    term: String,
    when: String
});

/*
//Empty the collection to reset
SearchHistory.remove({}, function(err) {
  if (err) throw err;
  console.log('collection removed');
});
*/

module.exports = searchHistory;