'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', '$window', '$timeout', 'TumblrAPI', 'Settings', 'PriceParser', 'BlurbParser',
    function ($scope, $resource, $window, $timeout, TumblrAPI, Settings, PriceParser, BlurbParser) {
      $scope.posts = [];
      $scope.tags = [];
      $scope.orderByProp = 'timestamp';
      $scope.orderByReverse = true;
      $scope.postsPerPage = Settings.postsPerPage;
      $scope.defaultTitle = Settings.defaultTitle;
      $scope.currentYear = Settings.currentYear;

      TumblrAPI.blogInfo({offset: 0}, function(blogInfo) {
        var pageCount = Math.ceil(blogInfo.blog.posts / Settings.postLimit);

        $scope.title = blogInfo.blog.title;
        $scope.description = blogInfo.blog.description;
        $scope.url = blogInfo.blog.url;
        $scope.name = blogInfo.blog.name;

        populatePosts(pageCount);
      });

      $scope.showDetails = function(post) {
        $scope.selectedPost = post;
      };

      $scope.toggleTag = function(tag) {
        _.contains($scope.tags, tag) ? $scope.tags.splice($scope.tags.indexOf(tag), 1) : $scope.tags.push(tag);
        
        updateAfterFilters();
      };

      $scope.tagActive = function(tag) {
        return _.contains($scope.tags, tag);
      };

      $scope.jumpToTop = function() {
        angular.element('.content-body').addClass('no-animation');
        $window.scrollTo(0, 0);
        var scrollTimeout = $timeout(function() {
          angular.element('.content-body').removeClass('no-animation');
          $timeout.cancel(scrollTimeout);
        }, 100);
      }

      $scope.$watch('searchQuery', function() {
        updateAfterFilters();
      });

      $scope.$watch('orderByProp', function() {
        updateAfterFilters();
      });
      
      function populatePosts(pageCount) {
        var currPage = 0,
            getContent = function() {
              TumblrAPI.blogPosts({ offset: currPage * Settings.postLimit }, function(blogPosts) {
                parsePrice(blogPosts.posts);
                parseBlurb(blogPosts.posts);

                $scope.posts = $scope.posts.concat(blogPosts.posts);
                
                if (currPage == 0) {
                  $scope.showDetails($scope.posts[0]);
                }

                currPage++;

                if (currPage < pageCount) {
                  getContent();
                } else {
                  angular.element('.post-count').addClass('text-success');
                  angular.element('.posts-loading').addClass('fade-out');
                  var fadeTimeout = $timeout(function() {
                    angular.element('.posts-loading').remove();
                    $timeout.cancel(fadeTimeout);
                  }, 500);
                }
              });
            };

        getContent();
      }

      function parsePrice(posts) {
        angular.forEach(posts, function(value, key) {
          PriceParser.parse(value);
        });
      }

      function parseBlurb(posts) {
        angular.forEach(posts, function(value, key) {
          BlurbParser.parse(value);
        });
      }

      function updateAfterFilters() {
        var filtersDone = $scope.$on('postsFilterDone', function(event, firstFilteredPost) { 
          if ($window.scrollTop !== 0) $window.scrollTo(0, 0);
          if ($scope.selectedPost !== $scope.firstFilteredPost) $scope.showDetails(firstFilteredPost);
          if ($scope.postsPerPage !== Settings.postsPerPage) $scope.postsPerPage = Settings.postsPerPage;
          filtersDone();
        });
      }

    }
  ]);
