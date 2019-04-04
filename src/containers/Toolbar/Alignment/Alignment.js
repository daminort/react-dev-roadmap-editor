import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { AlignCenter, AlignLeft, AlignRight } from '../../../icons';

import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';
import { ALIGN } from '../../../constants/editor';

const Alignments = ({ isShapeSelected, activeShapeID, shapeSetAlignment }) => {

  const onClick = (id) => {
    if (!isShapeSelected) {
      return;
    }
    shapeSetAlignment(activeShapeID, id);
  };

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id={ALIGN.left}
          title="Left"
          onClick={onClick}
        >
          <AlignLeft />
        </ToolbarButton>
        <ToolbarButton
          id={ALIGN.center}
          title="Center"
          onClick={onClick}
        >
          <AlignCenter />
        </ToolbarButton>
        <ToolbarButton
          id={ALIGN.right}
          title="Right"
          onClick={onClick}
        >
          <AlignRight />
        </ToolbarButton>
      </div>
    </div>
  );
};

Alignments.propTypes = {
  activeShapeID     : PropTypes.string.isRequired,
  isShapeSelected   : PropTypes.bool.isRequired,
  shapeSetAlignment : PropTypes.func.isRequired,
};

const mapState = (state) => {
  const activeShapeID = selectActiveShapeID(state);

  return {
    activeShapeID,
    isShapeSelected: Boolean(activeShapeID),
  };
};

const mapActions = {
  shapeSetAlignment: diagramActions.shapeSetAlignment,
};

export default connect(mapState, mapActions)(Alignments);
