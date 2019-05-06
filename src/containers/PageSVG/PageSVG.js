import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageMachine from '../../utils/Machines/PageMachine';
import appActions from '../../redux/app/actions';
import diagramActions from '../../redux/diagram/actions';
import { selectBoxes, selectCurves, selectShape } from '../../redux/diagram/selectors';
import {
  selectActiveShapeID,
  selectIsResize,
  selectResizeData,
  selectIsCreate,
} from '../../redux/app/selectors';
import { EVENTS } from '../../constants/machines';

import Box from '../Box';
import Curve from '../Curve';
import { curves } from './curves';

const staticPageStyle = {
  display         : 'block',
  position        : 'absolute',
  left            : 0,
  top             : 0,
  width           : '100%',
  height          : '100%',
  backgroundImage : 'none',
};

class PageSVG extends PureComponent {

  static propTypes = {
    boxes            : PropTypes.array.isRequired,
    curves           : PropTypes.array.isRequired,
    width            : PropTypes.number.isRequired,
    height           : PropTypes.number.isRequired,

    actions: PropTypes.shape({
      activeShapeIDSet : PropTypes.func.isRequired,
      resizeDataSet    : PropTypes.func.isRequired,
      resizeComplete   : PropTypes.func.isRequired,
      dndComplete      : PropTypes.func.isRequired,
      createComplete   : PropTypes.func.isRequired,
      shapeUpdate      : PropTypes.func.isRequired,
    }).isRequired,

    activeShapeID    : PropTypes.string,
    resizeControlID  : PropTypes.string,
    isResize         : PropTypes.bool,
    isCreate         : PropTypes.bool,

    activeShape: PropTypes.shape({
      x      : PropTypes.number,
      y      : PropTypes.number,
      width  : PropTypes.number,
      height : PropTypes.number,
    }),
  };

  static defaultProps = {
    activeShapeID   : '',
    resizeControlID : '',
    isResize        : false,
    isCreate        : false,
    activeShape     : {},
  };

  constructor(props) {
    super(props);
    this.onMouseDown  = this.onMouseDown.bind(this);
    this.onMouseMove  = this.onMouseMove.bind(this);
    this.onMouseUp    = this.onMouseUp.bind(this);
    this.renderCurves = this.renderCurves.bind(this);

    this.machine = new PageMachine(props.actions);
  }

  componentDidUpdate(prevProps) {
    const { machine } = this;
    const { isCreate } = this.props;
    if (isCreate && !prevProps.isCreate) {
      machine.dispatch(EVENTS.onClickCreate);
      this.forceUpdate();
    }
  }

  onMouseDown(event) {
    const { machine } = this;
    const { activeShape } = this.props;

    machine.dispatch(EVENTS.onMouseDown, [event, activeShape]);
  }

  onMouseMove(event) {
    const { machine } = this;
    const { activeShape, resizeControlID } = this.props;

    machine.dispatch(EVENTS.onMouseMove, [event, activeShape, resizeControlID]);
  }

  onMouseUp(event) {
    const { machine } = this;
    const { activeShape } = this.props;

    machine.dispatch(EVENTS.onMouseUp, [event, activeShape]);
  }

  renderCurves() {

    return curves.map(item => {
      const startX = item.x1;
      const startY = item.y1;
      const endX = item.x2;
      const endY = item.y2;
      const distanceX = Math.abs(endX - startX);
      const distanceY = Math.abs(endY - startY);

      const middleX = Math.min(startX, endX) + (distanceX) / 2;
      const middleY = Math.min(startY, endY) + (distanceY) / 2;

      const isVertical = (distanceY >= distanceX);

      const cpx1 = isVertical ? startX : middleX;
      const cpx2 = isVertical ? endX : middleX;
      const cpy1 = isVertical ? middleY : startY;
      const cpy2 = isVertical ? middleY : endY;

      const shape = {
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        cpx1: cpx1,
        cpy1: cpy1,
        cpx2: cpx2,
        cpy2: cpy2,
      };

      return (
        <Curve
          id={item.id}
          key={item.id}
          shape={shape}
        />
      );
    });
  }

  render() {
    const { machine } = this;
    const {
      width,
      height,
      boxes,
    } = this.props;

    const style = {
      ...staticPageStyle,
      minWidth  : width,
      minHeight : height,
      cursor    : machine.isCreating() ? 'crosshair' : 'default',
    };

    const renderBoxes = boxes.map(box => (
      <Box
        key={box.id}
        id={box.id}
      />
    ));

    const curves = this.renderCurves();

    return (
      <svg
        id="page"
        style={style}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {renderBoxes}
        {curves}
      </svg>
    );
  }
}

const mapState = (state) => {
  const boxes         = selectBoxes(state);
  const curves        = selectCurves(state);
  const activeShapeID = selectActiveShapeID(state);
  const resizeData    = selectResizeData(state);

  return {
    boxes,
    curves,
    activeShapeID,
    activeShape     : selectShape(activeShapeID)(state),
    isResize        : selectIsResize(state),
    resizeControlID : resizeData.controlID,
    isCreate        : selectIsCreate(state),
  };
};

const mapActions = (dispatch) => {

  return {
    actions: bindActionCreators({
      activeShapeIDSet : appActions.activeShapeIDSet,
      resizeDataSet    : appActions.resizeDataSet,
      resizeComplete   : appActions.resizeComplete,
      dndComplete      : appActions.dndComplete,
      createComplete   : appActions.createComplete,
      shapeUpdate      : diagramActions.shapeUpdate,
    }, dispatch),
  };
};

const Connected = connect(mapState, mapActions)(PageSVG);
Connected.defaultProps = PageSVG.defaultProps;

export default Connected;
