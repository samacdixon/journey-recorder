import React, {PropTypes} from 'react';

// Decorators
import Radium from 'radium';
import dimensions from 'react-dimensions';

// Components
import StepsBar from './steps-bar';

import Constants from '../constants';

/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
const defaultGetLabel = (date, index) => (new Date(date)).toDateString().substring(4);

/*
 * This is the Horizontal Timeline. This component expects an array of dates
 * just as strings (e.g. 1993-01-01) and layes them horizontaly on the the screen
 * also expects a callback which is activated when that particular index is
 * clicked passing that index along
 */
class StatusBar extends React.Component {

    calculateStepSpacing(containerWidth, minSpacing, stepCount) {
        const fitAllSpacing = containerWidth / (stepCount + 1);
        return Math.max(fitAllSpacing, minSpacing);
    }

  render() {
    const props = this.props;

    if (!props.containerWidth) {
      //As long as we do not know the width of our container, do not render anything!
      return false;
    }

    // Calculate the distances for all events
    // const distances = cummulativeSeperation(
    //   props.journey.steps,
    //   props.labelWidth,
    //   props.minEventPadding,
    //   props.maxEventPadding,
    //   props.linePadding,
    // );

    const visibleWidth = this.props.containerWidth - 80;
    
    const spacing = this.calculateStepSpacing(visibleWidth, 20, props.journey.steps.length);

    // Convert the distances and dates to events
    const steps = props.journey.steps.map((step, index) => ({
      distance: spacing * (index + 1),
      label: step.type,
      index: index,
      step,
    }));


    const totalWidth = Math.max(
      steps[steps.length - 1].distance + this.props.linePadding,
      visibleWidth
    );

    let barPaddingRight = 0;
    let barPaddingLeft = 0;
    if (!this.props.isOpenEnding) {
      barPaddingRight = totalWidth - steps[steps.length - 1].distance;
    }
    if (!this.props.isOpenBeginning) {
      barPaddingLeft = steps[0].distance;
    }

    return (
      <StepsBar
        width={props.containerWidth}
        height={props.containerHeight}
        steps={steps}
        isTouchEnabled={props.isTouchEnabled}
        totalWidth={totalWidth}
        visibleWidth={visibleWidth}
        index={props.index}
        styles={props.styles}
        indexClick={props.indexClick}
        labelWidth={props.labelWidth}
        fillingMotion={props.fillingMotion}
        barPaddingRight={barPaddingRight}
        barPaddingLeft={barPaddingLeft}
      />
    );
  };

}

/**
 * The expected properties from the parent
 * @type {Object}
 */
StatusBar.propTypes = {
  // --- EVENTS ---
  // Selected index
  index: PropTypes.number,
  journey: PropTypes.object.isRequired,
  // Function that takes the index of the array as argument
  indexClick: PropTypes.func,
  // Function to calculate the label based on the date string
  getLabel: PropTypes.func,
  // --- POSITIONING ---
  // the minimum padding between events
  minEventPadding: PropTypes.number,
  // The maximum padding between events
  maxEventPadding: PropTypes.number,
  // Padding at the front and back of the line
  linePadding: PropTypes.number,
  // The width of the label
  labelWidth: PropTypes.number,
  // --- STYLING ---
  styles: PropTypes.object,
  fillingMotion: PropTypes.object,
  slidingMotion: PropTypes.object,
  isOpenEnding: PropTypes.bool,
  isOpenBeginning: PropTypes.bool,
  // --- INTERACTION ---
  isTouchEnabled: PropTypes.bool,
  isKeyboardEnabled: PropTypes.bool,
};

/**
 * The values that the properties will take if they are not provided
 * by the user.
 * @type {Object}
 */
StatusBar.defaultProps = {
  // --- EVENTS ---
  getLabel: defaultGetLabel,
  // --- POSITIONING ---
  minEventPadding: Constants.MIN_EVENT_PADDING,
  maxEventPadding: Constants.MAX_EVENT_PADDING,
  linePadding: Constants.TIMELINE_PADDING,
  labelWidth: Constants.DATE_WIDTH,
  // --- STYLING ---
  styles: {
    outline: '#dfdfdf',
    background: '#f8f8f8',
    foreground: '#7b9d6f'
  },
  fillingMotion: {
    stiffness: 150,
    damping: 25
  },
  slidingMotion: {
    stiffness: 150,
    damping: 25
  },
  isOpenEnding: true,
  isOpenBeginning: true,
  // --- INTERACTION ---
  isTouchEnabled: true,
  isKeyboardEnabled: true,
};

export default Radium(dimensions({elementResize: true})(StatusBar));