import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    return (
      <div className='modal-backdrop'>
            <div className='vertical-align-center'>
                <div className='modal-container mdl-card'>
                    <div className='modal-header'>
                      {this.props.title}
                    </div>
                    <div className='modal-content'>
                      {this.props.children}
                    </div>
                    <div className='modal-footer'>
                      { this.props.onCancel &&
                        <a className='btn' onClick={this.props.onCancel}>
                          {this.props.cancelText || 'Cancel'}
                        </a>
                      }
                      { this.props.onReject &&
                        <button className='btn btn-warn' onClick={this.props.onReject}>
                          {this.props.rejectText || 'No'}
                        </button>
                      }
                      <button className='btn btn-primary' disabled={this.props.canAccept && !this.props.canAccept()} onClick={this.props.onAccept}>
                        {this.props.acceptText || 'Yes'}
                      </button>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onAccept: PropTypes.func.isRequired,
  canAccept: PropTypes.func,
  acceptText: PropTypes.string,
  onReject: PropTypes.func,
  rejectText: PropTypes.string,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  cancelIcon: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;