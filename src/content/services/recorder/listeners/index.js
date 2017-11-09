import Listener from './listener';
import clickRecorder from './behaviour/click';
import keypressRecorder from './behaviour/keypress';
import locator from './behaviour/locator';
import { RECORD_MODES } from 'config';

const navigationListener = new Listener([
    clickRecorder.begin,
    keypressRecorder.begin
], [
    clickRecorder.stop,
    keypressRecorder.stop
]);

const locatorListener = new Listener([
    locator.begin
], [
    locator.stop
]);


export default {
    [RECORD_MODES.NAVIGATE]: navigationListener,
    [RECORD_MODES.LOCATE]: locatorListener,
}