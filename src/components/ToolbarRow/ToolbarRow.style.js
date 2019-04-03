import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { border, font } = THEME;

export const Wrapper = styled.div`
  padding: 8px 0;
  border-bottom: ${border.toolbar};

  &.noBorder {
    border-bottom: none;
  }

  .title {
    font-size: ${font.label};
    font-weight: 500;
    margin-bottom: 8px;
  }

  .content {
    width: 100%;
  }
`;
