'use strict';

import LoginComponent from './../components/view-login/view-login.component';
import ViewHomeComponent from './../components/view-home/view-home.component';
import ViewGiveFeedbackComponent from './../components/feedback/view-give-feedback/view-give-feedback.component';


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
        .state('giveFeedback', {
            url: '/feedback/give-feedback',
            component: ViewGiveFeedbackComponent.name,
        })


}

