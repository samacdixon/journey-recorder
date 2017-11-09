import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class RecordOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='record-options'>
                { 
                    !this.props.isRecording &&
                    <div className='btn start-btn' onClick={this.props.startRecording}>Start Recording</div>
                } {
                    this.props.isRecording &&
                    <div className='btn stop-btn' onClick={this.props.stopRecording}>Stop Recording</div>
                }
            </div>
        );
    }
}

export default RecordOptions;
