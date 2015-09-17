var SudokuApp = angular.module('SudokuApp', ['ngRoute', 'sailsResource', 'ui.bootstrap', 'ngMaterial','ngMdIcons', 'angular-jqcloud']);

SudokuApp.run(['UserService',function(UserService){

  console.log('SudokuApp.');

  UserService.check(function(error, data){
    console.log(error, data);
  });

}]);

SudokuApp.config(['$routeProvider','$locationProvider','sailsResourceProvider', function($routeProvider, $locationProvider, sailsResourceProvider){

  sailsResourceProvider.configuration = {
    prefix: '/api',
    verbose: true
  };

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl:'/views/home.html',
    controller:'HomeCtrl'
  })
    .when('/game', {
    templateUrl:'/views/game.html',
    controller:'GameCtrl'
  })
  .otherwise({
    templateUrl:'/views/404.html'
  });


}]);
