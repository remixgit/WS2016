var mainApplicationModuleName = 'ticketing_system';

var mainApplicationModule = angular.module(mainApplicationModuleName,
  ['ngResource','ui.router','ngCookies','angular-jwt', 'users','main','tasks','projects','comments','reports']);

//tell search engine crawlers that this is single page application
//in order to wait rendering to be done Hashbangs.Hashbangs routing scheme
mainApplicationModule.config(['$locationProvider', function($locationProvider){
  $locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') window.location.hash = '#!'; //oauth links

//binding function to document-ready event
angular.element(document).ready(function(){
  angular.bootstrap(document, [mainApplicationModuleName]); //initiate a nwe angularjs application using the main application module
});

