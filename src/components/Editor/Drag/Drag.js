import React, { useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useRedux } from "../../../hooks";
import { updateStoryLayer } from "../../../redux/slices/storiesSlice";

const Drag = ({ children, dragPreviewSrc, type }) => {
  const [dispatch] = useRedux();
  const [{ isDragging }, drag, preview] = useDrag({
    type,
    item: { children },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const updateSlideOnClick = () => {
    let val = "",
      alt = "";
    let { props } = children;
    if (type === "img") {
      val = props["data-url"] ?? props.src;
      alt = props.alt;
    } else {
      val = props.children.props.children;
    }
    dispatch(updateStoryLayer({ type, val, alt }));
    console.log("Drag.js", val);
    console.log("Drag.js1", type, alt);
  };

  return (
    <>
      {dragPreviewSrc && (
        <DragPreviewImage connect={preview} src={dragPreviewSrc} />
      )}
      {React.cloneElement(children, {
        ref: drag,
        onClick: updateSlideOnClick,
      })}
    </>
  );
};

Drag.defaultProps = {
  dragPreviewSrc: null,
};

export default Drag;
