'use strict';

import LoginComponent from './../components/view-login/view-login.component';
import ViewHomeComponent from './../components/view-home/view-home.component';
import RegisterComponent from './../components/view-register/view-register.component';

import DashboardComponent from '../components/dashboard/dashboard.component';
import FeedbackGiveComponent from '../components/dashboard/feedback-give/feedback-give.component';
import FeedbackMineComponent from '../components/dashboard/feedback-mine/feedback-mine.component';

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('/', {
      url: '/',
      component: ViewHomeComponent.name
    })
    .state('login', {
      url: '/login',
      component: LoginComponent.name
    })
    .state('dashboard', {
      url: '/dashboard',
      abstract: true,
      component: DashboardComponent.name
    })
    .state('dashboard.feedback-give', {
      url: '/feedback/give',
      views: {
        'dashboard': {
          component: FeedbackGiveComponent.name
        }
      }
    })
    .state('dashboard.feedback-mine', {
      url: '/feedback/mine',
      views: {
        'dashboard': {
          component: FeedbackMineComponent.name
        }
      }
    })
    .state('register', {
      url: '/register',
      component: RegisterComponent.name
    });

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  // Redirect from abstract /dashboard to a child page
  $urlRouterProvider.when('/dashboard', '/dashboard/feedback/mine');
}

