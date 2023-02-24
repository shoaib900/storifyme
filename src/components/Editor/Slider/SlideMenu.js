import React, { useContext } from "react";
import Menu from "../../form_control/MenuBar";
import SlideContext from "../../../providers/Slides/SlidesContext";
const SlideMenu = ({ children, withContextMenu, slideId, childIndex }) => {
  // let backgroundOptionAvailable = ['img', 'video']
  // let hasBackgroundOption = backgroundOptionAvailable.includes(
  //   children.props.tag
  // )
  //   ? {
  //     action: () => {
  //       deleteSlideChild(childIndex, slideId)
  //     },
  //     text: 'Set as Background',
  //   }
  //   : {}

  let options = [
    { action: () => console.log("copy"), text: "Copy" },
    { action: () => console.log("Paste"), text: "Paste" },
    {
      action: () => {
        deleteSlideChild(childIndex, slideId);
      },
      text: "Delete",
    },
    // ...hasBackgroundOption,
  ];
  const { deleteSlideChild /*,changeBackground*/ } = useContext(SlideContext);
  return (
    <Menu
      menuItems={options}
      actionTrigger="contextMenu"
      disabled={withContextMenu}
    >
      {children}
    </Menu>
  );
};

export default SlideMenu;
