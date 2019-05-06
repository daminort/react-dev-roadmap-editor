import SchemePrototype from './Scheme';

const defaultScheme = SchemePrototype.clone();

class BaseMachine {

  constructor(scheme = defaultScheme, actions = {}) {
    this.scheme = scheme;
    this.actions = actions;
  }

  dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    }
  },
  changeStateTo(newState) {
    this.state = newState;
  },

}

export default BaseMachine;
