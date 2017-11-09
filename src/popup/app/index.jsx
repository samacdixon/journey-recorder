import React, {Component} from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Menu from './menu';
import styles from 'popup/assets/styles/main.scss';
import { getCurrentTabId } from 'lib/chrome-utils'

const appIcon = require('popup/assets/images/app-icon.png');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    getCurrentTabId().then((id) => {
      this.setState({ currentTabId: id });
    });
  }

  render() {
    return (
      <div className={'popup-container'}>
          {/* <header>
            <img className='app-icon' src={appIcon} />
            <h1><strong>Journey</strong> Recorder</h1>
          </header> */}
          <Menu currentTabId={this.state.currentTabId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recordingSessions: state.recordingSessions,
  };
};

export default connect(mapStateToProps)(App);
