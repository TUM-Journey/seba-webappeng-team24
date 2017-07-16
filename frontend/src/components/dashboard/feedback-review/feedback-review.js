'use strict'

import angular from 'angular';
import FeedbackReviewComponent from './feedback-review.component';
import ngFileSaver from 'angular-file-saver';

export default angular.module('FeedbackReview', [ngFileSaver])
  .component(FeedbackReviewComponent.name, new FeedbackReviewComponent);
