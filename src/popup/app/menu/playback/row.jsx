import React, { Component } from 'react';
import ReactSVG from 'react-svg';

const playIcon = require('popup/assets/images/play-button.svg');

class Playback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='row' onClick={this.props.onClick.bind(this, this.props.journey.id)}>
                <span>{this.props.journey.name}</span>
                <ReactSVG path={playIcon} />
            </li>
        );
    }
}

export default Playback;
