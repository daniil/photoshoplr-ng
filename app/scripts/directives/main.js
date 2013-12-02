'use strict';

angular.module('photoshoplrNgApp.directives', [])
  .directive('scrollFollower', ['$window', 
    function($window) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          var windowEl = angular.element($window),
              windowScrollPos = windowEl.scrollTop(),
              windowHeight = windowEl.height(),
              contentOffset = angular.element('.content')[0].offsetTop - 25,
              lastY;

          windowEl.on('scroll', function() {
            windowScrollPos = windowEl.scrollTop();
            positionContent(windowScrollPos);
            lastY = windowScrollPos;
          });

          scope.$watch('selectedPost', function() {
            positionContent(windowScrollPos);
          });

          function positionContent(windowScrollPos) {
            var scrollPos,
                listHeight = angular.element('.content-list').height(),
                contentHeight = element.height();
            
            if (windowScrollPos < contentOffset 
              || contentHeight > listHeight 
              || windowScrollPos < (contentHeight + contentOffset) - windowHeight
            ) {
              scrollPos = 0;
            } else if (windowScrollPos > listHeight - contentHeight) {
              scrollPos = listHeight - contentHeight;
            } else {
              if (contentHeight > windowHeight) {
                if (windowScrollPos - lastY > 0) {
                  scrollPos = windowScrollPos - contentOffset - (contentHeight - windowHeight) - 25;
                } else {
                  scrollPos = windowScrollPos - contentOffset;
                }
              } else {
                scrollPos = windowScrollPos - contentOffset;
              }
            }
            
            element.css({ 'margin-top' : scrollPos });
          }
        }
      };
    }
  ])
  .directive('contentAppender', ['$window', 'Settings', 
    function($window, Settings) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          var windowEl = angular.element($window);

          windowEl.on('scroll', function() {
            var elementHeight = element.height();

            if (windowEl.scrollTop() + windowEl.height() > elementHeight) {
              if (scope.postsPerPage < scope.filteredPosts.length) {
                scope.$apply(function () {
                  scope.postsPerPage += Settings.postsPerPage;
                });
              }
            }
          });
        }
      };
    }
  ]);