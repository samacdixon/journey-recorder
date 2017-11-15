import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecordOptions from './record-options';
import Playback from './playback';
import {
  startSession,
  setMode,  
} from 'state/modules/recording-sessions';
import {
  startSession as startPlaybackSession,  
} from 'state/modules/playback-sessions';
import {
  getRecentJourneys,
  setRecentJourneys,  
} from 'state/modules/journeys';
import {
  RECORD_MODES,
} from 'config';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.props.getRecentJourneys();
  }

  sessionFound(type) {
    return this.props[type] &&
      this.props.currentTabId && 
      this.props[type][this.props.currentTabId];
  }

  render() {
    const isRecording = this.sessionFound('recordingSessions');
    const isPlaying = this.sessionFound('playbackSessions');
    return (
        <div className='menu'>
            <div>
              {
                !isRecording && <Playback journeys={this.props.recentJourneys} isPlaying={isPlaying} playbackJourney={this.props.startPlackback(this.props.currentTabId)} />
              }
              {
                !isPlaying && <RecordOptions isRecording={isRecording} startRecording={this.props.startRecording(this.props.currentTabId)} stopRecording={this.props.stopRecording(this.props.currentTabId)} />
              }
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recordingSessions: state.recordingSessions,
    playbackSessions: state.playbackSessions,
    recentJourneys: (state.journeys && state.journeys.recent) || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startRecording: (tabId) => () => {
      dispatch(startSession(tabId));
    },
    stopRecording: (tabId) => () => {
      dispatch(setMode(RECORD_MODES.SAVING, tabId));
    },
    startPlackback: (tabId) => (journeyId) => {
      dispatch(startPlaybackSession(tabId, journeyId));
    },
    getRecentJourneys: () => {
      dispatch(getRecentJourneys()).then((journeys) => {
        dispatch(setRecentJourneys(journeys));
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
