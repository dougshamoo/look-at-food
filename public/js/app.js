var lookAtFood = angular.module('lookAtFood', ['ngRoute']);

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

var apiKey = '95Asywfj2p8t3kQFsGLGKk12vt6gpqW2Yh99GPye';
var apiSearch = 'http://api.nal.usda.gov/ndb/search';
var apiReports = 'http://api.nal.usda.gov/ndb/reports'

lookAtFood.controller('mainController', ['$scope', '$http', function($scope, $http) {

  $scope.searchItem = '';
  $scope.foodReport = {};
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
        // console.log($scope.possibleFoods);
        // console.log(typeof $scope.possibleFoods);
      }, function(res) {
        console.log('error', res);
      });
  }

  $scope.getFoodByID = function(id) {
    var params = [
      '?format=json',
      '&ndbno=', id,
      '&type=b',
      '&api_key=', apiKey
    ].join('');
    $http.get(apiReports + params)
      .then(function(res) {
        $scope.foodReport = res.data
      }, function(res) {
        console.log('ERROR:', res)
      });

  }

}]);

lookAtFood.controller('foodController', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.foodId = $routeParams.id;
}])
