import { TYPES } from '../../constants/common';
import { STATES, EVENTS } from '../../constants/machines';
import {
  HTML_IDS,
  BOX_SIZE_CONTROL_IDS,
  CURVE_SIZE_CONTROL_IDS,
} from '../../constants/layout';

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

          // go to resize
          if (BOX_SIZE_CONTROL_IDS.includes(id) || CURVE_SIZE_CONTROL_IDS.includes(id)) {
            actions.resizeDataSet({
              shapeID     : activeShape.id,
              controlID   : id,
              originShape : { ...activeShape },
            });
            const nextState = CURVE_SIZE_CONTROL_IDS.includes(id)
              ? STATES.resizingCurve
              : STATES.resizingBox;

            this.setState(nextState);
            return;
          }

          actions.activeShapeIDSet(id);
        },
        [EVENTS.onMouseMove]: (event, activeShape) => {
          if (!event.buttons || event.buttons !== 1) {
            return;
          }
          const { movementX, movementY } = event;
          actions.shapeMove(activeShape.id, movementX, movementY);
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

      // Resizing Box
      [STATES.resizingBox]: {
        [EVENTS.onMouseMove]: (event, activeShape, controlID) => {
          const { movementX, movementY } = event;
          actions.shapeResize(activeShape.id, movementX, movementY, controlID);
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

      // Resizing Curve
      [STATES.resizingCurve]: {
        [EVENTS.onMouseMove]: (event, activeShape, controlID) => {
          const { movementX, movementY } = event;
          actions.curveResize(activeShape.id, movementX, movementY, controlID);
        },
        [EVENTS.onMouseUp]: () => {
          //actions.resizeComplete();
          //this.setState(STATES.shapeSelected);
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
        [EVENTS.onMouseDown]: (event, activeShape) => {
          const { target } = event;
          const { id } = target;
          if (id === activeShape.id) {
            return;
          }
          if (activeShape.type === TYPES.curve) {
            return;
          }

          actions.createCurveComplete(activeShape.id, id);
          this.setState(STATES.shapeSelected);
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
