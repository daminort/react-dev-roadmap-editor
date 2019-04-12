class DOMUtils {

  calculateLayoutClickPosition(clientX, clientY) {

    const position = {
      x: clientX,
      y: clientY,
    };

    console.log('DOMUtils.js [10]', position);

    return position;
  }
}

export default new DOMUtils();
