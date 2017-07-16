'use strict';

import angular from 'angular';
import FeedbackRequestComponent from './feedback-request.component'

export default angular.module('FeedbackRequest', [])
  .component(FeedbackRequestComponent.name, new FeedbackRequestComponent);
