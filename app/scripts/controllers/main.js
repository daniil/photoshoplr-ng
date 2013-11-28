'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', '$window', 'TumblrAPI', 'Settings',
    function ($scope, $resource, $window, TumblrAPI, Settings) {
      $scope.posts = [];
      $scope.selectedPost;
      $scope.tags = [];

      TumblrAPI.blogInfo({offset: 0}, function(blogInfo) {
        var pageCount = Math.ceil(blogInfo.blog.posts / Settings.postLimit);

        $scope.title = blogInfo.blog.title;
        $scope.description = blogInfo.blog.description;

        populatePosts(pageCount);
      });

      $scope.showDetails = function(post) {
        $scope.selectedPost = post;
      };

      $scope.toggleTag = function(tag) {
        _.contains($scope.tags, tag) ? $scope.tags.splice($scope.tags.indexOf(tag), 1) : $scope.tags.push(tag);
      };

      $scope.tagActive = function(tag) {
        return _.contains($scope.tags, tag);
      }
      
      function populatePosts(pageCount) {
        var currPage = 0,
            getContent = function() {
              TumblrAPI.blogPosts({ offset: currPage * Settings.postLimit }, function(blogPosts) {
                $scope.posts = $scope.posts.concat(blogPosts.posts);
                
                if (currPage == 0) {
                  $scope.showDetails($scope.posts[0]);
                }

                currPage++;

                if (currPage < pageCount) {
                  getContent();
                }
              });
            };

        getContent();
      }
    }
  ]);
