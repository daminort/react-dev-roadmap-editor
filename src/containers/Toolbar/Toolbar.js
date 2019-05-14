import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarRow from '../../components/ToolbarRow';
import { selectActiveShapeID } from '../../redux/app/selectors';
import { selectShape } from '../../redux/diagram/selectors';

import Actions from './Actions';
import Alignment from './Alignment';
import Colors from './Colors';
import Content from './Content';
import Elements from './Elements';
import Page from './Page';

import { Wrapper } from './Toolbar.style';
import { TYPES } from '../../constants/common';

class Toolbar extends PureComponent {

  static propTypes = {
    isShapeSelected : PropTypes.bool.isRequired,
    isBox           : PropTypes.bool.isRequired,
    isCircle        : PropTypes.bool.isRequired,
    isCurve         : PropTypes.bool.isRequired,
  }

  render() {
    const { isShapeSelected, isBox } = this.props;

    const showColors    = (isShapeSelected && isBox);
    const showAlignment = (isShapeSelected && isBox);
    const showContent   = (isShapeSelected && isBox);

    return (
      <Wrapper>
        <ToolbarRow title="Actions"><Actions /></ToolbarRow>
        <ToolbarRow title="Page"><Page /></ToolbarRow>
        <ToolbarRow title="Elements"><Elements /></ToolbarRow>
        {showColors && (<ToolbarRow title="Colors"><Colors /></ToolbarRow>)}
        {showAlignment && (<ToolbarRow title="Alignment"><Alignment /></ToolbarRow>)}
        {showContent && (<ToolbarRow title="Content" noBorder><Content /></ToolbarRow>)}
      </Wrapper>
    );
  }
}

const mapState = (state) => {
  const activeShapeID = selectActiveShapeID(state);
  const activeShape     = selectShape(activeShapeID)(state) || null;
  const activeShapeType = (activeShape && activeShape.type);

  return {
    activeShapeID,
    isShapeSelected : Boolean(activeShapeID),
    isBox           : (activeShapeType === TYPES.box),
    isCircle        : (activeShapeType === TYPES.circle),
    isCurve         : (activeShapeType === TYPES.curve),
  };
};

export default connect(mapState)(Toolbar);
