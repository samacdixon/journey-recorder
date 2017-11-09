import $ from 'jquery';
import unique from 'unique-selector';
import {
	EVENTS,
	ACTION_TYPES,
} from '../../config';
import {
	isExtensionElement
} from '../helpers';

function begin(eventEmitter) {
	$(document).click(function (e) {
		if (isExtensionElement(e)) return;
		eventEmitter.emit(EVENTS.ACTION_RECORDED, {
			type: ACTION_TYPES.CLICK,
			selector: unique(e.target),
		});
	});
}

function stop() {
	$(document).off('click');
}

const clickRecorder = {
	begin,
	stop,
};

export default clickRecorder;