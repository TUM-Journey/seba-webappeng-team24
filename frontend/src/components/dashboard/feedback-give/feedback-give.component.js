
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
    constructor($state){
        this.$state = $state;
        this.employeesList = [
            {name: 'Employee 1'},
            {name: 'Employee 2'},
            {name: 'Employee 3'},
            {name: 'Employee 4'},
            {name: 'Employee 5'},
        ];

        this.competencyList = [
            {name: 'Competency 1'},
            {name: 'Competency 2'},
            {name: 'Competency 3'},
        ]
    }

    $onInit() {
        this.login = {};
    }

    querySearch(term) {
        return this.employeesList;
    }


    static get $inject(){
        return ['$state'];
    }

}


export default FeedbackGiveComponent;
