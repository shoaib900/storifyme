import { func, number, bool, string, object } from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  BORDERS,
  MULTI_MEDIA_TAGS,
  STORIES_KEY,
  ZOOMABLE_MAP,
} from "../../../../helper/contants";
// import { useSelector, useDispatch } from "react-redux";

import {
  activeStory,
  activeStoryLayerChild,
  deActiveStoryLayerChild,
} from "../../../../redux/slices/storiesSlice";
import { getAngle, getCursor, getLength } from "../utils";
import { StyledRect, OverlayDiv } from "./StyledRect";
class Rect extends PureComponent {
  static propTypes = {
    index: number,
    setEdit: func,
    styles: object,
    zoomable: string,
    rotatable: bool,
    onResizeStart: func,
    onResize: func,
    onResizeEnd: func,
    onRotateStart: func,
    onRotate: func,
    onRotateEnd: func,
    onDragStart: func,
    onDrag: func,
    onDragEnd: func,
    parentRotateAngle: number,
  };

  setElementRef = (ref) => {
    this.$element = ref;
  };
  outsidesEl = document.querySelectorAll(".active"); //.content

  componentDidMount() {
    this.outsidesEl.forEach((el) => {
      el.addEventListener("mousedown", this.handleClickOutside, false);
    });
  }

  componentWillUnmount() {
    // document
    //   .querySelectorAll('.active,.content')
    //   .removeEventListener('mousedown', this.handleClickOutside, false)
    this.outsidesEl.forEach((el) => {
      el.removeEventListener("mousedown", this.handleClickOutside, false);
    });
  }

  handleClickOutside = (e) => {
    let { dispatch, index, isParentLayerActive, isActive, children, isEdit } =
      this.props;
    // isActive && e.stopPropagation()
    // MULTI_MEDIA_TAGS.includes(children.type) && !
    isActive && !isEdit && e.preventDefault();
    let isClickInside = this.$element?.contains(e.target);
    if (isParentLayerActive) {
      if (isClickInside && !isActive) {
        // console.log('Click Inside', index)
        dispatch(activeStoryLayerChild(index));
        return;
      } else if (!isClickInside && isActive) {
        // console.log('Click Outside', e)
        // console.log(e.currentTarget)
        dispatch(deActiveStoryLayerChild(index));
        return;
      } else return;
    } else return;
  };

  // Drag
  startDrag = (e) => {
    if (!this.props.isParentLayerActive) return;
    let { clientX: startX, clientY: startY } = e;
    this.props.onDragStart && this.props.onDragStart();
    this._isMouseDown = true;
    const onMove = (e) => {
      if (!this._isMouseDown) return; // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      this.props.onDrag(deltaX, deltaY);
      startX = clientX;
      startY = clientY;
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!this._isMouseDown) return;
      this._isMouseDown = false;
      this.props.onDragEnd && this.props.onDragEnd();
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // Rotate
  startRotate = (e) => {
    if (e.button !== 0) return;
    const { clientX, clientY } = e;
    const {
      styles: {
        transform: { rotateAngle: startAngle },
      },
    } = this.props;
    const rect = this.$element.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const startVector = {
      x: clientX - center.x,
      y: clientY - center.y,
    };
    this.props.onRotateStart && this.props.onRotateStart();
    this._isMouseDown = true;
    const onMove = (e) => {
      if (!this._isMouseDown) return; // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const rotateVector = {
        x: clientX - center.x,
        y: clientY - center.y,
      };
      const angle = getAngle(startVector, rotateVector);
      this.props.onRotate(angle, startAngle);
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!this._isMouseDown) return;
      this._isMouseDown = false;
      this.props.onRotateEnd && this.props.onRotateEnd();
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };
  // const userd = useSelector((state) => state.auth.user);

  // function mapStateToProps(state) {
  //   const { todos } = state
  //   return { todoList: todos.allIds }
  // }
  // Resize
  startResize = (e, cursor) => {
    if (e.button !== 0) return;
    document.body.style.cursor = cursor;
    const {
      styles: {
        position: { centerX, centerY },
        size: { width, height },
        transform: { rotateAngle },
      },
    } = this.props;
    const { clientX: startX, clientY: startY } = e;
    const rect = { width, height, centerX, centerY, rotateAngle };
    const type = e.target.getAttribute("class").split(" ")[0];
    this.props.onResizeStart && this.props.onResizeStart();
    this._isMouseDown = true;
    const onMove = (e) => {
      // if (!this._isMouseDown) return; // patch: fix windows press win key during mouseup issue
      // e.stopImmediatePropagation();
      // const { clientX, clientY } = e;
      // const deltaX = clientX - startX;
      // const deltaY = clientY - startY;
      // const alpha = Math.atan2(deltaY, deltaX);
      // const deltaL = getLength(deltaX, deltaY);
      // const isShiftKey = e.shiftKey;
      // this.props.onResize(deltaL, alpha, rect, type, isShiftKey);
    };

    const onUp = () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!this._isMouseDown) return;
      this._isMouseDown = false;
      this.props.onResizeEnd && this.props.onResizeEnd();
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  render() {
    const {
      dispatch,
      index,
      isActive,
      isParentLayerActive,
      onDoubleClickText,
      isEdit,
      stories,
      styles: {
        position: { centerX, centerY },
        size: { width, height },
        transform: { rotateAngle },
      },
      zoomable,
      rotatable,
      parentRotateAngle,
      children,
    } = this.props;
    console.log("isEdit", isEdit);

    const style = {
      width: Math.abs(width),
      height: MULTI_MEDIA_TAGS.includes(children.type)
        ? Math.abs(height)
        : "auto",
      transform: `rotate(${rotateAngle}deg)`,
      left: centerX - Math.abs(width) / 2,
      top: centerY - Math.abs(height) / 2,
      // position: 'absolute',
    };
    const direction = zoomable
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d); // TODO: may be speed up

    // const { animations } = useSelector((state) => state[STORIES_KEY])
    // console.log("animations are", animations);

    const animate = this.props.stories.animations;
    const activeStory = this.props.stories.active_storyId;

    return (
      <>
        <StyledRect
          ref={this.setElementRef}
          isActive={isActive}
          isParentLayerActive={isParentLayerActive}
          onMouseDown={this.startDrag}
          // onClick={this.startDrag}
          className={`rect single-resizer ${animate}`}
          // dynamic_styles={style}
          // tag={Tag}
          style={style}
        >
          {BORDERS.map((b) => (
            <div key={b} className={`border ${b}`}></div>
          ))}
          {rotatable && (
            <div className="rotate" onMouseDown={this.startRotate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path
                  d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
                  fillRule="nonzero"
                  fill="#1890ff"
                />
              </svg>
            </div>
          )}
          {direction.map((d) => {
            const cursor = `${getCursor(
              rotateAngle + parentRotateAngle,
              d
            )}-resize`;
            return (
              <div
                key={d}
                style={{ cursor }}
                className={`${ZOOMABLE_MAP[d]} resizable-handler`}
                onMouseDown={(e) => this.startResize(e, cursor)}
              />
            );
          })}
          {direction.map((d, i) => {
            return <div key={i} className={`${ZOOMABLE_MAP[d]} square`} />;
          })}
          {children}
          {!isEdit && <OverlayDiv onDoubleClick={onDoubleClickText} />}
        </StyledRect>
      </>
    );
  }
}

// const { animations } = useSelector((state) => state[STORIES_KEY])
// console.log("animations are", animations);

const mapStateToProps = (state) => ({
  stories: state[STORIES_KEY].present,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rect);
