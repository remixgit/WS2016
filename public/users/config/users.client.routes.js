angular.module('users').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'users/views/login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'users/views/register.html'
      })      
      .state('users', {
        url:'/users',
        templateUrl: 'users/views/list-users.html'
      })
      .state('create-user', {
        url:'/users/create',
        templateUrl: 'users/views/create-user.html'
      })
      .state('view-user', {
        url:'/users/:userId',
        templateUrl: 'users/views/view-user.html'
      })
      .state('edit-user', {
        url:'/users/:userId/edit',
        templateUrl: 'users/views/edit-user.html'
      });
  }
]);
