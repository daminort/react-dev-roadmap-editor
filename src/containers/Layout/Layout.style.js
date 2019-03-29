import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { bg, border } = THEME;

export const Wrapper = styled.div`
  position: relative;

  .box {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${bg.white};
    border: ${border.main};
    border-radius: ${border.radius};
    box-sizing: border-box;
    cursor: pointer;
  }
`;
