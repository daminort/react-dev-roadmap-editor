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
      // Calmness: onMouseDown, onClickCreate
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
        [EVENTS.onClickCreate]: () => {
          this.setState(STATES.creating);
        },
      },
      // shapeSelected: onMouseDown, onMouseMove, onMouseUp
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
        [EVENTS.onClickCreate]: () => {
          this.setState(STATES.creating);
        },
      },
      // resizing: onMouseMove, onMouseUp
      [STATES.resizing]: {
        [EVENTS.onMouseMove]: (event, activeShape, resizeControlID) => {
          const { movementX, movementY } = event;
          const newPosition = MathUtils.calculateResize(activeShape, movementX, movementY, resizeControlID);

          actions.shapeUpdate(activeShape.id, newPosition);
        },
        [EVENTS.onMouseUp]: () => {
          actions.resizeComplete();
          this.setState(STATES.shapeSelected);
        }
      },
      // creating: onMouseDown
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
      }
    };
  }

  dispatch(eventName, ...payload) {
    const events = this.transitions[this.state];
    const handler = events[eventName];

    if (handler) {
      handler.apply(this, ...payload);
    }
  }

  setState(newState) {
    this.state = newState;
  }

  // Service
  isCreating() {
    return (this.state === STATES.creating);
  }
};

export default PageMachine;
