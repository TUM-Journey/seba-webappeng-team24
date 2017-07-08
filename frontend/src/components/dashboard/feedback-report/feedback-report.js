
'use strict';

import angular from 'angular';
import FeedbackReportComponent from './feedback-report.component';

export default angular.module('FeedbackReport', [])
	.component(FeedbackReportComponent.name, new FeedbackReportComponent);
