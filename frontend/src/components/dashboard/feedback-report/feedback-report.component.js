'use strict';
// this will hold a list of reports
import FeedbackService from '../../../services/feedback/feedback.service';
import UserService from '../../../services/user/user.service';
import template from './feedback-report.template.html';
import './feedback-report.style.css';

class FeedbackReportComponent {
	constructor() {
		this.controller = FeedbackReportComponentController;
		this.template = template;

	}

	static get name() {
		return 'feedbackReport';
	}
}

class FeedbackReportComponentController {

	constructor($scope, $state, feedbackService, userService) {
		this.$state = $state;
		this.feedbackService = feedbackService;
		this.userService = userService;

		this.users = userService.listAllUsers();

		this.selectedUser = null;
		this.feedbacks = null;
		this.avgMatrix = null;
		this.check = 0
	}

	refreshFeedbacks() {
		if (!this.selectedUser) {
			this.feedbacks = [];
			return;
		}

		this.feedbacks = this.feedbackService.listAll({ username: this.selectedUser.username });
	}

	refreshAvgMatrix() {
		if (!this.selectedUser) {
			this.avgMatrix = null;
			return;
		}

		this.avgMatrix = this.feedbackService.userAvgMatrix({ username: this.selectedUser.username });
	}

	static get $inject() {
		return ['$scope', '$state', FeedbackService.name, UserService.name];
	}
}


export default FeedbackReportComponent;
