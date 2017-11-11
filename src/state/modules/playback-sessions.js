// Actions
const prefix = 'playback-sessions/';

const START_SESSION = `${prefix}START_SESSION`;
const END_SESSION = `${prefix}END_SESSION`;

// Reducer
export default function reducer(state = {}, action = {}) {
  const reqTabId = (action._sender && action._sender.tab && action._sender.tab.id) || action.tabId;
  let session;
  switch (action.type) {
    case START_SESSION:
      return Object.assign({}, state, {
        [reqTabId]: {
          journeyId: action.journeyId,
        },
      });

    case END_SESSION:
      let newState = Object.assign({}, state)
      delete newState[reqTabId];
      return newState;

    default:
      return state;
  }
}

// Action Creators
export function startSession(tabId, journeyId) {
  return {
    type: START_SESSION,
    tabId,
    journeyId,
  };
}

export function endSession() {
  return {
    type: END_SESSION,
  };
}