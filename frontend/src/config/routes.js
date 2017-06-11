'use strict';

import LoginComponent from './../components/view-login/view-login.component';
import ViewHomeComponent from './../components/view-home/view-home.component';


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('/', {
            url: '/',
            component: ViewHomeComponent.name
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name,
        })


}

