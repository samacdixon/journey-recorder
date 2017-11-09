import React, {Component} from 'react';
import ReactSVG from 'react-svg';
import styles from 'content/assets/styles/main.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

class Control extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = cx('control', {
      active: (this.props.isActive === true)
    });

    // data-balloon={this.props.description} data-balloon-pos="down"
    return (
      <div className={className} onClick={this.props.onClick}>
        <ReactSVG path={this.props.icon} />
      </div>
    );
  }
}

export default Control;
