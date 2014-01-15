/*
{
	name: "Business Insider, ClusterStock",
	index_url: "http://www.businessinsider.com/clusterstock",
	index_scrape_method: "href_scrape",
	index_scrape: {
		regex: function() {
			var now = new Date();
			var str = 'http://www.businessinsider.com/[a-zA-Z0-9]+-' + now.getFullYear() + now.getMonth();
			return new RegExp(str);
		}
	},
	article: {
		title_selector: '.sl-layout-post h1:eq(0)',
		content_selector: '.sl-layout-post .clear-both:eq(0)'
	}
}
*/
var _ = require('underscore');
var jsdom = require('jsdom');
var request = require('request');

var index_scrape_methods = {

	href_scrape: {
		getCallback: function(index_scrape_obj, cb) {
			var re = _.result(index_scrape_obj, 'regex');
			return function(err, resp, body) {

				if (err) {
					cb(err);
					return;
				}

				var results = [];

				jsdom.env({
		            html: body,
					scripts: ['http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'],
					done: function(err, window){
			         	//Use jQuery just as in a regular HTML page
						var $ = window.jQuery;
			            $('a').each(function(i, el) {
			            	var href = el.href;
		            		if (re.test(href) && results.indexOf(href) === -1) {
								results.push(href);
							}
			            });
			            cb(false, results);
			        }
		        });
			}

		}
	}

}


exports = module.exports = function(obj) {

	var url = obj.index_url;
	var method = index_scrape_methods[obj.index_scrape_method];
	var articleCB = function(err, res) {
		
		if (err) {
			console.log('error retrieving links from index url');
			return;
		}

		var results = [];
		var pending = res.length;

		res.forEach(function(article_url) {
			request(article_url, function(err, resp, body) {

				if (err) {
					return;
				}

				jsdom.env({
		            html: body,
					scripts: ['http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'],
					done: function(err, window){
			         	//Use jQuery just as in a regular HTML page
						var $ = window.jQuery;
						results.push({
							url: article_url,
							title: $(obj.article.title_selector).text(),
							content: $(obj.article.content_selector).text()
						});
						--pending;
						if (pending <= 0) {
							process.stdout.write(JSON.stringify(results));
						}
			        }
		        });
			});
		});

	}
	var indexCB = method.getCallback(obj.index_scrape, articleCB);

    request(url, indexCB);

};