import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';

import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';
import { THEME } from '../../../constants/theme';

const classes = {
  colorTransparent : 'bg-white',
  colorYellow      : 'bg-yellow',
  colorRed         : 'bg-red',
  colorGrey        : 'bg-grey',
};

const { bg } = THEME;
const bgColors = {
  colorTransparent : bg.transparent,
  colorYellow      : bg.yellow,
  colorRed         : bg.red,
  colorGrey        : bg.grey,
};

const Colors = ({ isShapeSelected, activeShapeID, shapeSetColor }) => {

  const onClick = (id) => {
    if (!isShapeSelected) {
      return;
    }
    shapeSetColor(activeShapeID, bgColors[id]);
  };

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id="colorTransparent"
          title="Transparent"
          className={classes.colorTransparent}
          onClick={onClick}
        />
        <ToolbarButton
          id="colorYellow"
          title="Yellow"
          className={classes.colorYellow}
          onClick={onClick}
        />
        <ToolbarButton
          id="colorRed"
          title="Red"
          className={classes.colorRed}
          onClick={onClick}
        />
        <ToolbarButton
          id="colorGrey"
          title="Grey"
          className={classes.colorGrey}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

Colors.propTypes = {
  activeShapeID   : PropTypes.string.isRequired,
  isShapeSelected : PropTypes.bool.isRequired,
  shapeSetColor   : PropTypes.func.isRequired,
};

const mapState = (state) => {
  const activeShapeID = selectActiveShapeID(state);

  return {
    activeShapeID,
    isShapeSelected: Boolean(activeShapeID),
  };
};

const mapActions = {
  shapeSetColor: diagramActions.shapeSetColor,
};

export default connect(mapState, mapActions)(Colors);
