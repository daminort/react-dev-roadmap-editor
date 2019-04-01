import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { bg, border, sizeControls } = THEME;

export const Wrapper = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100vh;

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

    &.box-no-border {
      border: none;
    }
    &.box-left {
      justify-content: flex-start;
    }
    &.box-right {
      justify-content: flex-end;
    }
    &.selected {
      cursor: grab;
      border: ${border.dashed};
    }
    &.dragging {
      opacity: .8;
    }

    .size-control {
      position: absolute;
      width: 4px;
      height: 4px;
      cursor: pointer;
      background-color: ${sizeControls.inactive};
      transition: all .2s linear;

      &.active,
      &:hover {
        background-color: ${sizeControls.active};
      }
      &.active {
        transform: scale(2);
      }
      &:hover {
        transform: scale(3);
      }
      &.right {
        right: -2px;
        top: calc(50% - 1px);
      }
      &.left {
        left: -2px;
        top: calc(50% - 1px);
      }
      &.top {
        left: calc(50% - 1px);
        top: -2px;
      }
      &.bottom {
        left: calc(50% - 1px);
        bottom: -2px;
      }
      &.right,
      &.left {
        &:hover {
          cursor: ew-resize;
        }
      }
      &.top,
      &.bottom {
        &:hover {
          cursor: ns-resize;
        }
      }
    }
  }
`;
