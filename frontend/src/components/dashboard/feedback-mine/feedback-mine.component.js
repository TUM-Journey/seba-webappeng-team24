'use strict';

import template from './feedback-mine.template.html';
import './feedback-mine.style.css';

class FeedbackMineComponent {
  constructor() {
    this.controller = FeedbackMineComponentController;
    this.template = template;

  }

  static get name() {
    return 'feedbackMine';
  }
}

class FeedbackMineComponentController {

  constructor($scope, $state, feedbackService) {
    this.$state = $state;
    this.feedbackService = feedbackService;

    this.feedbacks = this.feedbackService.query();
  }

  static get $inject() {
    return ['$scope', '$state', 'feedbackService'];
  }
}


export default FeedbackMineComponent;
