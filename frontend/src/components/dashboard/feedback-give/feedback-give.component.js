
'use strict';


import template from './feedback-give.template.html';
import './feedback-give.style.css';

class FeedbackGiveComponent {
    constructor(){
        this.controller = FeedbackGiveComponentController;
        this.template = template;

    }

    static get name() {
        return 'feedbackGive';
    }


}

class FeedbackGiveComponentController{
    constructor($state, EmployeesService, MatricesService, feedbackService, userService, $mdToast){
      this.EmployeesService = EmployeesService;
      this.MatricesService = MatricesService;
      this.FeedbackService = feedbackService;
      this.$mdToast =  $mdToast;
      this.ratings = [1,2,3,4,5,6,7,8,9,10].reverse();
      this.$state = $state;
      this.employeesList = EmployeesService.listAll();
      this.competencyList = this.MatricesService.getAll();
      this.feedback = {};
      this.currentUser = userService.getCurrentUser();
    }

    $onInit() {
        this.login = {};
    }

    querySearch(term) {
        return this.employeesList;
    }

    submit() {
      this.FeedbackService.addFeedback({
        "username": this.feedback.employee.username,
        "author": this.currentUser.username,
        "formId": "5963f5af0acb3400d5291e77",
        "summary": this.feedback.summary,
        "competencies": Object.keys( this.feedback.characteristics).map((key, index) => {
          return {
            "characteristicId": key,
            "grade": this.feedback.characteristics[key]
          }
        })
      },function () {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Sent successfully')
              .position('top')
              .hideDelay(6000));
        },
        function () {
          alert('error')
        }
      );
    }


    static get $inject(){
        return ['$state','employeesService', 'matricesService', 'feedbackService', 'userService', '$mdToast'];
    }

}


export default FeedbackGiveComponent;
