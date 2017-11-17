import React, {Component} from 'react';
import Recorder from './recorder';
import JourneyPlayer from './journey-player';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='jr-app'>
        <Recorder/>
        {/* <JourneyPlayer/> */}
      </div>
    );
  }
}

export default App;
