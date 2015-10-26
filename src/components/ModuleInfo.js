import EventEmitter from 'events';
import { markdown } from 'markdown';

var converter = markdown.toHTML;

class ModuleInfo extends EventEmitter {
    constructor() {
        super();

        this.el = document.querySelector('.node-info');

        this.elements();
        this.listeners();

        this.module = {};
    }

    elements() {
        this.name = this.el.querySelector('.node-name');
        this.description = this.el.querySelector('.node-description');
        this.exports = this.el.querySelector('.node-exports');
        this.hideBtn = this.el.querySelector('.node-info__hide');
    }

    listeners() {
        this.hideBtn.addEventListener('click', this.hide.bind(this));
    }

    show(module) {
        this.el.classList.add('visible');

        if (module) {
            this.module = module;
        }
    }

    hide() {
        this.el.classList.remove('visible');

        this.module = {};
    }

    set module(data) {
        this.name.innerText = data.name || 'Unknown';
        this.description.innerHTML = data.description ?
            converter(data.description) :
            'This module has no description yet.';

        this.exports.innerHTML = JSON.stringify(data.exports || {});
    }
}

export default new ModuleInfo();