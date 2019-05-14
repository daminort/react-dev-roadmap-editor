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

  createUploadInput(onFileSelect) {
    const inputID = uploadInput;
    const holder = document.getElementById('app');
    if (!holder) {
      console.error('Cannot find main application container (id="app")');
      return;
    }

    let input = holder.querySelector(`input#${inputID}`);
    if (!input) {
      input = document.createElement('input');
      input.id     = inputID;
      input.name   = inputID;
      input.type   = 'file';
      input.accept = 'application/json';

      holder.appendChild(input);
    }

    input.onchange = (e) => onFileSelect(e);
    input.select();
  }
}

export default new DOMUtils();
