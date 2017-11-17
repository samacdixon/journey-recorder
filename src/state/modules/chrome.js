import { takeScreenshot } from 'lib/chrome-utils';

// Aliases
const GET_TAB_ID = 'alias/chrome/GET_TAB_ID';
const CAPTURE_SCREENSHOT = 'alias/chrome/CAPTURE_SCREENSHOT';

export const aliases = {
  [GET_TAB_ID]: (action) => {
    action.promise = Promise.resolve({ payload: action._sender.tab.id });
    return action;
  },
  [CAPTURE_SCREENSHOT]: (action) => {
    action.promise = takeScreenshot().then((dataUrl) => {
      return { 
        payload: dataUrl 
      };
    });
    return action;
  },
}

// Action Creators
export function getTabId() {
  return {
    type: GET_TAB_ID,
  };
}

export function captureScreenshot() {
  return {
    type: CAPTURE_SCREENSHOT,
  };
}
