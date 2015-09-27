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
        .state('store', {
          url: '/store',
          templateUrl: 'app/views/store/store.view.html',
          controller: 'StoreCtrl'
        })
        .state('auth', {
          url: '/auth',
          templateUrl: 'app/views/auth/auth.view.html',
          controller: 'AuthCtrl'
        })
        .state('auth.login', {
          url: '/login',
          templateUrl: 'app/views/auth/auth.login.view.html',
          view: 'account',
          controller: 'AuthCtrl'
        })
        .state('auth.create', {
          url: '/create',
          templateUrl: 'app/views/auth/auth.create.view.html',
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
          url: '/product/:productCode',
          templateUrl: 'app/views/product/product.view.html',
          controller: 'ProductCtrl'
        })
        .state('cart', {
          url: '/cart',
          templateUrl: 'app/views/cart/cart.view.html',
          controller: 'CartCtrl'
        })
        .state('test', {
          url: '/test',
          templateUrl: 'app/views/testing/test.view.html',
          controller: 'TestCtrl'
        });
      $locationProvider.html5Mode(true);
    });

})();
