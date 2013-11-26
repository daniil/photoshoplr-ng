'use strict';

angular.module('photoshoplrNgApp.services', [])
  .factory('Settings', [
    function() {
      return {
        postLimit: 20
      };
    }
  ])
  .factory('TumblrAPI', ['$resource', 'Settings',
    function($resource, Settings) {
      var apiURL = 'http://api.tumblr.com/v2/blog/madebyvadim.tumblr.com/',
      		blogConfig = {
	          method: 'JSONP',
	          transformResponse: function(data) {
	            return data.response;
	          }
	        };

      return $resource(apiURL, {
        api_key: '5qpBPu3mITiBI7oB9GwK5bBCYlMmt2Y43FD5RuXzJu3OWWPIBr',
        callback: 'JSON_CALLBACK',
        limit: Settings.postLimit,
        offset: '@id'
      },
      {
      	blogInfo: _.extend(_.clone(blogConfig), {url: apiURL + "info"}),
        blogPosts: _.extend(_.clone(blogConfig), {url: apiURL + "posts"})
      });
    }
  ]);