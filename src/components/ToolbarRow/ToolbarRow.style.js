import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { border } = THEME;

export const Wrapper = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: ${border.toolbar};
`;
