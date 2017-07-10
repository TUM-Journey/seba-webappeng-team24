'use strict';

import angular from 'angular';
import FeedbackReviewComponent from './feedback-review.component';

export default angular.module('FeedbackReview', [])
  .component(FeedbackReviewComponent.name, new FeedbackReviewComponent);
