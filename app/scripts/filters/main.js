'use strict';

angular.module('photoshoplrNgApp.filters', [])
  .filter('postsFilter', ['$filter', function($filter) {
    var postsFilter = function(posts, tags, searchQuery, scope) {
      var filteredPosts;

      filteredPosts = _.filter(posts, function(post) { 
        var matchCount = 0;

        _.each(post.tags, function(val) {
          if (_.contains(tags, val)) {
            matchCount ++;
          }
        });

        return tags.length == 0 || matchCount == tags.length;
      });

      filteredPosts = $filter('filter')(filteredPosts, searchQuery);

      filteredPosts = $filter('orderBy')(filteredPosts, scope.orderByProp, scope.orderByReverse);

      scope.$emit('postsFilterDone', filteredPosts[0]);

      return filteredPosts;
    };

    return postsFilter;
  }]);