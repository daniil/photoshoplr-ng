'use strict';

angular.module('photoshoplrNgApp.directives', [])
  .directive('scrollFollower', ['$window', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var windowEl = angular.element($window),
            contentOffset = angular.element('.content')[0].offsetTop - 25,
            lastY;

        windowEl.on('scroll', function() {
          positionContent();
          lastY = windowEl.scrollTop();
        });

        scope.$watch('selectedPost', function() {
          positionContent();
        });

        function positionContent() {
          var scrollPos,
              listHeight = angular.element('.content-list').height(),
              contentHeight = element.height();
          
          if (windowEl.scrollTop() < contentOffset || windowEl.scrollTop() < (contentHeight)) {
            scrollPos = 0;
          } else if (windowEl.scrollTop() > listHeight - contentHeight) {
            scrollPos = listHeight - contentHeight;
          } else {
            if (contentHeight > windowEl.height()) {
              if (windowEl.scrollTop() - lastY > 0) {
                scrollPos = windowEl.scrollTop() - contentOffset - (contentHeight - windowEl.height()) - 25;
              } else {
                scrollPos = windowEl.scrollTop() - contentOffset;
              }
            } else {
              scrollPos = windowEl.scrollTop() - contentOffset;
            }
          }
          
          element.css({ 'margin-top' : scrollPos });
        }
      }
    };
  }]);