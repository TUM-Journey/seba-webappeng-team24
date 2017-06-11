'use strict'

themeConfig.$inject = ['ngMaterial'];

export default function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');
}