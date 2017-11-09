import React from 'react';
import Modal from 'content/app/common/modal';
 
class StageLocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldExist: true,
      validateInnerHtml: false,
      validateInnerText: false,
    };
  }

  handleShouldExistChange(e) {
    this.setState({ 
      shouldExist: e.target.checked,
      validateInnerHtml: e.target.checked && this.state.validateInnerHtml,
      validateInnerText: e.target.checked && this.state.validateInnerText,
    });
  }

  handleValidateInnerHtmlChange(e) {
    this.setState({ 
      shouldExist: this.state.shouldExist,
      validateInnerHtml: e.target.checked,
      validateInnerText: this.state.validateInnerText,
    });
  }

  handleValidateInnerTextChange(e) {
    this.setState({ 
      shouldExist: this.state.shouldExist,
      validateInnerHtml: this.state.validateInnerHtml,
      validateInnerText: e.target.checked,
    });
  }

  saveStep() {
    const finalStep = Object.assign({}, this.props.step, this.state);
    this.props.onCommit(finalStep);
  }

  render() {
    return (
      <Modal
        title='Validation Requirements'
        onAccept={this.saveStep.bind(this)}
        acceptText='Save'
        onReject={this.props.onDiscard}
        rejectText='Discard'
      >
      <div className='checkbox'>
        <label>
          <input type='checkbox' checked={this.state.shouldExist} onChange={this.handleShouldExistChange.bind(this)}/><i className='helper'></i>element should be found?
        </label>
      </div>
      { this.state.shouldExist &&
      <div style={{ marginTop: '12px' }}>
        <div className='checkbox'>
          <label>
            <input type='checkbox' checked={this.state.validateInnerHtml} onChange={this.handleValidateInnerHtmlChange.bind(this)}/><i className='helper'></i>validate inner HTML?
          </label>
        </div>
        <div className='text-view'>
          {this.props.step.innerHtml || '(empty)'}
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' checked={this.state.validateInnerText} onChange={this.handleValidateInnerTextChange.bind(this)}/><i className='helper'></i>validate inner text?
          </label>
        </div>
        <div className='text-view'>
          {this.props.step.innerText || '(empty)'}
        </div>
      </div>
      }
      </Modal>
    );
  }
}

export default StageLocator;
