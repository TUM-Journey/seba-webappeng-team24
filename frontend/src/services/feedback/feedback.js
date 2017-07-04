'use strict';

import angular from 'angular';
import FeedbackService from './feedback.service';

export default angular.module('FeedbackService', [])
  .service(FeedbackService.name, FeedbackService);
