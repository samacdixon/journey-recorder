import $ from 'jquery';
import unique from 'unique-selector';
import {
    EVENTS,
    ACTION_TYPES,
} from '../../config';
import { isExtensionElement } from '../helpers';

function begin(eventEmitter) {
    $(document).mouseover((e) => {
        if (isExtensionElement(e)) return;
        $(e.target).css("outline","solid 5px #2da56d");
    }).mouseout((e) => {
        $(e.target).css("outline","transparent");
    });
    $(document).click((e) => {
        if (isExtensionElement(e)) return;
        e.preventDefault();
        eventEmitter.emit(EVENTS.ACTION_RECORDED, {
            type: ACTION_TYPES.LOCATE,
            selector: unique(e.target),
            innerHtml: e.target.innerHTML,
            innerText: e.target.innerText,
        })
    });    
}

function stop() {
    $(document).off('click');
    $(document).off('mouseover');
    $(document).off('mouseout');
}

const keypressRecorder = {
    begin,
    stop,
};

export default keypressRecorder;
