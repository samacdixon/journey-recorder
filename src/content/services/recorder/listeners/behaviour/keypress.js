 import $ from 'jquery';
 import {
     EVENTS,
     ACTION_TYPES,
 } from '../../config';

 function begin(eventEmitter) {
     $(document).keypress(function (e) {
         eventEmitter.emit(EVENTS.ACTION_RECORDED, {
             type: ACTION_TYPES.KEYPRESS,
             key: e.which,
         });
     });
 }

 function stop() {
     $(document).off('keypress');
 }

 const keypressRecorder = {
     begin,
     stop,
 };

 export default keypressRecorder;
