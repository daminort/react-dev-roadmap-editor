import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import appActions from '../../redux/app/actions';
import { selectActiveShapeID, selectResizeData } from '../../redux/app/selectors';
import { selectShape, selectShapeContent } from '../../redux/diagram/selectors';
import { ALIGN } from '../../constants/editor';
import { DND_TYPES } from '../../constants/dnd';

import { SizeControls } from '../../components';
import { boxSource, collect } from './dnd';

class Box extends PureComponent {

  static propTypes = {
    id      : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired,

    // Redux
    shape: PropTypes.shape({
      x        : PropTypes.number,
      y        : PropTypes.number,
      width    : PropTypes.number,
      height   : PropTypes.number,
      bg       : PropTypes.string,
      align    : PropTypes.string,
      noBorder : PropTypes.bool,
    }).isRequired,

    shapeContent: PropTypes.shape({
      title : PropTypes.string,
      url   : PropTypes.string,
      info  : PropTypes.string,
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
    this.createStyle     = this.createStyle.bind(this);
    this.createClassName = this.createClassName.bind(this);
    this.createTitle     = this.createTitle.bind(this);
    this.onEndDrag       = this.onEndDrag.bind(this);
    this.onClick         = this.onClick.bind(this);
  }

  // Service ------------------------------------------------------------------
  createStyle() {
    const { shape } = this.props;
    const style = {
      left            : shape.x,
      top             : shape.y,
      width           : shape.width,
      height          : shape.height,
      backgroundColor : shape.bg,
    };

    return style;
  }

  createClassName() {
    const { shape, isSelected, isDragging } = this.props;
    const className = classnames('box', {
      'box-no-border' : shape.noBorder,
      'box-left'      : shape.align === ALIGN.left,
      'box-right'     : shape.align === ALIGN.right,
      'selected'      : isSelected,
      'dragging'      : isDragging,
    });

    return className;
  }

  createTitle() {
    const { shapeContent } = this.props;
    const { title, url } = shapeContent;
    if (!url) {
      return title;
    }

    return (<a href={url} target="_blank" rel="noopener noreferrer">{title}</a>);
  }

  // Events -------------------------------------------------------------------
  onEndDrag({ currentOffset }) {
    const { dndComplete } = this.props;
    dndComplete(currentOffset);
  }

  onClick() {
    const { id, onClick } = this.props;
    onClick(id);
  }

  // Renders ------------------------------------------------------------------
  render() {
    const {
      id,
      isSelected,
      activeControl,
      connectDragSource,
    } = this.props;

    const title     = this.createTitle();
    const style     = this.createStyle();
    const className = this.createClassName();

    return connectDragSource(
      <div
        id={id}
        className={className}
        style={style}
        onClick={this.onClick}
      >
        <p>{title}</p>
        {isSelected && (
          <SizeControls activeControl={activeControl} />
        )}
      </div>,
    );
  }
}

const mapState = (state, props) => {
  const { id } = props;
  const shape         = selectShape(id)(state);
  const shapeContent  = selectShapeContent(id)(state);
  const activeShapeID = selectActiveShapeID(state);
  const resize        = selectResizeData(state);

  return {
    shape,
    shapeContent,
    isSelected    : (id === activeShapeID),
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
