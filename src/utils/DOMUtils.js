import MathUtils from './MathUtils';
import { HTML_IDS } from '../constants/layout';

const { downloadLink } = HTML_IDS;

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

  createDownloadLink(downloadData) {
    const linkID = downloadLink;
    const holder = document.getElementById('app');
    if (!holder) {
      console.error('Cannot find main application container (id="app")');
      return;
    }

    const jsonData = JSON.stringify(downloadData);
    const blobData = new Blob([jsonData], { type: 'application/json' });
    const dataURL  = window.URL.createObjectURL(blobData);

    let a = holder.querySelector(`#${linkID}`);
    if (!a) {
      a = document.createElement('a');
      a.id = linkID;
      holder.appendChild(a);
    }

    a.href      = dataURL;
    a.download  = 'diagram.json';
    a.innerHTML = 'Download';

    a.click();
  }
}

export default new DOMUtils();
