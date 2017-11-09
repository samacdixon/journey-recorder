import uuidv4 from 'uuid/v4';
import {
    storeJourney,
    getRecentJourneys as retrieveRecentJourneys,
} from 'lib/chrome-utils';

// Aliases
const SAVE_JOURNEY = 'alias/journeys/SAVE_JOURNEY';
const GET_RECENT_JOURNEYS = 'alias/journeys/GET_RECENT_JOURNEYS';

export const aliases = {
    [SAVE_JOURNEY]: (action) => {
        if (!action.journey) {
            action.promise = Promise.reject(new Error('Journey not specified'));
        } else {
            const now = new Date().toJSON();
            if (!action.journey.id) {
                action.journey.id = uuidv4();
                action.journey.dateCreated = now;
            }
            action.journey.lastUpdated = now;
            action.promise = storeJourney(action.journey);
        }
        return action;
    },
    [GET_RECENT_JOURNEYS]: (action) => {
        action.promise = retrieveRecentJourneys().then((journeys) => {
            return { payload: journeys };
        });

        return action;
    },
}

export function saveJourney(name, steps) {
    return {
        type: SAVE_JOURNEY,
        journey: {
            name,
            steps,
        },
    };
}

export function getRecentJourneys() {
    return {
        type: GET_RECENT_JOURNEYS,
    };
}

// Actions
const prefix = 'journeys/';

const SET_RECENT_JOURNEYS = `${prefix}SET_RECENT_JOURNEYS`;

// Reducer
export default function reducer(state = { all: [], recent: []}, action = {}) {
  switch (action.type) {
    case SET_RECENT_JOURNEYS:
      return Object.assign({}, state, {
        recent: action.journeys
      });

    default:
      return state;
  }
}

export function setRecentJourneys(journeys) {
    return {
        type: SET_RECENT_JOURNEYS,
        journeys,
    };
}
