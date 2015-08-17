'use strict';

/**
 * @ngdoc overview
 * @name daksportsApp
 * @description
 * # daksportsApp
 *
 * Routes for the application.
 */
angular
    .module('daksportsApp')
    .config(function($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main/main.view.html',
                controller: 'MainCtrl'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'views/testing/test.view.html'
                // controller: 'TestCtrl'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'views/account/account.view.html',
                controller: 'AuthCtrl'
            })
            .state('account.login', {
                url: '/login',
                templateUrl: 'views/account/account.login.view.html',
                view: 'account',
                controller: 'AuthCtrl'
            })
            .state('account.signup', {
                url: '/signup',
                templateUrl: 'views/account/account.signup.view.html',
                view: 'account',
                controller: 'AuthCtrl'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminCtrl'
            })
            .state('admin.list', {
                url: '/list',
                templateUrl: 'views/admin/admin.list.view.html',
                view: 'admin',
                controller: 'ListCtrl'
            })
            .state('admin.add', {
                url: '/add',
                templateUrl: 'views/admin/admin.add.view.html',
                controller: 'AddCtrl'
            })
            .state('admin.edit', {
                url: '/edit/:productId',
                templateUrl: 'views/admin/admin.edit.view.html',
                controller: 'EditCtrl'
            })
            .state('product', {
                url: '/product/:productId',
                templateUrl: 'views/product/product.view.html',
                controller: 'ProductCtrl'
            })
            .state('cart', {
                url: '/cart',
                templateUrl: 'views/cart/cart.view.html',
                controller: 'CartCtrl'
            });
        $locationProvider.html5Mode(true);
    });
