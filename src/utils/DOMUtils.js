import MathUtils from './MathUtils';
import { HTML_IDS } from '../constants/layout';

const { downloadLink, uploadInput } = HTML_IDS;

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

  clickDownloadLink() {
    const link = document.getElementById(downloadLink);
    if (link) {
      link.click();
    }
  }

  clickUploadInput() {
    const input = document.getElementById(uploadInput);
    if (input) {
      input.click();
    }
  }
}

export default new DOMUtils();
