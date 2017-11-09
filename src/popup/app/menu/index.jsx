import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecordOptions from './record-options';
import Playback from './playback';
import {
  startSession,
  setMode,  
} from 'state/modules/recording-sessions';
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

  isRecording() {
    return this.props.recordingSessions &&
      this.props.currentTabId && 
      this.props.recordingSessions[this.props.currentTabId];
  }

  render() {
    const isRecording = this.isRecording();

    return (
        <div className='menu'>
            <div>
              {
                !isRecording && <Playback journeys={this.props.recentJourneys} />
              }
              <RecordOptions isRecording={isRecording} startRecording={this.props.startSession(this.props.currentTabId)} stopRecording={this.props.stopRecording(this.props.currentTabId)} />
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recordingSessions: state.recordingSessions,
    recentJourneys: (state.journeys && state.journeys.recent) || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startSession: (tabId) => () => {
      dispatch(startSession(tabId));
    },
    stopRecording: (tabId) => () => {
      dispatch(setMode(RECORD_MODES.SAVING, tabId));
    },
    getRecentJourneys: () => {
      dispatch(getRecentJourneys()).then((journeys) => {
        dispatch(setRecentJourneys(journeys));
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
