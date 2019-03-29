export function makeActionCreator(type, ...argNames) {

  return function creator(...args) {
    const action  = { type };
    const payload = {};
    let isPayload = false;

    argNames.forEach((arg, index) => {
      const key    = argNames[index];
      const value  = args[index];
      payload[key] = value;
      isPayload    = true;
    });

    if (isPayload) {
      action.payload = payload;
    }

    return action;
  };
}
