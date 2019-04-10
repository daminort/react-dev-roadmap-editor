import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { bg, size } = THEME;

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
`;
