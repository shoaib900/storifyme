import styled from 'styled-components'
import { HEADERS_TAGS, TEXTS_TAGS } from '../../../../helper/contants'

const OverlayDiv = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  background: transparent;
  width: 100%;
  height: 100%;
  z-index: 1;
`
const StyledRect = styled.div`
  ${({ dynamic_styles, tag }) => {
    let height =
      TEXTS_TAGS.includes(tag) || HEADERS_TAGS.includes(tag)
        ? { height: 'auto' }
        : {}
    return { ...dynamic_styles, ...height }
  }}
  position: absolute;
  color: rgb(117, 117, 117);
  font-size: 0.875rem;
  font-family: 'Circular Std Book';
  margin-bottom: 0px;
  line-height: 20px;
  ${({ isActive, isParentLayerActive }) => {
    return !isParentLayerActive
      ? ``
      : isActive
        ? `.border,
         .rotate,
         .square {
            opacity: 1 !important;
          }`
        : `&:hover {
        .border,
        .rotate,
        .square {
          opacity: 1 !important;
        }
      }`
  }}
  span[contenteditable] {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 8px 0 6px;
  }
  .border {
    position: absolute;
    cursor: pointer;
    width: 0;
    height: 0;
    z-index: 1;
    opacity: 0;
    &.left {
      border-left: 2px solid;
      border-color: var(--primary-color);
      left: 0;
      height: 100%;
    }
    &.right {
      border-right: 2px solid;
      border-color: var(--primary-color);
      right: 0;
      height: 100%;
    }
    &.top {
      border-top: 2px solid;
      border-color: var(--primary-color);
      top: 0;
      width: 100%;
    }
    &.bottom {
      border-bottom: 2px solid;
      border-color: var(--primary-color);
      bottom: 0;
      width: 100%;
    }
  }
  .square {
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border: 1px solid var(--primary-color);
    border-radius: 1px;
    opacity: 0;
  }
  .resizable-handler {
    position: absolute;
    width: 14px;
    height: 14px;
    cursor: pointer;
    &.tl,
    &.t,
    &.tr {
      top: -7px;
  }
    &.tl,
    &.l,
    &.bl {
      left: -7px;
  }
    &.bl,
    &.b,
    &.br {
      bottom: -7px;
    }
    &.br,
    &.r,
    &.tr {
      right: -7px;
    }
    &.l,
    &.r {
      margin-top: -7px;
    }
    &.t,
    &.b {
      margin-left: -7px;
    }
  }
  .rotate {
    position: absolute;
    left: 50%;
    top: -26px;
    width: 18px;
    height: 18px;
    margin-left: -9px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
  }
  .tl,
  .tr,
  .bl,
  .br {
    width: 7px;
    height: 7px;
  }
  .t,
  .tl,
  .tr {
    top: -3px;
  }
  .b,
  .bl,
  .br {
    bottom: -2px;
  }
  .r,
  .tr,
  .br {
    right: -2px;
    z-index: 1;
  }
  .tl,
  .l,
  .bl {
    left: -3px;
    z-index: 1;
  }
  .l,
  .r {
    top: 50%;
    margin-top: -7px;
    height: 14px;
  }
  .t,
  .b {
    left: 50%;
    margin-left: -3px;
    width: 14px;
    z-index: 1;
  }
`
export { OverlayDiv, StyledRect }
