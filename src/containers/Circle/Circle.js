import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { THEME } from '../../constants/theme';
import { selectShape } from '../../redux/diagram/selectors';
import { selectActiveShapeID } from '../../redux/app/selectors';

const circleColor = THEME.bg.black;
const controlColor = THEME.sizeControls.inactive;

const Circle = ({ id, shape, isSelected }) => {

  const { x, y, radius } = shape;
  const style = {
    cursor: isSelected ? 'pointer' : 'default',
  };

  const controlCoords = [
    { x, y: y - radius },
    { x, y: y + radius },
    { x: x - radius, y },
    { x: x + radius, y },
  ];

  const controls = controlCoords.map(item => (
    <circle
      key={`control:${item.x}-${item.y}`}
      cx={item.x}
      cy={item.y}
      r={2}
      stroke={controlColor}
      fill={controlColor}
    />
  ));

  return (
    <g transform="translate(0.5, 0.5)" id={id}>
      <circle
        id={id}
        cx={x}
        cy={y}
        r={radius}
        stroke={circleColor}
        style={style}
        fill="transparent"
        pointerEvents="all"
      />
      {isSelected && (
        <>
          {controls}
        </>
      )}
    </g>
  );
};

Circle.propTypes = {
  id   : PropTypes.string.isRequired,
  shape: PropTypes.shape({
    x      : PropTypes.number,
    y      : PropTypes.number,
    radius : PropTypes.number,
  }).isRequired,

  isSelected: PropTypes.bool.isRequired,
};

const mapState = (state, props) => {
  const { id } = props;
  const shape         = selectShape(id)(state);
  const activeShapeID = selectActiveShapeID(state);

  return {
    shape,
    isSelected: (id === activeShapeID),
  };
};

const Connected = connect(mapState)(Circle);
Connected.defaultProps = Circle.defaultProps;

export default Connected;
