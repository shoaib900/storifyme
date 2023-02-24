import React, { useState, useEffect, useCallback } from "react";
import { MULTI_MEDIA_TAGS, ZOOM_OPTS } from "../../../helper/contants";
import { debounce } from "../../../helper/meta";
import { useRedux } from "../../../hooks";
import {
  changeLayerElementChildText,
  changeRectAlignments,
} from "../../../redux/slices/storiesSlice";
import ResizableRect from "./ResizableRect";

const Resize = ({
  rectStyles,
  index,
  isActive,
  child,
  isParentLayerActive,
}) => {
  const [alignments, setAlignments] = useState(rectStyles);
  // console.log("alignment", alignments);

  const { width, top, left, height, rotateAngle } = alignments;
  let { tag, src, text, child_style } = child;
  let [content, setContent] = useState(text);
  let [isEdit, setEditing] = useState(false);
  let [dispatch] = useRedux();

  useEffect(() => {
    console.log("object");
    return () => setEditing(false);
  }, [isActive]);

  let changeRectStyles = useCallback(
    debounce(
      (newAligns) => dispatch(changeRectAlignments({ newAligns, index })),
      300
    ),
    []
  );

  let editable = (e) => {
    console.log("Text Edit");
    setEditing(true);
  };

  let handleTextChange = useCallback(
    debounce(
      (e) =>
        dispatch(
          changeLayerElementChildText({ text: e.target.innerText, index })
        ),
      300
    ),
    []
  );

  const handleResize = (style, isShiftKey, type) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    changeRectStyles(alignments);
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    setAlignments({
      ...alignments,
      top,
      left,
      width,
      height,
    });
  };

  const handleRotate = (rotateAngle) => {
    changeRectStyles(alignments);
    setAlignments({
      ...alignments,
      rotateAngle,
    });
  };

  const handleDrag = (deltaX, deltaY) => {
    // changeRectStyles()
    changeRectStyles(alignments);
    setAlignments({
      ...alignments,
      left: alignments.left + deltaX,
      top: alignments.top + deltaY,
    });
    console.log("left", left);
    console.log("top", top);
    console.log("alignments", alignments);
  };

  // console.log("dragging");

  let isMultiMediaTag = MULTI_MEDIA_TAGS.includes(tag) ? true : false;
  let editableProps = { contentEditable: true };
  let props = isMultiMediaTag
    ? { src: `${src}`, top, left }
    : {
        ...editableProps,
        // onDoubleClick: editable,
        onKeyDown: handleTextChange,
        suppressContentEditableWarning: true,
        top,
        left,
        spellCheck: false,
      };

  let children = isMultiMediaTag ? null : content;

  return (
    <ResizableRect
      left={left}
      top={top}
      width={width}
      height={height}
      rotateAngle={rotateAngle}
      // aspectRatio={false}
      // minWidth={10}
      // minHeight={10}
      zoomable={ZOOM_OPTS[tag]}
      // rotatable={true}
      // onRotateStart={handleRotateStart}
      onRotate={handleRotate}
      // onRotateEnd={handleRotateEnd}
      // onResizeStart={handleResizeStart}
      onResize={handleResize}
      // onResizeEnd={handleUp}
      // onDragStart={handleDragStart}
      onDrag={handleDrag}
      // onDragEnd={handleDragEnd}
      isActive={isActive}
      isEdit={isEdit}
      onDoubleClickText={editable}
      isParentLayerActive={isParentLayerActive}
      index={index}
    >
      {React.createElement(
        `${tag}`,
        {
          ...props,
          style: child_style,
        },
        children
      )}
    </ResizableRect>
  );
};

Resize.defaultProps = {
  rectStyles: {},
  index: 0,
  isActive: true,
  child: {},
};

export { Resize };
