
'use strict';

import template from './view-home.template.html';
import './view-home.style.css';

class ViewHomeComponent {
    constructor(){
        this.controller = ViewHomeComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewHome';
    }


}

class ViewHomeComponentController{
    constructor(){

    }

}


export default ViewHomeComponent;