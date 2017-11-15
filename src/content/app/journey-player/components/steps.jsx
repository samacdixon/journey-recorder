import React, { PropTypes } from 'react';

import StepDot from './step-dot';

/**
 * The markup Information for all the events on the horizontal timeline.
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
const Steps = ({ steps, selectedIndex, styles, handleDateClick, labelWidth }) => (
  <ol
    className='events-bar'
    style={{
      listStyle: 'none'
    }}
  >
    {steps.map((step, index) =>
      <StepDot
        distanceFromOrigin={step.distance}
        label={step.label}
        stepType={step.label}
        index={index}
        key={index}
        onClick={handleDateClick}
        selected={selectedIndex}
        styles={styles}
        labelWidth={labelWidth}
      />
    )}
  </ol>
);

/**
 * The styles that parent will provide
 * @type {Object}
 */
Steps.propTypes = {
  // Array containing the events
  steps: PropTypes.arrayOf(PropTypes.shape({
    distance: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    step: PropTypes.object.isRequired,
  })).isRequired,
  // The index of the selected event
  selectedIndex: PropTypes.number,
  // a handler for clicks on a datapoint
  handleDateClick: PropTypes.func,
  // The width you want the labels to be
  labelWidth: PropTypes.number.isRequired,
  // Custom styling
  styles: PropTypes.object,
}


export default Steps;