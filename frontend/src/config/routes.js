'use strict';

import LoginComponent from './../components/view-login/view-login.component';
import ViewHomeComponent from './../components/view-home/view-home.component';
import RegisterComponent from './../components/view-register/view-register.component';

import DashboardComponent from '../components/dashboard/dashboard.component';
import FeedbackGiveComponent from '../components/dashboard/feedback-give/feedback-give.component';
import FeedbackMineInboundComponent from '../components/dashboard/feedback-mine-inbound/feedback-mine-inbound.component';
import FeedbackMineOutboundComponent from '../components/dashboard/feedback-mine-outbound/feedback-mine-outbound.component';

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
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
    .state('dashboard.feedback-mine-inbound', {
      url: '/feedback/mine/inbound',
      views: {
        'dashboard': {
          component: FeedbackMineInboundComponent.name
        }
      }
    })
    .state('dashboard.feedback-mine-outbound', {
      url: '/feedback/mine/outbound',
      views: {
        'dashboard': {
          component: FeedbackMineOutboundComponent.name
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
  $urlRouterProvider.when('/dashboard', '/dashboard/feedback/mine/inbound');
}

