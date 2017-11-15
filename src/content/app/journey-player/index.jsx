import React from 'react';
import StatusBar from './components/status-bar';
const JOURNEY = {
  'dateCreated': '2017-11-13T20:19:32.125Z',
  'id': '7b8aa403-4951-4181-a9f0-2ca37c2c5af2',
  'lastUpdated': '2017-11-13T20:19:32.125Z',
  'name': 'Try this one',
  'steps': [
    {
      'type': 'location',
      'url': 'https://www.google.co.uk/'
    },
    {
      'selector': '#lst-ib',
      'type': 'click',
      'url': 'https://www.google.co.uk/'
    },
    {
      'key': 115,
      'type': 'keypress',
      'url': 'https://www.google.co.uk/'
    },
    {
      'key': 115,
      'type': 'keypress',
      'url': 'https://www.google.co.uk/'
    },
    {
      'key': 115,
      'type': 'keypress',
      'url': 'https://www.google.co.uk/'
    },
    {
      'key': 115,
      'type': 'keypress',
      'url': 'https://www.google.co.uk/'
    },
    {
      'selector': ':nth-child(1) > .srg > :nth-child(1) > :nth-child(1) > .rc > .r > a',
      'type': 'click',
      'url': 'https://www.google.co.uk/search?source=hp&ei=lvUJWsHaNcvQgAbG7YGYDw&q=ssssssssssssssssss&oq=ssss&gs_l=psy-ab.1.0.35i39k1j0i67k1l2j0i20i263k1j0i67k1j0j0i10k1j0l3.2220652.2221578.0.2222927.7.5.0.0.0.0.76.276.4.5.0....0...1.1.64.psy-ab..2.5.379.6..0i131k1j0i46i67k1j46i67k1.104.QWOgD1khh5U'
    }
  ]
};

export default class JourneyPlayer extends React.Component {
  constructor(){
    super();
    this.state = { value: 0, previous: 0 };
  }

  updateIndex(index) {
    this.setState({ value: index, previous: this.state.value });    
  }

  render() {
    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
          <StatusBar
            index={this.state.value}
            indexClick={this.updateIndex.bind(this)}
            journey={ JOURNEY } />
        </div>
        <div className='text-center'>
          {/* any arbitrary component can go here */}    
          {this.state.value}
        </div>
      </div>
    );
  }
}
