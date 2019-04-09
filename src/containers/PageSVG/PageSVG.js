import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectBoxes, selectCurves } from '../../redux/diagram/selectors';

import Box from '../Box';

const staticPageStyle = {
  display         : 'block',
  position        : 'absolute',
  left            : 0,
  top             : 0,
  width           : '100%',
  height          : '100%',
  backgroundImage : 'none',
};

const PageSVG = ({ width, height, boxes }) => {

  const style = {
    ...staticPageStyle,
    minWidth  : width,
    minHeight : height,
  };

  const renderBoxes = boxes.map(box => (
    <Box
      key={box.id}
      id={box.id}
      onClick={() => { console.log(`Clicked: ${box.id}`); }}
      shape={{ ...box }}
      shapeContent={{ title: box.id }}
      isSelected={false}
    />
  ));

  const onClick = (event) => {
    const { target } = event;
    console.log('id: ', target.id);
  };

  return (
    <svg id="page" style={style} onClick={onClick}>
      {renderBoxes}
    </svg>
  );
};

PageSVG.propTypes = {
  boxes  : PropTypes.array.isRequired,
  curves : PropTypes.array.isRequired,
};

const mapState = (state) => {
  const boxes  = selectBoxes(state);
  const curves = selectCurves(state);

  return {
    boxes,
    curves,
  };
};

const Connected = connect(mapState)(PageSVG);
Connected.defaultProps = PageSVG.defaultProps;

export default Connected;
