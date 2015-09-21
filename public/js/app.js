var lookAtFood = angular.module('lookAtFood', []);

var apiKey = '95Asywfj2p8t3kQFsGLGKk12vt6gpqW2Yh99GPye';
var apiSearch = 'http://api.nal.usda.gov/ndb/search';

lookAtFood.controller('foodController', ['$scope', '$http', function($scope, $http) {

  $scope.searchItem = '';
  $scope.foodReport = {};
  $scope.possibleFoods = {};
  $scope.foodId = '';

  $scope.searchFoods = function() {
    var params = [
      '?format=json',
      '&q=', $scope.searchItem,
      '&sort=r',
      '&max=20',
      '&api_key=', apiKey
    ].join('');

    console.log('searching for foods');
    $http.get(apiSearch + params)
      .then(function(response) {
        $scope.possibleFoods = response.data.list.item;
        console.log($scope.possibleFoods);
        console.log(typeof $scope.possibleFoods);
      }, function(response) {
        console.log('error', response);
      });
  }
}]);
