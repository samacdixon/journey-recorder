import React, {Component} from 'react';
import Recorder from './recorder';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='jr-app'>
        <Recorder/>
      </div>
    );
  }
}

export default App;
