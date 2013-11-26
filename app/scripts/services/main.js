'use strict';

angular.module('photoshoplrNgApp.services', [])
  .factory('Settings', [
    function() {
      return {
        postLimit: 10
      };
    }
  ])
  .factory('TumblrAPI', ['$resource', 'Settings',
    function($resource, Settings) {
      var apiURL = 'http://api.tumblr.com/v2/blog/madebyvadim.tumblr.com/';

      return $resource(apiURL + 'posts', {
        api_key: '5qpBPu3mITiBI7oB9GwK5bBCYlMmt2Y43FD5RuXzJu3OWWPIBr',
        callback: 'JSON_CALLBACK',
        limit: Settings.postLimit,
        offset: '@id'
      },
      {
        blogPosts: {
          method: 'JSONP',
          transformResponse: function(data) {
            return data.response;
          }
        }
      });
    }
  ]);