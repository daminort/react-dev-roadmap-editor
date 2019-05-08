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
  selectCreateData,
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
      createDataSet    : PropTypes.func.isRequired,
      createComplete   : PropTypes.func.isRequired,
      shapeUpdate      : PropTypes.func.isRequired,
      shapeRemove      : PropTypes.func.isRequired,
    }).isRequired,

    activeShapeID    : PropTypes.string,
    resizeControlID  : PropTypes.string,
    createShapeType  : PropTypes.string,
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
    this.onKeyDown    = this.onKeyDown.bind(this);
    this.renderBoxes  = this.renderBoxes.bind(this);
    this.renderCurves = this.renderCurves.bind(this);

    this.machine = new PageMachine(props.actions);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate(prevProps) {
    const { machine } = this;
    const { isCreate, createShapeType } = this.props;
    if (isCreate && !prevProps.isCreate) {
      machine.dispatch(EVENTS.onClickCreate, [createShapeType]);
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

  onKeyDown(event) {
    const { machine } = this;
    const { activeShape } = this.props;
    const { keyCode } = event;

    console.log('PageSVG.js [116]', { keyCode });

    // ESC
    if (keyCode === 27) {
      machine.dispatch(EVENTS.onPressESC);

    // Delete
    } else if (keyCode === 46) {
      machine.dispatch(EVENTS.onPressDelete, [activeShape]);
    }
  }

  renderBoxes() {
    const { boxes } = this.props;

    return boxes.map(box => (
      <Box
        key={box.id}
        id={box.id}
      />
    ));
  }

  renderCurves() {

    return curves.map(item => {

      const shape = {
        startX : item.x1,
        startY : item.y1,
        endX   : item.x2,
        endY   : item.y2,
        dashed : item.dashed,
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
    const { width, height, isCreate } = this.props;

    const style = {
      ...staticPageStyle,
      minWidth  : width,
      minHeight : height,
      cursor    : isCreate ? 'crosshair' : 'default',
    };

    const boxes = this.renderBoxes();
    const curves = this.renderCurves();

    return (
      <svg
        id="page"
        style={style}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {boxes}
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
  const createData    = selectCreateData(state);

  return {
    boxes,
    curves,
    activeShapeID,
    activeShape     : selectShape(activeShapeID)(state),
    isResize        : selectIsResize(state),
    resizeControlID : resizeData.controlID,
    isCreate        : Boolean(createData.shapeType),
    createShapeType : createData.shapeType,
  };
};

const mapActions = (dispatch) => {

  return {
    actions: bindActionCreators({
      activeShapeIDSet : appActions.activeShapeIDSet,
      resizeDataSet    : appActions.resizeDataSet,
      resizeComplete   : appActions.resizeComplete,
      dndComplete      : appActions.dndComplete,
      createDataSet    : appActions.createDataSet,
      createComplete   : appActions.createComplete,
      shapeUpdate      : diagramActions.shapeUpdate,
      shapeRemove      : diagramActions.shapeRemove,
    }, dispatch),
  };
};

const Connected = connect(mapState, mapActions)(PageSVG);
Connected.defaultProps = PageSVG.defaultProps;

export default Connected;
