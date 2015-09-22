var lookAtFood = angular.module('lookAtFood', ['ngRoute']);

var apiKey = '95Asywfj2p8t3kQFsGLGKk12vt6gpqW2Yh99GPye';
var apiSearch = 'http://api.nal.usda.gov/ndb/search';
var apiReports = 'http://api.nal.usda.gov/ndb/reports'

var apiImage = 'https://www.googleapis.com/customsearch/v1';
var imageKey = 'AIzaSyAH1SDzLxXtRnyVSMzOXXkKEnQ4UKWHojA';
var searchEngineId = '006340961995010200249:7zpz0ppny5g';
//https://www.googleapis.com/customsearch/v1?key=AIzaSyAH1SDzLxXtRnyVSMzOXXkKEnQ4UKWHojA&cx=006340961995010200249:7zpz0ppny5g&q=bacon&searchType=image

// Routes to change templates/controllers
lookAtFood.config(function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'mainController'
  })
  .when('/:id', {
    templateUrl: 'views/food.html',
    controller: 'foodController'
  })

});

// Controller for the main search page
lookAtFood.controller('mainController', ['$scope', '$http', function($scope, $http) {

  $scope.searchItem = '';
  $scope.possibleFoods = {};

  $scope.searchFoods = function() {
    var params = [
      '?format=json',
      '&q=', $scope.searchItem,
      '&sort=r',
      '&max=20',
      '&api_key=', apiKey
    ].join('');


    console.log('searching for foods...');
    $http.get(apiSearch + params)
      .then(function(res) {
        $scope.possibleFoods = res.data.list.item;
      }, function(res) {
        console.log('error', res);
      });
  }

}]);

// Controller for the individual food nutrient pages
lookAtFood.controller('foodController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    $scope.foodId = $routeParams.id;
    $scope.foodName = '';
    $scope.nutrients = [];
    $scope.serving = {};  // .qty + .label for serving size
    $scope.imageUrl = '';

    $scope.getFoodById = function(id) {
      var params = [
        '?format=json',
        '&ndbno=', id,
        '&type=b',
        '&api_key=', apiKey
      ].join('');

      console.log('getting a food...');
      $http.get(apiReports + params)
        .then(function(res) {
          $scope.foodName = res.data.report.food.name;
          $scope.nutrients = res.data.report.food.nutrients;
          $scope.serving = res.data.report.food.nutrients[0].measures[0];
          // $scope.getImage($scope.foodName);
        }, function(res) {
          console.log('ERROR:', res);
        });
    }

    $scope.getImage = function(foodName) {
      var params = [
        '?key=', imageKey,
        '&cx=', searchEngineId,
        '&searchType=image',
        '&imgSize=medium',
        '&q=', foodName
      ].join('');

      $http.get(apiImage + params)
        .then(function(res) {
          console.log(res);
          $scope.imageUrl = res.data.items[0].link;
        }, function(res) {
          console.log('ERROR:', res);
        });
    }

    $scope.getFoodById($routeParams.id);
    
}])
