/**
*	Wrapper for HNSearch.com API
*
*	Author: Philip De Smedt (@philipdesmedt)
*	Date: 01/06/2011
*	Version: 0.1
*
*	Based on twitter client library 
*		https://github.com/jdub/node-twitter/blob/master/lib/twitter.js
*
*/
var request = require('request'),
	querystring = require('querystring');
var VERSION = 0.1;

function merge(defaults, options) {
	defaults = defaults || {};
	if (options && typeof options === 'object') {
		var keys = Object.keys(options);
		for (var i = 0, len = keys.length; i < len; i++) {
			var k = keys[i];
			if (options[k] !== undefined) defaults[k] = options[k];
		}
	}
	return defaults;
}

function HNSearch(options) {
	if (!(this instanceof HNSearch)) return new HNSearch(options);

	var defaults = {
		item_url: 'http://api.thriftdb.com/api.hnsearch.com/items',
		user_url: 'http://api.thriftdb.com/api.hnsearch.com/users'
	};
	this.options = merge(defaults, options);
}

HNSearch.VERSION = VERSION;
module.exports = HNSearch;

/**
* Extend HNSearch with 'get' method
*/
HNSearch.prototype.get = function(url, params, callback) {
	if (typeof params === 'function') {
		callback = params;
		params = undefined;
	} else {
		url += '&' + querystring.stringify(params);
	}
	
	if (typeof callback !== 'function') {
		throw "[Error] Invalid callback function specified."
		return this;
	}
	
	//console.log(url);
	request.get({uri: url}, function(err, resp, body) {
		if(err) {
			callback(err, body);
		} else {
			var parsed = JSON.parse(body);
			if (parsed['__class__'] && parsed['__class__'] === 'ServerErrorResponse') {
				// call the function with the error parameter
				callback(parsed, null);
			} else {
				callback(null, parsed);	
			}
		}
	});
}

/**
* Search for a HN user
*/
HNSearch.prototype.searchUser = function(q, params, callback) {
	if (typeof params === 'function') {
		callback = params;
		params = undefined;
	}
	
	if (typeof callback !== 'function') {
		throw "[Error] Invalid callback function specified.";
		return this;
	}
	
	var url = this.options.user_url + '/_search?q=' + q;

	this.get(url, params, callback);
	return this;
}

/**
* Search for a post/comment
*/
HNSearch.prototype.searchSubmission = function(q, params, callback) {
	if (typeof params === 'function') {
		callback = params;
		params = undefined;
	}
	
	if (typeof callback !== 'function') {
		throw "[Error] Invalid callback function specified.";
		return this;
	}
	
	var url = '';
	if (typeof q === 'object') {
		// q is a placeholder for extra params.
		// nasty hack to kind of support multiple keys 'filter[queries][]'
		//console.log('NASTY HACK!!!');
		url = this.options.item_url + '/_search?q=&' + querystring.stringify(q);
	} else {
		url = this.options.item_url + '/_search?q=' + q;
	}

	this.get(url, params, callback);
	return this;
}
