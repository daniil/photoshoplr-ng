'use strict';

angular.module('photoshoplrNgApp.filters', [])
  .filter('hasTags', function() {
    var hasTagsFilter = function(posts, settings) {
      var filteredPosts = _.filter(posts, function(post) { 
        var matchCount = 0;

        _.each(post.tags, function(val) {
          if (_.contains(settings.filter, val)) {
            matchCount ++;
          }
        });

        return settings.filter.length == 0 || matchCount == settings.filter.length;
      });

      settings.callback(filteredPosts);

      return filteredPosts;
    };

    return hasTagsFilter;
  });