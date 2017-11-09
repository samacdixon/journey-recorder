import React from 'react';
import Modal from 'content/app/common/modal';
 
class Saver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyName: '',
    };
  }

  handleNameChange(e) {
    this.setState({ journeyName: e.target.value});
  }

  render() {
    return (
      <Modal
        title='Save Journey'
        onAccept={() => this.props.onSave(this.state.journeyName)}
        acceptText='Save'
        canAccept={() => !!this.state.journeyName}
        onCancel={this.props.onCancel}
        cancelText='Resume'
        cancelIcon='arrow-left'
        onReject={this.props.onDiscard}
        rejectText='Discard'
      >
      <div>
        <div className='form-group'>
          <input type='text' required='required' value={this.state.journeyName} onChange={this.handleNameChange.bind(this)}/>
          <label className='control-label' htmlFor='input'>Name</label>
          <i className='bar'></i>
        </div>
      </div>
      </Modal>
    );
  }
}

export default Saver;
