'use strict';

import angular from 'angular';
import DashboardComponent from './dashboard.component';

import DashboardMenuComponent from './dashboard-menu/dashboard-menu';
import FeedbackGiveComponent from './feedback-give/feedback-give';

export default angular.module('Dashboard', [
  DashboardMenuComponent.name,
  FeedbackGiveComponent.name
]).component(DashboardComponent.name, new DashboardComponent);
