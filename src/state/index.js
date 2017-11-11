import { combineReducers } from 'redux'
import promiseResponder from './lib/promise-responder';
import journeyReducers, { aliases as journeyAliases } from './modules/journeys';
import { aliases as chromeAliases } from './modules/chrome';
import recordingSessionsReducers from './modules/recording-sessions';
import playbackSessionsReducers from './modules/playback-sessions';

const aliases = Object.assign({}, 
    journeyAliases,
    chromeAliases
);

const reducers = combineReducers({
    recordingSessions: recordingSessionsReducers,
    playbackSessions: playbackSessionsReducers,
    journeys: journeyReducers,
});

export {
    promiseResponder,
    aliases,
    reducers,
}