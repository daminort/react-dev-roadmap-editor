import MathUtils from './MathUtils';

class DOMUtils {

  calculateLayoutClickPosition(clientX, clientY) {

    const scrollableArea = document.querySelector('.area');
    const pageHolder     = document.querySelector('#page-holder');

    const { scrollLeft, scrollTop, offsetWidth: widthArea } = scrollableArea;
    const { offsetWidth: widthPage } = pageHolder;

    const areaStyle  = window.getComputedStyle(scrollableArea);
    const paddingTop = parseInt(areaStyle['padding-top'], 10);
    const realLeft   = (widthArea - widthPage) / 2 - 5; // 5px for scroll

    const resX = scrollLeft + clientX - realLeft;
    const resY = scrollTop + clientY - paddingTop;

    return {
      x: MathUtils.roundCoord(resX),
      y: MathUtils.roundCoord(resY),
    };
  }
}

export default new DOMUtils();
