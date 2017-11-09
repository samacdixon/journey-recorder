import React, { Component } from 'react';
import Row from './row';

class Playback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = this.props.journeys.map(journey => <Row journey={journey} />)
        
        return (
            <div className='playback'>
                <h2>Recent Recordings</h2>
                <ul>
                    {rows}
                </ul>
            </div>
        );
    }
}

export default Playback;
