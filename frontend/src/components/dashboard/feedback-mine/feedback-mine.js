'use strict';

import angular from 'angular';
import FeedbackMineComponent from './feedback-mine.component';

export default angular.module('FeedbackMine', [])
  .component(FeedbackMineComponent.name, new FeedbackMineComponent);
