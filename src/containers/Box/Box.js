import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import { content } from '../../resources';

import appActions from '../../redux/app/actions';
import { selectActiveItemID, selectResizeData } from '../../redux/app/selectors';
import { selectDiagramItem } from '../../redux/diagram/selectors';
import { ALIGN } from '../../constants/editor';
import { DND_TYPES } from '../../constants/dnd';

import { SizeControls } from '../../components';
import { boxSource, collect } from './dnd';

class Box extends PureComponent {

  static propTypes = {
    id      : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired,
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
    activeControl     : PropTypes.string.isRequired,
    dndComplete       : PropTypes.func.isRequired,
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
    const { dndComplete } = this.props;
    dndComplete(currentOffset);
  }

  onClick(event) {
    const { id, onClick } = this.props;
    onClick(id, event);
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
    activeControl : resize.controlID,
  };
};

const mapActions = {
  dndComplete: appActions.dndComplete,
};

const dndWrapped = DragSource(DND_TYPES.box, boxSource, collect)(Box);

export default connect(
  mapState,
  mapActions,
)(dndWrapped);
