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
    action.promise = takeScreenshot();
    return action;
  },
}

// Action Creators
export function getTabId() {
  return {
    type: GET_TAB_ID,
  };
}
