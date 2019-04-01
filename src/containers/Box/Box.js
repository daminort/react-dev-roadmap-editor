import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import { content } from '../../resources';

import appActions from '../../redux/app/actions';
import diagramActions from '../../redux/diagram/actions';
import { selectActiveItemID, selectResizeData } from '../../redux/app/selectors';
import { selectDiagramItem } from '../../redux/diagram/selectors';
import { ALIGN } from '../../constants/editor';
import { DND_TYPES } from '../../constants/dnd';
import { SIZE_CONTROL_IDS } from '../../constants/layout';

import MathUtils from '../../utils/MathUtils';

import { SizeControls } from '../../components';
import { boxSource, collect } from './dnd';

class Box extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    // Redux
    pos: PropTypes.shape({
      x        : PropTypes.number,
      y        : PropTypes.number,
      width    : PropTypes.number,
      height   : PropTypes.number,
      bg       : PropTypes.string,
      align    : PropTypes.string,
      noBorder : PropTypes.bool,
    }).isRequired,
    isSelected        : PropTypes.bool.isRequired,
    isResize          : PropTypes.bool.isRequired,
    activeControl     : PropTypes.string.isRequired,
    activeItemSet     : PropTypes.func.isRequired,
    itemSet           : PropTypes.func.isRequired,
    // DnD
    isDragging        : PropTypes.bool.isRequired,
    connectDragSource : PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onEndDrag = this.onEndDrag.bind(this);
    this.onClick   = this.onClick.bind(this);
  }

  // Events -------------------------------------------------------------------
  onEndDrag({ currentOffset }) {
    const { id, pos, itemSet } = this.props;
    const { x, y } = currentOffset;

    pos.x = MathUtils.roundCoord(x);
    pos.y = MathUtils.roundCoord(y);

    itemSet(id, pos);
  }

  onClick({ target }) {
    const { id, isResize, activeItemSet } = this.props;
    if (SIZE_CONTROL_IDS.includes(target.id)) {
      return;
    }

    if (!isResize) {
      activeItemSet(id);
      //return;
    }
  }

  // Renders ------------------------------------------------------------------
  render() {
    const {
      id,
      pos,
      isSelected,
      activeControl,
      isDragging,
      connectDragSource,
    } = this.props;

    const txt = content[id];
    const style = {
      left            : pos.x,
      top             : pos.y,
      width           : pos.width,
      height          : pos.height,
      backgroundColor : pos.bg,
    };
    const className = classnames('box', {
      'box-no-border' : pos.noBorder,
      'box-left'      : pos.align === ALIGN.left,
      'box-right'     : pos.align === ALIGN.right,
      'selected'      : isSelected,
      'dragging'      : isDragging,
    });

    return connectDragSource(
      <div
        id={id}
        className={className}
        style={style}
        onClick={this.onClick}
      >
        <p>{txt.title}</p>
        {isSelected && (
          <SizeControls activeControl={activeControl} />
        )}
      </div>,
    );
  }
}

const mapState = (state, props) => {
  const { id } = props;
  const pos          = selectDiagramItem(id)(state);
  const activeItemID = selectActiveItemID(state);
  const resize       = selectResizeData(state);

  return {
    pos,
    isSelected    : (id === activeItemID),
    isResize      : (id === resize.shapeID),
    activeControl : resize.controlID,
  };
};

const mapActions = {
  activeItemSet : appActions.activeItemSet,
  itemSet       : diagramActions.itemSet,
};

const dndWrapped = DragSource(DND_TYPES.box, boxSource, collect)(Box);

export default connect(
  mapState,
  mapActions,
)(dndWrapped);
