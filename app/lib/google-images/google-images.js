'use strict';

// Modified from https://github.com/vdemedes/google-images
 
var got = require('got');
 
function Client (id, apiKey) {
    if (!(this instanceof Client)) {
        return new Client(id, apiKey);
    }
     
    this.endpoint = 'https://www.googleapis.com'
    this.apiKey = apiKey;
    this.id = id;
}

Client.prototype.search = function (query, options) {
    if(!query) {
        throw new TypeError('Expected a query');
    }
    
	return got(this.endpoint + '/customsearch/v1', {
		query: this._buildOptions(query, options),
		json: true
	}).then(this._buildResponse);
};

Client.prototype._buildOptions = function (query, options) {
	if (!options) {
		options = {};
	}
     
    var result = {
		q: query.replace(/\s/g, '+'),
		searchType: 'image',
		cx: this.id,
		key: this.apiKey
	};
	
    if (options.page) {
		result.start = options.page;
	}
    
    if (options.size) {
		result.imgSize = options.size;
	}

	return result;
};

Client.prototype._buildResponse = function (res) {
	return res.body.items.map(function (item) {
		return {
		    url: item.link,
		    snippet: item.snippet,
            thumbnail: item.image.thumbnailLink,
            context: item.image.contextLink
        };
    });
};

module.exports = Client;