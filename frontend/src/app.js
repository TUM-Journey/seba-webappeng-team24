'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';

import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import 'angular-material/angular-material.css';

import UserService from './services/user/user';
import FeedbackService from './services/feedback/feedback';
import EmployeesService from './services/employees/employees';
import MatricesService from './services/matrices/matrices';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewHome from './components/view-home/view-home';
import ViewLogin from './components/view-login/view-login';
import ViewRegister from './components/view-register/view-register';

import Dashboard from './components/dashboard/dashboard';

let app = angular.module('app', [
  uiRouter,
  ngResource,

  ngMaterial,
  ngMdIcons,

  UserService.name,
  FeedbackService.name,
  EmployeesService.name,
  MatricesService.name,

  AppContent.name,
  ViewHome.name,
  ViewLogin.name,
  ViewRegister.name,

  Dashboard.name
]);


app.constant('API_URL', 'http://localhost:8080/api');
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function () {
  return angular.bootstrap(document.body, [app.name], {
    strictDi: true
  });
});

export default app;
