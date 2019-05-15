import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { AlignCenter, AlignLeft, AlignRight, LineDashed, LineSolid } from '../../../icons';

import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';
import { ALIGN } from '../../../constants/editor';

const Alignments = (props) => {
  const {
    activeShapeID,
    isBox,
    isCurve,
    shapeSetAlignment,
    shapeSetDashed,
    //shapeSetNoBorder,
  } = props;

  const onClickAlign = (id) => {
    shapeSetAlignment(activeShapeID, id);
  };

  const onClickLine = (dashed) => {
    shapeSetDashed(activeShapeID, dashed);
  };

  const showAlignment = isBox;
  const showLines     = isCurve;

  return (
    <div className="left-right">
      <div className="left">
        {showAlignment && (
          <>
            <ToolbarButton
              id={ALIGN.left}
              title="Left"
              onClick={onClickAlign}
            >
              <AlignLeft />
            </ToolbarButton>
            <ToolbarButton
              id={ALIGN.center}
              title="Center"
              onClick={onClickAlign}
            >
              <AlignCenter />
            </ToolbarButton>
            <ToolbarButton
              id={ALIGN.right}
              title="Right"
              onClick={onClickAlign}
            >
              <AlignRight />
            </ToolbarButton>
          </>
        )}
        {showLines && (
          <>
            <ToolbarButton
              id="lineDashed"
              title="Line: dashed"
              onClick={() => onClickLine(true)}
            >
              <LineDashed />
            </ToolbarButton>
            <ToolbarButton
              id="lineSolid"
              title="Line: solid"
              onClick={() => onClickLine(false)}
            >
              <LineSolid />
            </ToolbarButton>
          </>
        )}
      </div>
    </div>
  );
};

Alignments.propTypes = {
  activeShapeID     : PropTypes.string.isRequired,
  isBox             : PropTypes.bool.isRequired,
  isCurve           : PropTypes.bool.isRequired,
  shapeSetAlignment : PropTypes.func.isRequired,
  shapeSetDashed    : PropTypes.func.isRequired,
  shapeSetNoBorder  : PropTypes.func.isRequired,
};

const mapState = (state) => {
  return {
    activeShapeID: selectActiveShapeID(state),
  };
};

const mapActions = {
  shapeSetAlignment : diagramActions.shapeSetAlignment,
  shapeSetDashed    : diagramActions.shapeSetDashed,
  shapeSetNoBorder  : diagramActions.shapeSetNoBorder,
};

export default connect(mapState, mapActions)(Alignments);
