'use strict';

import angular from 'angular';
import FeedbackMineInboundComponent from './feedback-mine-inbound.component';

export default angular.module('FeedbackMineInbound', [])
  .component(FeedbackMineInboundComponent.name, new FeedbackMineInboundComponent);
