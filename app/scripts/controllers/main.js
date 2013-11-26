'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', 'TumblrAPI', 'Settings',
    function ($scope, $resource, TumblrAPI, Settings) {
      TumblrAPI.blogPosts({offset: 0}, function(blogPosts) {
        $scope.title = blogPosts.blog.title;
        $scope.description = blogPosts.blog.description;
        $scope.posts = blogPosts.posts;
        $scope.postCount = blogPosts.blog.posts;

        $scope.showDetails($scope.posts[0]);

        populatePaginator();
      });

      $scope.showDetails = function(post) {
        $scope.selectedPost = post;
      };

      $scope.goToPage = function(pageN) {
        TumblrAPI.blogPosts({offset: pageN * Settings.postLimit}, function(blogPosts) {
          $scope.posts = blogPosts.posts;
          $scope.showDetails($scope.posts[0]);

          $scope.currPage = pageN;

          window.scrollTo(0, 0);
        });
      };

      function populatePaginator() {
        var pageCount = Math.ceil($scope.postCount / Settings.postLimit);
        
        $scope.pages = [];
        $scope.currPage = 0;

        for (var i = 0; i < pageCount; i++) {
          $scope.pages.push(i);
        }
      }
    }
  ]);
