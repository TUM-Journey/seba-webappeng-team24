'use strict';

import angular from 'angular';
import FeedbackMineOutboundComponent from './feedback-mine-outbound.component';

export default angular.module('FeedbackMineOutbound', [])
  .component(FeedbackMineOutboundComponent.name, new FeedbackMineOutboundComponent);
