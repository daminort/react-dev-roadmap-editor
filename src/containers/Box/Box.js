import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { content } from '../../resources';
import { selectDiagramItem } from '../../redux/diagram/selectors';

const Box = ({ id, pos }) => {
  const txt = content[id];
  const style = {
    left            : pos.x,
    top             : pos.y,
    width           : pos.width,
    height          : pos.height,
    backgroundColor : pos.bg,
  };

  return (
    <div className="box" style={style}>
      <p>{txt.title}</p>
    </div>
  );
};

Box.propTypes = {
  id: PropTypes.string.isRequired,
  pos: PropTypes.shape({
    x      : PropTypes.number,
    y      : PropTypes.number,
    width  : PropTypes.number,
    height : PropTypes.number,
    bg     : PropTypes.string,
  }).isRequired,
};

const mapState = (state, props) => {
  const { id } = props;
  const pos = selectDiagramItem(id)(state);

  return {
    pos,
  };
};

export default connect(mapState)(Box);
