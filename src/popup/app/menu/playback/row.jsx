import React, { Component } from 'react';
import ReactSVG from 'react-svg';

const playIcon = require('popup/assets/images/play-button.svg');

class Playback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='row'>
                <ReactSVG path={playIcon} />
                <span>{this.props.journey.name}</span>
            </li>
        );
    }
}

export default Playback;
