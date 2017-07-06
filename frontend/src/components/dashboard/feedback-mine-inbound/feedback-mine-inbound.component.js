'use strict';

import template from './feedback-mine-inbound.template.html';
import './feedback-mine-inbound.style.css';

class FeedbackMineInboundComponent {
  constructor() {
    this.controller = FeedbackMineInboundComponentController;
    this.template = template;

  }

  static get name() {
    return 'feedbackMineInbound';
  }
}

class FeedbackMineInboundComponentController {

  constructor($scope, $state, feedbackService) {
    this.$state = $state;
    this.feedbackService = feedbackService;

    this.feedbacks = this.feedbackService.listMineInbound();
  }

  static get $inject() {
    return ['$scope', '$state', 'feedbackService'];
  }
}


export default FeedbackMineInboundComponent;
