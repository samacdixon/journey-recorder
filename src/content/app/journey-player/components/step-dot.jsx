import React, { PropTypes } from 'react';
import ReactSVG from 'react-svg';
import Radium from 'radium';

const locationIcon = require('content/assets/images/location.svg');
const clickIcon = require('content/assets/images/click.svg');
const keypressIcon = require('content/assets/images/keypress.svg');
const validateIcon = require('content/assets/images/validate.svg');
const screenshotIcon = require('content/assets/images/screenshot-image.svg');

const icons = {
  location: locationIcon,
  click: clickIcon,
  keypress: keypressIcon,
  locate: validateIcon,
  screenshot: screenshotIcon,
};


/**
 * The markup for one single dot on the timeline
  *
 * @param {object} props The props passed down
 * @return {StatelessFunctionalReactComponent} The markup for a dot
 */
class StepDot extends React.Component {

  render() {
    let dotType = 'future';
    if (this.props.index < this.props.selected) {
      dotType = 'past';
    } else if (this.props.index === this.props.selected) {
      dotType = 'present';
    }

    return (
      <li
        key={ this.props.index }
        id={`step-dot-${this.props.index}`}
        className='step-dot'
        style={[
          {
            left: this.props.distanceFromOrigin - 14,
          }
        ]}
      >
        <span
          className={dotType}
          onClick={() => this.props.onClick(this.props.index) }
        >
          <ReactSVG path={icons[this.props.stepType]} />
        </span>
      </li>
    );
  }
}

/**
 * propTypes
 * @type {Object}
 */
StepDot.propTypes = {
  // The index of the currently selected dot (required to style as old, present, or future event)
  selected: PropTypes.number.isRequired,
  // The index of the present event (used for deciding the styles alongside selected)
  index: PropTypes.number.isRequired,
  // The onClick handler ( in this case to trigger the fillingMotion of the timeline )
  onClick: PropTypes.func.isRequired,
  // The date of the event (required to display it)
  label: PropTypes.string.isRequired,
  // The width you want the labels to be
  labelWidth: PropTypes.number.isRequired,
  // The numerical value in pixels of the distance from the origin
  distanceFromOrigin: PropTypes.number.isRequired,
  // The styles prefrences of the user
  styles: PropTypes.object.isRequired
};

export default Radium(StepDot);