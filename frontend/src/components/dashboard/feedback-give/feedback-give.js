'use strict';

import angular from 'angular';
import FeedbackGiveComponent from './feedback-give.component';

export default angular.module('FeedbackGive', [])
  .component(FeedbackGiveComponent.name, new FeedbackGiveComponent);
