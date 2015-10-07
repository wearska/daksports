(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .config(function($mdThemingProvider) {
            $mdThemingProvider.definePalette('lightTheme', {
                '50': 'fafafa',
                '100': 'f5f5f5',
                '200': 'eeeeee',
                '300': 'e0e0e0',
                '400': 'bdbdbd',
                '500': '9e9e9e',
                '600': '757575',
                '700': '616161',
                '800': '424242',
                '900': '212121',
                'A100': 'b71c1c',
                'A200': 'ff5252',
                'A400': 'ff1744',
                'A700': 'd50000',
                'contrastDefaultColor': 'dark', // whether, by default, text (contrast)
                // on this palette should be dark or light
                'contrastLightColors': ['600', '700', //hues which contrast should be 'dark' by default
                    '800', '900', 'A100'
                ],
                'contrastDarkColors': undefined // could also specify this if default was 'dark'
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('lightTheme', {
                    'default': '900',
                    'hue-1': 'A100', // use shade 100 for the <code>md-hue-1</code> class
                    'hue-2': '600' // use shade 600 for the <code>md-hue-2</code> class
                })
                .accentPalette('red', {
                    'default': 'A700'
                });

            var neonRedMap = $mdThemingProvider.extendPalette('red', {
                '900' : 'b71c1c'
            });
            // Register the new color palette map with the name <code>neonRed</code>
            $mdThemingProvider.definePalette('neonRed', neonRedMap);

            $mdThemingProvider.theme('brand')
                .primaryPalette('neonRed', {
                    'default': '900',
                    'hue-1': '700',
                    'hue-2': '500',
                    'hue-3': '50'
                })
                .accentPalette('red', {
                    'default': 'A700'
                });
        });

})();