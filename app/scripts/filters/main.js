'use strict';

angular.module('photoshoplrNgApp.filters', [])
  .filter('hasTags', function() {
    var hasTagsFilter = function(posts, tags, scope) {
      var filteredPosts = _.filter(posts, function(post) { 
        var matchCount = 0;

        _.each(post.tags, function(val) {
          if (_.contains(tags, val)) {
            matchCount ++;
          }
        });

        return tags.length == 0 || matchCount == tags.length;
      });

      scope.$emit('filterDone', filteredPosts[0]);

      return filteredPosts;
    };

    return hasTagsFilter;
  });