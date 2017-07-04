'use strict';

import angular from 'angular';
import DashboardComponent from './dashboard.component';

import DashboardMenuComponent from './dashboard-menu/dashboard-menu';
import FeedbackGiveComponent from './feedback-give/feedback-give';
import FeedbackMineComponent from './feedback-mine/feedback-mine';

export default angular.module('Dashboard', [
  DashboardMenuComponent.name,
  FeedbackGiveComponent.name,
  FeedbackMineComponent.name
]).component(DashboardComponent.name, new DashboardComponent);
