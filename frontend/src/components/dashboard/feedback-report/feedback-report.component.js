'use strict';

import FeedbackService from '../../../services/feedback/feedback.service';
import UserService from '../../../services/user/user.service';
import template from './feedback-report.template.html';
import './feedback-report.style.css';
import jspdf from 'jspdf';
import html2pdf from './html2pdf'
import html2canvas from 'html2canvas'

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
	generatePdf() {
		html2canvas(document.getElementsByClassName('pdf-area')).then(function (canvas) {
			var img = canvas.toDataURL("image/jpeg,1.0");
			var pdf = new jspdf('portrait');
			pdf.addImage(img, 'JPEG', 0, 0);
			// pdf.autoPrint()
			pdf.save('test.pdf')
		})
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
