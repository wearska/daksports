(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
      // For any unmatched url, redirect to /
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/views/main/main.view.html',
          controller: 'MainCtrl'
        })
        .state('test', {
          url: '/test',
          templateUrl: 'app/views/testing/test.view.html'
            // controller: 'TestCtrl'
        })
        .state('account', {
          url: '/account',
          templateUrl: 'app/views/account/account.view.html',
          controller: 'AuthCtrl'
        })
        .state('account.login', {
          url: '/login',
          templateUrl: 'app/views/account/account.login.view.html',
          view: 'account',
          controller: 'AuthCtrl'
        })
        .state('account.signup', {
          url: '/signup',
          templateUrl: 'app/views/account/account.signup.view.html',
          view: 'account',
          controller: 'AuthCtrl'
        })
        .state('admin', {
          url: '/admin',
          templateUrl: 'app/views/admin/admin.view.html',
          controller: 'AdminCtrl'
        })
        .state('admin.list', {
          url: '/list',
          templateUrl: 'app/views/admin/admin.list.view.html',
          view: 'admin',
          controller: 'ListCtrl'
        })
        .state('admin.add', {
          url: '/add',
          templateUrl: 'app/views/admin/admin.add.view.html',
          controller: 'AddCtrl'
        })
        .state('admin.edit', {
          url: '/edit/:productId',
          templateUrl: 'app/views/admin/admin.edit.view.html',
          controller: 'EditCtrl'
        })
        .state('product', {
          url: '/product/:productId',
          templateUrl: 'app/views/product/product.view.html',
          controller: 'ProductCtrl'
        })
        .state('cart', {
          url: '/cart',
          templateUrl: 'app/views/cart/cart.view.html',
          controller: 'CartCtrl'
        });
      $locationProvider.html5Mode(true);
    });

})();
