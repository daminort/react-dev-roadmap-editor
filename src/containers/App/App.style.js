import styled from 'styled-components';
import { THEME } from '../../constants/theme';
import { HTML_IDS } from '../../constants/layout';

const { bg, size } = THEME;
const { downloadLink } = HTML_IDS;

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  
  .area {
    width: calc(100vw - ${size.toolbar});
    overflow: auto !important;
    background-color: ${bg.layout};
    padding: 40px;
    display: flex;
    justify-content: center;
  }
  
  .toolbar {
    width: ${size.toolbar};
  }
  
  a#${downloadLink} {
  	position: absolute;
  	top: -100px;
  	left: -100px;
  	opacity: 0;
  	width: 0px;
  	height: 0px;
  }
`;
