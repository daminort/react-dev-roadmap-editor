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
  background-color: ${bg.white};
  box-shadow: -2px 0px 3px 1px ${bg.grey};
`;
