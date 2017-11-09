import MODE_LISTENERS from './listeners'
import { EVENTS } from './config';

class PageRecorder {
	constructor(eventEmitter) {
		this.eventEmitter = eventEmitter;
	}

	removeActiveListener() {
		if (this.activeListener) {
			this.activeListener.disconnect();
			this.activeListener = null;
		}
	}

	setMode(mode) {
		this.removeActiveListener();
		const listener = MODE_LISTENERS[mode];
		listener.connect(this.eventEmitter);
		this.activeListener = listener;
		this.eventEmitter.emit(EVENTS.MODE_SET, mode);
	}

	isActive() {
		return !!this.activeListener;
	}

	stopRecording() {
		this.removeActiveListener();
		this.eventEmitter.emit(EVENTS.STOPPED_RECORDING);
	}
}

export default PageRecorder;