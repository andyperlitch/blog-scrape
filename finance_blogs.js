exports = module.exports = [
	{
		name: "Business Insider, ClusterStock",
		index_url: "http://www.businessinsider.com/clusterstock",
		index_scrape_method: "href_scrape",
		index_scrape: {
			regex: function() {
				var now = new Date();
				var str = '^http://www.businessinsider.com/[-a-zA-Z0-9]+-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '$';
				return new RegExp(str);
			}
		},
		article: {
			title_selector: '.sl-layout-post h1:eq(0)',
			content_selector: '.sl-layout-post .clear-both:eq(0)'
		}
	}
];