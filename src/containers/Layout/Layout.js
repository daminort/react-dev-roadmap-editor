import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import diagramActions from '../../redux/diagram/actions';
import {
  selectActiveItemID,
  selectResizeData,
  selectIsResize,
} from '../../redux/app/selectors';
import { selectDiagramIDs, selectDiagramItem } from '../../redux/diagram/selectors';
import { SIZE_CONTROL_IDS } from '../../constants/layout';

import MathUtils from '../../utils/MathUtils';

import Box from '../Box';
import Toolbar from '../Toolbar';
import { Wrapper } from './Layout.style';

const observedIDs = ['layout'].concat(SIZE_CONTROL_IDS);

class Layout extends PureComponent {

  static propTypes = {
    activeItemID    : PropTypes.string.isRequired,
    diagramIDs      : PropTypes.arrayOf(PropTypes.string).isRequired,
    isResize        : PropTypes.bool.isRequired,
    //resizeShapeID   : PropTypes.string.isRequired,
    resizeControlID : PropTypes.string.isRequired,
    activeItem      : PropTypes.object,

    activeItemSet   : PropTypes.func.isRequired,
    resizeDataSet   : PropTypes.func.isRequired,
    resizeDataReset : PropTypes.func.isRequired,
    resizeComplete  : PropTypes.func.isRequired,
    diagramRestore  : PropTypes.func.isRequired,
    itemSet         : PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeItem: {},
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
    const { isResize, activeItemSet, resizeDataReset, resizeComplete } = this.props;
    if (isResize) {
      resizeComplete();
      return;
    }

    activeItemSet('');
    resizeDataReset();
  }

  onClickSizeControl(id) {
    const {
      isResize,
      activeItemID,
      activeItem,
      resizeDataSet,
      resizeComplete,
    } = this.props;

    if (isResize) {
      resizeComplete();
      return;
    }

    resizeDataSet({
      shapeID    : activeItemID,
      controlID  : id,
      initX      : activeItem.x,
      initY      : activeItem.y,
      initWidth  : activeItem.width,
      initHeight : activeItem.height,
    });
  }

  onClickShape(id) {
    const { isResize, activeItemSet, resizeComplete } = this.props;
    if (isResize) {
      resizeComplete();
      return;
    }

    activeItemSet(id);
  }

  onMouseMove(event) {
    const { isResize, activeItemID, activeItem, resizeControlID, itemSet } = this.props;
    if (!activeItem || !isResize) {
      return;
    }
    const { clientX, clientY } = event;
    const newPosition = MathUtils.calculateResize(activeItem, clientX, clientY, resizeControlID);

    const resItem = {
      ...activeItem,
      ...newPosition,
    };

    itemSet(activeItemID, resItem);
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
  const resizeData   = selectResizeData(state);
  const activeItemID = selectActiveItemID(state);
  const activeItem   = selectDiagramItem(activeItemID)(state) || null;

  return {
    activeItemID,
    activeItem,
    isResize        : selectIsResize(state),
    diagramIDs      : selectDiagramIDs(state),
    resizeShapeID   : resizeData.shapeID,
    resizeControlID : resizeData.controlID,
  };
};

const mapActions = {
  activeItemSet   : appActions.activeItemSet,
  resizeDataSet   : appActions.resizeDataSet,
  resizeDataReset : appActions.resizeDataReset,
  resizeComplete  : appActions.resizeComplete,
  diagramRestore  : diagramActions.diagramRestore,
  itemSet         : diagramActions.itemSet,
};

const connected = connect(
  mapState,
  mapActions,
)(Layout);

export default DragDropContext(HTML5Backend)(connected);
