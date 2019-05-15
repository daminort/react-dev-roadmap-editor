import styled from 'styled-components';
import { THEME } from '../../constants/theme';
import { TEXT_SIZE } from '../../constants/editor';

const { bg } = THEME;

export const Wrapper = styled.div`
  display: block;
  position: relative;
  background-color: ${bg.white};
  background-size: 10px 10px;
  background-image: linear-gradient(to right, rgb(216, 216, 216) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(216, 216, 216) 1px, transparent 1px);
  box-shadow: 3px 3px 3px 1px ${bg.grey};
  
  svg {
    .svg-box {
      cursor: default;
          
      &.selected {
        cursor:pointer;
      }
    }
    
    .svg-text {
      cursor: default;
      font-size: ${TEXT_SIZE.md};
      font-weight: normal;
      
      &.text-sm {
        font-size: ${TEXT_SIZE.sm};
      }
      &.text-md {
        font-size: ${TEXT_SIZE.md};
      }
      &.text-lg {
        font-size: ${TEXT_SIZE.lg};
      }
      &.text-bold {
        font-weight: 500;
      }
      &.selected {
        cursor:pointer;
      }
    }
  }
`;
