import { TYPES } from '../../constants/common';
import { STATES, EVENTS } from '../../constants/machines';
import { HTML_IDS, SIZE_CONTROL_IDS } from '../../constants/layout';
import MathUtils from '../MathUtils';
import DOMUtils from '../DOMUtils';

class PageMachine {

  constructor(actions) {

    this.init        = this.init.bind(this);
    this.dispatch    = this.dispatch.bind(this);
    this.setState    = this.setState.bind(this);

    this.state       = STATES.calmness;
    this.actions     = actions;
    this.transitions = this.init();
  }

  // Init machine
  init() {
    const { actions } = this;
    return {
      // Calmness
      [STATES.calmness]: {
        [EVENTS.onMouseDown]: (event) => {
          const { target } = event;
          const { id } = target;
          if (id === HTML_IDS.page) {
            return;
          }

          actions.activeShapeIDSet(id);
          this.setState(STATES.shapeSelected);
        },
        [EVENTS.onClickCreate]: (shapeType) => {
          if (shapeType === TYPES.curve) {
            this.setState(STATES.creatingCurve);
            return;
          }

          this.setState(STATES.creating);
        },
      },
      // Shape is selected
      [STATES.shapeSelected]: {
        [EVENTS.onMouseDown]: (event, activeShape) => {
          const { target } = event;
          const { id } = target;

          if (id === HTML_IDS.page) {
            actions.activeShapeIDSet('');
            this.setState(STATES.calmness);
            return;
          }

          if (SIZE_CONTROL_IDS.includes(id)) {
            actions.resizeDataSet({
              shapeID    : activeShape.id,
              controlID  : id,
              initX      : activeShape.x,
              initY      : activeShape.y,
              initWidth  : activeShape.width,
              initHeight : activeShape.height,
            });
            this.setState(STATES.resizing);
            return;
          }

          actions.activeShapeIDSet(id);
        },
        [EVENTS.onMouseMove]: (event, activeShape) => {
          if (!event.buttons || event.buttons !== 1) {
            return;
          }
          const { movementX, movementY } = event;
          const newPosition = MathUtils.calculateMoving(activeShape, movementX, movementY);

          actions.shapeUpdate(activeShape.id, newPosition);
        },
        [EVENTS.onMouseUp]: (event, activeShape) => {
          actions.dndComplete(activeShape);
        },
        [EVENTS.onClickCreate]: (shapeType) => {
          if (shapeType === TYPES.curve) {
            this.setState(STATES.creatingCurve);
            return;
          }

          this.setState(STATES.creating);
        },
        [EVENTS.onPressESC]: () => {
          actions.activeShapeIDSet('');
          this.setState(STATES.calmness);
        },
        [EVENTS.onPressDelete]: (activeShape) => {
          // TODO: check shape type and make removing with appropriated curves
          actions.activeShapeIDSet(''); // first we need to hide all relative controls in toolbar
          actions.shapeRemove(activeShape.id);
          this.setState(STATES.calmness);
        },
      },
      // Resizing
      [STATES.resizing]: {
        [EVENTS.onMouseMove]: (event, activeShape, resizeControlID) => {
          const { movementX, movementY } = event;
          const newPosition = MathUtils.calculateResize(activeShape, movementX, movementY, resizeControlID);

          actions.shapeUpdate(activeShape.id, newPosition);
        },
        [EVENTS.onMouseUp]: () => {
          actions.resizeComplete();
          this.setState(STATES.shapeSelected);
        },
        [EVENTS.onPressESC]: () => {
          // TODO: give back all to initial state before start resize
          //actions.activeShapeIDSet('');
          //this.setState(STATES.calmness);
        },
      },
      // Creating box or circle
      [STATES.creating]: {
        [EVENTS.onMouseDown]: (event) => {
          const { target } = event;
          const { id } = target;
          if (id !== HTML_IDS.page) {
            return;
          }

          const { clientX, clientY } = event;
          const position = DOMUtils.calculateLayoutClickPosition(clientX, clientY);

          actions.createComplete(position);
          this.setState(STATES.shapeSelected);
        },
        [EVENTS.onPressESC]: () => {
          actions.createDataSet({ shapeType: null });
          this.setState(STATES.calmness);
        },
      },
      // Creating curve
      [STATES.creatingCurve]: {
        [EVENTS.onMouseDown]: (event) => {
          const { target } = event;
          const { id } = target;
          console.log(id);
        },
        [EVENTS.onPressESC]: () => {
          actions.createDataSet({ shapeType: null });
          this.setState(STATES.calmness);
        },
      }
    };
  }

  dispatch(eventName, ...payload) {
    const events = this.transitions[this.state] || {};
    const handler = events[eventName];

    if (handler) {
      handler.apply(this, ...payload);
    }
  }

  setState(newState) {
    this.state = newState;
  }
};

export default PageMachine;
