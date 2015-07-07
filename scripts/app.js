'use strict';

/**
 * @ngdoc overview
 * @name daksportsApp
 * @description
 * # daksportsApp
 *
 * Main module of the application.
 */
angular
    .module('daksportsApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'angularFileUpload'
    ])
    .config(function($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider) {
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                //controller: 'MainCtrl'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html',
                controller: 'TestCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'MainCtrl as main'
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
                //controller: 'AdminCtrl'
            })
            .state('list', {
                url: '/admin/list',
                templateUrl: 'views/admin/list.html',
                //controller: 'AdminCtrl'
            })
            .state('add', {
                url: '/admin/add',
                templateUrl: 'views/admin/add.html',
                controller: 'AddProductCtrl'
            })
            .state('edit', {
                url: '/admin/edit',
                templateUrl: 'views/admin/edit.html',
                //controller: 'AdminCtrl'
            })
            .state('search', {
                url: '/admin/search',
                templateUrl: 'views/admin/search.html',
                //controller: 'AdminCtrl'
            });
        $locationProvider.html5Mode(true);
        $mdThemingProvider.theme('default')
            .primaryPalette('red', {
                'default': '900',
                'hue-1': '700',
                'hue-2': '500',
                'hue-3': '50'
            })
            .accentPalette('red', {
                'default': 'A700'
            });
    });
