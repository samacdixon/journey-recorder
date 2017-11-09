const prefix = 'pageRecorder/';

export const EVENTS = {
    ACTION_RECORDED: `${prefix}ACTION_RECORDED`,
    MODE_SET: `${prefix}MODE_SET`,
    STOPPED_RECORDING: `${prefix}STOPPED_RECORDING`,
};

export const ACTION_TYPES = {
    CLICK: 'click',
    KEYPRESS: 'keypress',
    LOCATE: 'locate',
};
