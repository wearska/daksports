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
        'ui.router'
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
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                //controller: 'AboutCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                //controller: 'ContactCtrl'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin.html',
                //controller: 'AdminCtrl'
            })
            .state('promos', {
                url: '/promos',
                templateUrl: 'views/promos.html',
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
            .accentPalette('orange', {
                'default': 'A700'
            })
            .backgroundPalette('grey', {
                'default': '50'
            });
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('grey', {
                'default': '50'
            })
            .dark();
    });
