'use strict';

import angular from 'angular';
import DashboardComponent from './dashboard.component';

import DashboardMenuComponent from './dashboard-menu/dashboard-menu';
import FeedbackGiveComponent from './feedback-give/feedback-give';
import FeedbackMineInboundComponent from './feedback-mine-inbound/feedback-mine-inbound';
import FeedbackMineOutboundComponent from './feedback-mine-outbound/feedback-mine-outbound';

export default angular.module('Dashboard', [
  DashboardMenuComponent.name,
  FeedbackGiveComponent.name,
  FeedbackMineInboundComponent.name,
  FeedbackMineOutboundComponent.name
]).component(DashboardComponent.name, new DashboardComponent);
