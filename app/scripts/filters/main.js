'use strict';

angular.module('photoshoplrNgApp.filters', [])
  .filter('hasTags', function() {
    var hasTagsFilter = function(posts, tags) {
      //console.log(posts, tags);

      return posts;
    };
    return hasTagsFilter;
});