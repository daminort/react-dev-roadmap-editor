import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { bg } = THEME;

export const Wrapper = styled.div`
  display: block;
  position: relative;
  background-color: ${bg.white};
  background-size: 10px 10px;
  background-image: linear-gradient(to right, rgb(216, 216, 216) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(216, 216, 216) 1px, transparent 1px);
  box-shadow: 3px 3px 3px 1px ${bg.grey};
`;
