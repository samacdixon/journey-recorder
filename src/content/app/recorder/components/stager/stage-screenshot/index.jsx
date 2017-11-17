import React from 'react';
import Modal from 'content/app/common/modal';
 
class StageScreenshot extends React.Component {
  saveStep() {
    const finalStep = Object.assign({}, this.props.step, this.state);
    this.props.onCommit(finalStep);
  }

  render() {
    return (
      <Modal
        title='Screenshot Validation'
        onAccept={this.saveStep.bind(this)}
        acceptText='Save'
        onReject={this.props.onDiscard}
        rejectText='Discard'
      >
        <img className='screenshot' src={this.props.step.dataUrl} />
      </Modal>
    );
  }
}

export default StageScreenshot;
