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
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'views/test.html',
                controller: 'TestCtrl'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'views/account.html',
                controller: 'AccountCtrl as account'
            })
            .state('account.login', {
                url: '/login',
                templateUrl: 'views/account.login.html',
                view: 'account',
                controller: 'LoginCtrl'
            })
            .state('account.signup', {
                url: '/signup',
                templateUrl: 'views/account.signup.html',
                view: 'account',
                controller: 'SignupCtrl'
            })
            .state('new', {
                url: '/new',
                templateUrl: 'views/new.html',
                //controller: 'AboutCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                //controller: 'ContactCtrl'
            })
            .state('support', {
                url: '/support',
                templateUrl: 'views/support.html',
                //controller: 'AdminCtrl'
            })
            .state('promos', {
                url: '/promos',
                templateUrl: 'views/promos.html',
                //controller: 'AdminCtrl'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/list.html',
                controller: 'ListCtrl'
            })
            .state('list', {
                url: '/admin/list',
                templateUrl: 'views/admin/list.html',
                controller: 'ListCtrl'
            })
            .state('add', {
                url: '/admin/add',
                templateUrl: 'views/admin/add.html',
                controller: 'AddProductCtrl'
            })
            .state('edit', {
                url: '/admin/edit/:productId',
                templateUrl: 'views/admin/edit.html',
                controller: 'EditProductCtrl'
            })
            .state('search', {
                url: '/admin/search',
                templateUrl: 'views/admin/search.html',
                //controller: 'AdminCtrl'
            })
            .state('product', {
                url: '/product/:productId',
                templateUrl: 'templates/product.single.html',
                controller: 'ProductCtrl'
            });
        $locationProvider.html5Mode(true);
    });
