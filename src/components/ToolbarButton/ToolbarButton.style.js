import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { bg, border, color } = THEME;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: ${border.button};
  border-radius: ${border.smallRadius};
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    border-color: ${bg.blue};
    color: ${bg.blue};
  }

  &.last {
    margin-right: 0;
  }

  &.red {
    color: ${color.red};
    border-color: ${color.red};
    &:hover {
      border-color: ${color.red};
    }
  }
`;
