import React, {Component} from 'react';
import {connect} from 'react-redux';
import EventEmitter from 'EventEmitter';
import Dock from './components/dock';
import Saver from './components/saver';
import Stager from './components/stager';
import PageRecorder from 'content/services/recorder';
import {
  EVENTS,
  ACTION_TYPES,
} from 'content/services/recorder/config';
import {
  recordStep,
  setMode,
  reverseMode,
  endSession,
  stageStep,
  unstageStep,
} from 'state/modules/recording-sessions';
import {
  saveJourney,
} from 'state/modules/journeys';
import {
  getTabId,
  captureScreenshot,
} from 'state/modules/chrome';
import {
  RECORD_MODES,
  DEFAULT_RECORD_MODE,
} from 'config';

class Recorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabId: null,
      isSaving: false,
    };

    this.props.getTabId((tabId) => {
      this.setState({ tabId })
    });

    this.setupEventEmitter();
    this.pageRecorder = new PageRecorder(this.eventEmitter);
  }
  
  setupEventEmitter() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on(EVENTS.ACTION_RECORDED, this.handleAction.bind(this));
    this.eventEmitter.on(EVENTS.MODE_SET, this.handleModeChange.bind(this));
    this.eventEmitter.on(EVENTS.STOPPED_RECORDING, this.handleModeChange.bind(this, RECORD_MODES.SAVING));
  }

  handleAction(step) {
    if (step.type === ACTION_TYPES.LOCATE) {
      this.props.stageStep(step);
    } else {
      this.props.recordStep(step);
    }
  }

  handleModeChange(mode) {
    // required due to page load/reloads
    if (mode !== this.activeSession().currentMode) {
      this.props.setMode(mode);
    }
  }

  activeSession() {
    return this.state.tabId && this.props.sessions[this.state.tabId];
  }

  isSaving(session) {
    return session.currentMode === RECORD_MODES.SAVING;
  }

  isStaging(session) {
    return session.currentMode === RECORD_MODES.STAGING;
  }

  componentDidUpdate(prevProps, prevState) {
    const session = this.activeSession();
    if (!session) return;

    const isRecording = this.pageRecorder.isActive();
    const isSaving = this.isSaving(session);
    const isStaging = this.isStaging(session);

    if (!session.currentMode) { // start recording
      this.pageRecorder.setMode(DEFAULT_RECORD_MODE);   
    } else if (!isRecording && !isSaving && !isStaging) { // page load/reload OR reverse mode (i.e. cancel 'stop recording')
      this.pageRecorder.setMode(session.currentMode);
    } else if (isRecording && isSaving) { // popup set mode to saving
      this.pageRecorder.stopRecording();
    }
  }

  render() {
    const session = this.activeSession(); 
    if (!session) return null;
    if (this.isSaving(session)) return <Saver onCancel={this.props.reverseMode} onDiscard={this.props.endSession.bind(null, null)} onSave={this.props.endSession.bind(null, this.activeSession().steps)} />;
    else if (this.isStaging(session)) return <Stager step={session.stagedStep} onDiscard={this.props.unstageStep} onCommit={this.props.commitStagedStep} />
    return <Dock session={session} setMode={(mode) => this.pageRecorder.setMode(mode)} stop={() => this.pageRecorder.stopRecording()} stageScreenshot={this.props.stageScreenshot} />;
  }
}

const mapStateToProps = (state) => {
  return {
    sessions: state.recordingSessions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabId: (setState) => {
      dispatch(getTabId()).then((tabId) => {
        setState(tabId);
      });
    },
    recordStep: (step) =>  dispatch(recordStep(step)),
    stageStep: (step) => {
      dispatch(stageStep(step)).then(() => {
        dispatch(setMode(RECORD_MODES.STAGING));
      });
    },
    unstageStep: () => { 
      dispatch(unstageStep()).then(() => {
        dispatch(reverseMode());
      });
    },
    commitStagedStep: (step) => {
      dispatch(recordStep(step)).then(() => {
        return dispatch(unstageStep());
      }).then(() => {
        dispatch(reverseMode());
      });
    },
    stageScreenshot: () => {
      dispatch(captureScreenshot()).then((dataUrl) => {
        return dispatch(stageStep({ 
          type: ACTION_TYPES.SCREENSHOT,
          dataUrl,
        }));
      }).then(() => {
        dispatch(setMode(RECORD_MODES.STAGING));
      });
    },
    setMode: (mode) =>  dispatch(setMode(mode)),
    reverseMode: () => dispatch(reverseMode()),
    endSession: (steps, name) => {
      let ready = Promise.resolve();
      if (steps && name) ready = dispatch(saveJourney(name, steps));
      ready.then(() => {
        dispatch(endSession());
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
