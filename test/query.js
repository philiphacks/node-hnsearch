var	sys = require('sys'),
	hnsearch = require('../lib/hnsearch'),
	hn = new hnsearch();

// 'Pretty' print a search result
function print(body) {
	if (body['results']) {
		for (var item in body['results']) {
			var i = body['results'][item];
			sys.puts(JSON.stringify(i));
		}
	}
}

console.log('Starting tests');

// Check out http://www.hnsearch.com/api for search queries. Straightforward examples below
var filter = {};
filter['filter[fields][type][]'] = 'submission';
hn.searchSubmission('facebook', filter, function (err, body) {
	if (err) {
		throw 'ERROR!';
		return this;
	} else {
		print(body);
	}
});

var filter = {};
filter['filter[fields][type][]'] = 'comment';
hn.searchSubmission('comment points', filter, function (err, body) {
	if (err) {
		throw 'ERROR!';
		return this;
	} else {
		print(body);
	}
});

hn.searchUser('pg', function (err, body) {
	if (err) {
		throw 'ERROR!';
		return this;
	} else {
		print(body);
	}
});
