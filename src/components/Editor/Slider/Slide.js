import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import SlideMenu from "./SlideMenu";

const Slide = ({
  activeChildIndex,
  className,
  childClass,
  style,
  children,
  withContextMenu,
  topBar,
  bottomBar,
  onClick,
  dropRef,
  slideId,
}) => {
  // const [slideChildren, setSlideChildren] = useState([])
  // useEffect(() => {
  //   setSlideChildren(children)
  // }, [children])
  // console.log(activeChildIndex)
  return (
    <Col
      ref={dropRef}
      className={className}
      onClick={() => onClick()}
      style={{ top: childClass !== "active" && "16px" }}
    >
      {topBar}
      <Card
        className={childClass}
        style={{
          width: "265px",
          height: "465px",
          borderRadius: "2px",
          position: "relative",
          ...style,
        }}
      >
        {children
          ? children.map((child, i) => {
              //children = child array in story layer
              // i !== activeChildIndex
              return (
                <>
                  {true && (
                    <SlideMenu
                      childIndex={i}
                      slideId={slideId}
                      withContextMenu={!withContextMenu}
                      key={i}
                    >
                      {child}
                    </SlideMenu>
                  )}
                </>
              );
            })
          : null}
      </Card>
      {bottomBar}
    </Col>
  );
};

Slide.defaultProps = {
  className: "",
  childClass: "in-active",
  style: {},
  children: null,
  withContextMenu: false,
  topBar: null,
  bottomBar: null,
  onClick: () => {},
};

export default Slide;
