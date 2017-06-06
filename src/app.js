'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import UserService from './services/user/user';

import Routes from './config/routes';
import Middlewares from './config/middlewares';
import ThemeConfig from './config/theme-config';

import AppContent from './components/app-content/app-content';
import ViewHome from './components/view-home/view-home';
import ViewLogin from './components/view-login/view-login';

let app = angular.module('app', [
    uiRouter,
    ngMaterial,
    ngMdIcons,
    UserService.name,
    AppContent.name,
    ViewHome.name,
    ViewLogin.name
]);
console.log(ngMaterial);


app.constant('API_URL', 'http://5aee6f28.ngrok.io/api');
app.config(Routes);
app.config(Middlewares);
// app.config(ThemeConfig);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;