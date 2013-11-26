'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', '$window', 'TumblrAPI', 'Settings',
    function ($scope, $resource, $window, TumblrAPI, Settings) {
      $scope.currPage = 0;
      $scope.currTag = '';

      TumblrAPI.blogPosts({offset: 0, tag: $scope.currTag}, function(blogPosts) {
        $scope.title = blogPosts.blog.title;
        $scope.description = blogPosts.blog.description;

        refreshPosts(blogPosts);
      });

      $scope.showDetails = function(post) {
        $scope.selectedPost = post;
      };

      $scope.goToPage = function(pageN) {
        TumblrAPI.blogPosts({offset: pageN * Settings.postLimit, tag: $scope.currTag}, function(blogPosts) {
          refreshPosts(blogPosts);

          $scope.currPage = pageN;
        });
      };

      $scope.refineByTag = function(tag) {
        TumblrAPI.blogPosts({offset: 0, tag: tag}, function(blogPosts) {
          refreshPosts(blogPosts);

          $scope.currTag = tag;
        });
      };

      function updatePaginator(postCount) {
        var pageCount = Math.ceil(postCount / Settings.postLimit);
        
        $scope.pages = [];

        for (var i = 0; i < pageCount; i++) {
          $scope.pages.push(i);
        }
      }

      function refreshPosts(blogPosts) {
        $scope.posts = blogPosts.posts;
        $scope.showDetails($scope.posts[0]);
        window.scrollTo(0, 0);
        updatePaginator(blogPosts.total_posts);
      }
    }
  ]);
