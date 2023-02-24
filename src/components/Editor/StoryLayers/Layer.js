import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import {
  CopyOutlined,
  FileProtectOutlined,
  DeleteOutlined,
  CopyFilled,
  SwitcherFilled,
  SwitcherOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import LayerChildMenu from "./LayerChildMenu";
import { Resize } from "../Resizable";
import { validValue } from "../../../helper/meta";
import { useStories } from "../../../hooks";

const Layer = ({
  activeElementIndex,
  isParentLayerActive,
  layerId,
  layerElements,
  className,
  childClass,
  style,
  withContextMenu,
  topBar,
  bottomBar,
  onClick,
  dropRef,
  onCopy,
  onDelete,
  onPaste,
}) => {
  let { renderElements } = useStories();
  let element = isParentLayerActive ? renderElements : layerElements;
  let els = isParentLayerActive ? renderElements : layerElements;
  // let [el, setEl] = useState([])
  // useEffect(() => {
  //   setEl(elements)
  // }, [activeElementIndex])
  useEffect(() => {
    let nam = document.getElementById("abcd");
    nam.onclick = hideMenu;
    // document.onclick = hideMenu;
    nam.oncontextmenu = rightClick;
    function hideMenu() {
      let element = document.getElementById("contextMenu");
      if (element) {
        element.style.display = "none";
      }
    }

    function rightClick(e) {
      e.preventDefault();
      let element = document.getElementById("contextMenu");
      if (element) {
        if (element.style.display == "block") hideMenu();
        else {
          var menu = element;

          menu.style.display = "block";
          // menu.style.left = e.pageX + "px";
          // menu.style.top = e.pageY + "px";
        }
      }
    }
  }, []);

  return (
    <Col
      ref={dropRef}
      className={className}
      onClick={() => onClick()}
      style={{ top: childClass !== "active" }}
    >
      {topBar}
      {/* <div id="abcd" onClick={(e) => console.log(e.type == "click")}> */}
      <div id="abcd">
        <Card
          className={childClass}
          style={{
            width: "265px",
            height: "400px",
            borderRadius: "2px",
            position: "relative",
            ...style,
          }}
        >
          {element.map((el, i) => {
            //children = child array in story layer
            let { index, rectStyles, isActive, child } = el;
            // isActive && setActiveIndex(index)
            return (
              // <></>
              <div onclick={() => alert("hello world")}>
                <LayerChildMenu
                  shoaib={"shoaib"}
                  child={child}
                  onCopy={onCopy}
                  onPaste={onPaste}
                  onDelete={onDelete}
                  childIndex={i}
                  layerId={layerId}
                  withContextMenu={!withContextMenu}
                  key={index}
                >
                  <Resize
                    index={index}
                    isActive={isActive}
                    isParentLayerActive={isParentLayerActive}
                    rectStyles={rectStyles}
                    child={child}
                  />
                </LayerChildMenu>
              </div>
            );
          })}
        </Card>
      </div>
      {bottomBar}
    </Col>
  );
};

Layer.defaultProps = {
  className: "",
  childClass: "in-active",
  style: {},
  children: null,
  withContextMenu: false,
  topBar: null,
  bottomBar: null,
  onClick: () => {},
};

export default Layer;
