Asynchronous HNSearch API wrapper for Node.JS
=============================================

[node-hnsearch](https://github.com/philipdesmedt/node-hnsearch) aims to provide an asynchronous wrapper for HNSearch. It was inspired by [node-twitter](https://github.com/jdub/node-twitter).

## Requirements

You can install node-hnsearch from the github package. Dependencies:

- [node](http://nodejs.org/)
- [request](https://github.com/mikeal/request/)

## Getting started

The wrapper is really barebones in its current state. This wrapper allows requests for users, comments and submissions. 

### Setup wrapper

var	hnsearch = require('hnsearch'),
	hn = new hnsearch();

### Search 

The following code shows a search for a submission with keyword 'facebook'

	var filter = {};
	filter['filter[fields][type][]'] = 'submission';
	hn.searchSubmission('facebook', function (err, body) {
		if (err) {
			throw 'ERROR!';
			return this;
		} else {
			print(body);
		}
	});

## Contributors

- [Philip De Smedt](http://github.com/philipdesmedt) (author)
- [mikeal](https://github.com/mikeal/request) (request.js)

## TODO

- Better support for multiple parameters with the same name. This is currently hacked in the wrapper.
