import React, { Component } from 'react';
import Row from './row';
import ReactSVG from 'react-svg';

const clockIcon = require('popup/assets/images/clock-icon.svg');

class Playback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isPlaying) {
            const rows = this.props.journeys.map(journey => <Row journey={journey} onClick={this.props.playbackJourney} />)
            
            return (
                <div className='playback'>
                    <ReactSVG path={clockIcon} />
                    <h2>Recent Recordings</h2>
                    <ul>
                        {rows}
                    </ul>
                </div>
            );
        }
        return <div className='btn stop-btn' onClick={this.props.stopPlaying}>End Playback</div>
    }
}

export default Playback;
