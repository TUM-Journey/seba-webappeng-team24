'use strict';

import FeedbackService from '../../../services/feedback/feedback.service';
import UserService from '../../../services/user/user.service';
import template from './feedback-review.template.html';
import './feedback-review.style.css';

class FeedbackReviewComponent {
  constructor() {
    this.controller = FeedbackReviewComponentController;
    this.template = template;

  }

  static get name() {
    return 'feedbackReview';
  }
}

class FeedbackReviewComponentController {

  constructor($scope, $state, feedbackService, userService) {
    this.$state = $state;
    this.feedbackService = feedbackService;
    this.userService = userService;

    this.users = userService.fetchAllUsers();

    this.selectedUser = null;
    this.feedbacks = null;
    this.avgMatrix = null;
  }

  refreshFeedbacks() {
    if (!this.selectedUser) {
      this.feedbacks = [];
      return;
    }

    this.feedbacks = this.feedbackService.listAll({username: this.selectedUser.username});
  }

  refreshAvgMatrix() {
    if (!this.selectedUser) {
      this.avgMatrix = null;
      return;
    }

    this.avgMatrix = this.feedbackService.userAvgMatrix({username: this.selectedUser.username});
  }

  static get $inject() {
    return ['$scope', '$state', FeedbackService.name, UserService.name];
  }
}


export default FeedbackReviewComponent;
