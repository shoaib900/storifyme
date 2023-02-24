import React, { useContext, useState, useRef } from "react";
import Menu from "../../form_control/MenuBar";
import SlideContext from "../../../providers/Slides/SlidesContext";
import CopyToClipboard from "react-copy-to-clipboard";

import {
  CopyOutlined,
  FileProtectOutlined,
  DeleteOutlined,
  CopyFilled,
  SwitcherFilled,
  SwitcherOutlined,
  BlockOutlined,
} from "@ant-design/icons";

const LayerChildMenu = ({
  children,
  shoaib,
  withContextMenu,
  slideId,
  childIndex,
  onCopy,
  onPaste,
  onDelete,
  child,
}) => {
  // const [value, setValue] = useState({});
  // const [copied, setCopied] = useState(false);
  console.log("hello", shoaib);

  let options = [
    {
      action: (e) => onCopy(child),
      text: "Copy",
      icon: <CopyOutlined />,
      short: " Ctrl + C",
    },
    {
      action: (e) => onPaste(e, child),
      text: "Paste",
      icon: <FileProtectOutlined />,
      short: " Ctrl + V",
    },
    {
      action: (e) => onDelete(child),
      text: "Delete",
      icon: <DeleteOutlined />,
      short: " Del",
    },
    {
      action: () => console.log("Send to Back"),
      text: "Send to Back",
      icon: <BlockOutlined />,
      short: " Ctrl + Alt + I",
    },
    {
      action: () => console.log("send Backward"),
      text: "send Backward",
      icon: <SwitcherOutlined />,
      short: " ctrl + I",
    },
    {
      action: () => console.log("Bring Forward"),
      text: "Bring Forward",
      icon: <SwitcherFilled />,
      short: " ctrl + L",
    },
    {
      action: () => console.log("Bring to Front"),
      text: "Bring to Front",
      icon: <CopyOutlined />,
      short: " Ctrl + Alt + L",
    },
    // ...hasBackgroundOption,
  ];
  const { deleteSlideChild /*,changeBackground*/ } = useContext(SlideContext);

  // console.log("111", options.text);
  console.log("112", children);
  // console.log("your code is copied", copied);
  return (
    <Menu
      onClick={() => alert("hello word")}
      menuItems={options}
      actionTrigger="contextMenu"
      disabled={withContextMenu}
    >
      {children}
    </Menu>
  );
};
export default LayerChildMenu;
