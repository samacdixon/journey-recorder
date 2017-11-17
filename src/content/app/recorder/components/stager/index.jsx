import React from 'react';
import { ACTION_TYPES } from 'content/services/recorder/config';
import StageLocator from './stage-locator';
import StageScreenshot from './stage-screenshot';
 
class Stager extends React.Component {
    render() {
        const step = this.props.step;
        if (!step) return null;
        if (this.props.step.type === ACTION_TYPES.LOCATE) {
            return <StageLocator step={step} onCommit={this.props.onCommit} onDiscard={this.props.onDiscard} />;
        } else if (this.props.step.type === ACTION_TYPES.SCREENSHOT) {
        return <StageScreenshot step={step} onCommit={this.props.onCommit} onDiscard={this.props.onDiscard} />;
        }
        return null;
    }
}

export default Stager;
