'use strict';

angular.module('photoshoplrNgApp.services', [])
	.factory('TumblrAPI', ['$resource', 
		function($resource) {
			return $resource('http://api.tumblr.com/v2/blog/madebyvadim.tumblr.com/info', {
				api_key: '5qpBPu3mITiBI7oB9GwK5bBCYlMmt2Y43FD5RuXzJu3OWWPIBr',
				callback: 'JSON_CALLBACK'
			}, 
			{ 
				get: { 
					method: 'JSONP',
					transformResponse: function(data) {
						return data.response.blog;

					}
				} 
			});
		}
	]);