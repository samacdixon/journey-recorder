// Actions
const prefix = 'recording-sessions/';

const START_SESSION = `${prefix}START_SESSION`;
const END_SESSION = `${prefix}END_SESSION`;
const SET_MODE = `${prefix}SET_MODE`;
const REVERSE_MODE = `${prefix}REVERSE_MODE`;
const RECORD_STEP = `${prefix}RECORD_STEP`;
const STAGE_STEP = `${prefix}STAGE_STEP`;
const UNSTAGE_STEP = `${prefix}UNSTAGE_STEP`;

// Reducer
export default function reducer(state = {}, action = {}) {
  const reqTabId = (action._sender && action._sender.tab && action._sender.tab.id) || action.tabId;
  let session;
  switch (action.type) {
    case START_SESSION:
      return Object.assign({}, state, {
        [reqTabId]: {
          currentMode: null,
          previousMode: null,
          steps: [],
        },
      });

    case END_SESSION:
      let newState = Object.assign({}, state)
      delete newState[reqTabId];
      return newState;

    case SET_MODE:
      const currentMode = state[reqTabId].currentMode;
      session = Object.assign({}, state[reqTabId], {
        currentMode: action.mode,
        previousMode: currentMode,
      });
      if (!currentMode) {
        session.steps = [
          ...session.steps,
          {
            type: 'location',
            url: action._sender.url,
          }
        ];
      }
      return Object.assign({}, state, {
        [reqTabId]: session,
      });

    case REVERSE_MODE:
      session = Object.assign({}, state[reqTabId], {
        currentMode: state[reqTabId].previousMode,
        previousMode: state[reqTabId].currentMode,
      });
      return Object.assign({}, state, {
        [reqTabId]: session,
      });

    case RECORD_STEP:
      session = Object.assign({}, state[reqTabId], {
        steps: [
          ...state[reqTabId].steps,
          Object.assign({}, action.step, {
            url: action._sender.url,
          }),
        ],
      });
      return Object.assign({}, state, {
        [reqTabId]: session,
      });

    case STAGE_STEP:
      session = Object.assign({}, state[reqTabId], {
        stagedStep: Object.assign({}, action.step, {
          url: action._sender.url,
        }),
      });
      return Object.assign({}, state, {
        [reqTabId]: session,
      });

    case UNSTAGE_STEP:
      session = Object.assign({}, state[reqTabId], {
        stagedStep: null,
      });
      return Object.assign({}, state, {
        [reqTabId]: session,
      });

    default:
      return state;
  }
}

// Action Creators
export function recordStep(step) {
  return {
    type: RECORD_STEP,
    step,
  };
}

export function stageStep(step) {
  return {
    type: STAGE_STEP,
    step,
  };
}

export function unstageStep() {
  return {
    type: UNSTAGE_STEP,
  };
}

export function setMode(mode, tabId) {
  return {
    type: SET_MODE,
    mode,
    tabId,
  };
}

export function reverseMode() {
  return {
    type: REVERSE_MODE,
  };
}

export function startSession(tabId) {
  return {
    type: START_SESSION,
    tabId,
  };
}

export function endSession() {
  return {
    type: END_SESSION,
  };
}