
'use strict';

import template from './view-home.template.html';

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