# Blog Scrape

To install and run (after cloning): 

	cd blog-scrape
	npm install
	node test.js

This may take a while, but will eventually print an array to stdout in the following format:


	[
		{
			"url": "http://www.example-blog.com/example-article-url",
			"title": "Example Article Title",
			"content": "Example content. This may contain \n and \t and lots of text."
		},
		{
			"url": "http://www.example-blog.com/example-article-url",
			"title": "Example Article Title",
			"content": "Example content. This may contain \n and \t and lots of text."
		},
		{
			"url": "http://www.example-blog.com/example-article-url",
			"title": "Example Article Title",
			"content": "Example content. This may contain \n and \t and lots of text."
		},
		{
			"url": "http://www.example-blog.com/example-article-url",
			"title": "Example Article Title",
			"content": "Example content. This may contain \n and \t and lots of text."
		}
	]