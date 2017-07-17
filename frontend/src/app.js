'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';
import ngFileSaver from 'angular-file-saver'
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import 'angular-material/angular-material.css';

import UserService from './services/user/user';
import FeedbackService from './services/feedback/feedback';
import FormService from './services/form/form';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewHome from './components/view-home/view-home';
import ViewLogin from './components/view-login/view-login';
import ViewRegister from './components/view-register/view-register';
import config from './config/config'
import Dashboard from './components/dashboard/dashboard';

let app = angular.module('app', [
  uiRouter,
  ngResource,
  ngFileSaver,
  ngMaterial,
  ngMdIcons,
  UserService.name,
  FeedbackService.name,
  FormService.name,

  AppContent.name,
  ViewHome.name,
  ViewLogin.name,
  ViewRegister.name,

  Dashboard.name
]);


console.log(config.api_url)
app.constant('API_URL', config.api_url);
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function () {
  return angular.bootstrap(document.body, [app.name], {
    strictDi: true
  });
});

export default app;
