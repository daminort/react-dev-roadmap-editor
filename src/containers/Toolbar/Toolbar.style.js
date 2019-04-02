import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { bg } = THEME;

export const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 320px;
  height: 100vh;
  display: block;
  padding: 0 8px;
  background-color: ${bg.white};
  box-shadow: -2px 0px 3px 1px ${bg.grey};

  .left-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 8px;
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
`;
