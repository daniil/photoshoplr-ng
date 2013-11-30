'use strict';

angular.module('photoshoplrNgApp.services', [])
  .factory('Settings', [
    function() {
      return {
        postLimit: 20,
        defaultTitle: 'Photoshop Plugin',
        priceRegExp: /[[\{|\(|\[]{1}([\$a-zA-Z\d\.\+\s\/\-]+)[\}|\)|\]]{1}$/
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
        blogInfo: _.extend(_.clone(blogConfig), {url: apiURL + 'info'}),
        blogPosts: _.extend(_.clone(blogConfig), {url: apiURL + 'posts'})
      });
    }
  ])
  .factory('PriceParser', ['Settings',
    function(Settings) {
      return {
        parse: function(post) {
          var match;

          if (!post.title) {
            _.extend(post, { title: Settings.defaultTitle })
          }

          match = $.trim(post.title).match(Settings.priceRegExp);

          if (match) {
            _.extend(post, {
              price: match[1],
              title: post.title.replace(match[0], '')
            });
          } else {
            _.extend(post, { price: 'n/a' });
          }
        }
      }
    }
  ]);