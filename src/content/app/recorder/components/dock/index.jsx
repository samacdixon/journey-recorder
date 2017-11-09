import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Control from './Control'
import { RECORD_MODES } from 'config';

const navigateIcon = require('content/assets/images/navigate.svg');
const screenshotIcon = require('content/assets/images/screenshot.svg');
const locatorIcon = require('content/assets/images/locate.svg');
const stopIcon = require('content/assets/images/stop.svg');
const pointIcon = require('content/assets/images/point.svg');

class Dock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.session) {
      const stepCount = this.props.session.steps.length;
      return (
        <div className='controls'>
          {/* <div className='feedback'>
              <ReactSVG path={pointIcon} />
              <div className='step-counter'>
                {stepCount}
              </div>
          </div> */}
          <div className='mode'>
            <Control icon={navigateIcon} description="Navigate" isActive={this.props.session.currentMode === RECORD_MODES.NAVIGATE} onClick={this.props.setMode.bind(null, RECORD_MODES.NAVIGATE)} />
            <Control icon={locatorIcon} description="Locate Element" isActive={this.props.session.currentMode === RECORD_MODES.LOCATE} onClick={this.props.setMode.bind(null, RECORD_MODES.LOCATE)} />
            <Control icon={screenshotIcon} description="Take a Screenshot" onClick={this.props.recordStep} />
          </div>
          <div className='session'>
            <Control icon={stopIcon} description="Stop Recording" className={'stop'} onClick={this.props.stop} />
          </div>
        </div>
      );
    }
    return (null);
  }
}

export default Dock;
