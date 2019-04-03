import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import diagramActions from '../../redux/diagram/actions';
import {
  selectActiveShapeID,
  selectResizeData,
  selectIsResize,
} from '../../redux/app/selectors';
import { selectDiagramIDs, selectDiagramShape } from '../../redux/diagram/selectors';
import { SIZE_CONTROL_IDS } from '../../constants/layout';

import MathUtils from '../../utils/MathUtils';

import Box from '../Box';
import Toolbar from '../Toolbar';
import { Wrapper } from './Layout.style';

const observedIDs = ['layout'].concat(SIZE_CONTROL_IDS);

class Layout extends PureComponent {

  static propTypes = {
    activeShapeID    : PropTypes.string.isRequired,
    diagramIDs       : PropTypes.arrayOf(PropTypes.string).isRequired,
    isResize         : PropTypes.bool.isRequired,
    resizeControlID  : PropTypes.string.isRequired,
    activeShape      : PropTypes.object,

    activeShapeIDSet : PropTypes.func.isRequired,
    resizeDataSet    : PropTypes.func.isRequired,
    resizeDataReset  : PropTypes.func.isRequired,
    resizeComplete   : PropTypes.func.isRequired,
    diagramRestore   : PropTypes.func.isRequired,
    shapeUpdate      : PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeShape: {},
  }

  constructor(props) {
    super(props);
    this.onClick            = this.onClick.bind(this);
    this.onClickLayout      = this.onClickLayout.bind(this);
    this.onClickSizeControl = this.onClickSizeControl.bind(this);
    this.onClickShape       = this.onClickShape.bind(this);
    this.onMouseMove        = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    const { diagramRestore } = this.props;
    diagramRestore();
  }

  // Events -------------------------------------------------------------------
  onClick({ target }) {
    const { id } = target;
    if (!observedIDs.includes(id)) {
      return;
    }

    const isLayout      = (id === 'layout');
    const isSizeControl = (!isLayout && observedIDs.includes(id));

    if (isLayout) {
      this.onClickLayout();

    } else if (isSizeControl) {
      this.onClickSizeControl(id);
    }
  }

  onClickLayout() {
    const { isResize, activeShapeIDSet, resizeDataReset, resizeComplete } = this.props;
    if (isResize) {
      resizeComplete();
      return;
    }

    activeShapeIDSet('');
    resizeDataReset();
  }

  onClickSizeControl(id) {
    const {
      isResize,
      activeShapeID,
      activeShape,
      resizeDataSet,
      resizeComplete,
    } = this.props;

    if (isResize) {
      resizeComplete();
      return;
    }

    resizeDataSet({
      shapeID    : activeShapeID,
      controlID  : id,
      initX      : activeShape.x,
      initY      : activeShape.y,
      initWidth  : activeShape.width,
      initHeight : activeShape.height,
    });
  }

  onClickShape(id) {
    const { isResize, activeShapeIDSet, resizeComplete } = this.props;
    if (isResize) {
      resizeComplete();
      return;
    }

    activeShapeIDSet(id);
  }

  onMouseMove(event) {
    const { isResize, activeShapeID, activeShape, resizeControlID, shapeUpdate } = this.props;
    if (!activeShape || !isResize) {
      return;
    }
    const { clientX, clientY } = event;
    const newPosition = MathUtils.calculateResize(activeShape, clientX, clientY, resizeControlID);

    shapeUpdate(activeShapeID, newPosition);
  }

  // Renders ------------------------------------------------------------------
  render() {
    const { diagramIDs } = this.props;
    const items = diagramIDs.map(id => {
      return (
        <Box
          key={id}
          id={id}
          onClick={this.onClickShape}
        />
      );
    });

    return (
      <>
        <Wrapper
          id="layout"
          onClick={this.onClick}
          onMouseMove={this.onMouseMove}
        >
          {items}
        </Wrapper>
        <Toolbar />
      </>
    );
  }
}

const mapState = (state) => {
  const resizeData    = selectResizeData(state);
  const activeShapeID = selectActiveShapeID(state);
  const activeShape   = selectDiagramShape(activeShapeID)(state) || null;

  return {
    activeShapeID,
    activeShape,
    isResize        : selectIsResize(state),
    diagramIDs      : selectDiagramIDs(state),
    resizeShapeID   : resizeData.shapeID,
    resizeControlID : resizeData.controlID,
  };
};

const mapActions = {
  activeShapeIDSet : appActions.activeShapeIDSet,
  resizeDataSet    : appActions.resizeDataSet,
  resizeDataReset  : appActions.resizeDataReset,
  resizeComplete   : appActions.resizeComplete,
  diagramRestore   : diagramActions.diagramRestore,
  shapeUpdate      : diagramActions.shapeUpdate,
};

const connected = connect(
  mapState,
  mapActions,
)(Layout);

export default DragDropContext(HTML5Backend)(connected);
