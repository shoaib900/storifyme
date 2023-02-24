import React from "react";
import { Row, Col } from "antd";
import { FaCopy, FaEllipsisV, FaSquarePlus, FaTrash } from "../../FontAwesome";
import BasicButton from "../../form_control/BasicButton";
import MenuBar from "../../form_control/MenuBar";

const LayerHeader = ({ number, onAdd, onCopy }) => {
  let slideItems = [
    { text: "Add Slide", action: onAdd, icon: <FaSquarePlus /> },
    { text: "Copy Slide", action: onCopy, icon: <FaCopy /> },
    { text: "Delete Slide", icon: <FaTrash /> },
  ];
  return (
    <Row justify="space-between">
      <Col span={8}>Slide {number}</Col>
      {/* <Col
        span={6}
        style={{
          display: 'flex',
          // justifyContent: 'space-between',
          justifyContent: 'flex-end',
        }}
      > */}
      <MenuBar menuItems={slideItems}>
        <BasicButton
          icon={<FaEllipsisV />}
          size="sm"
          type="text"
          withTooltip
          tooltipProps={{
            tooltipTitle: "More Actions",
            tooltipPosition: "top",
          }}
        />
      </MenuBar>
      {/* <BasicButton
          icon={<FaAdd />}
          size='sm'
          withTooltip
          tooltipProps={{ tooltipTitle: 'Add New Slide' }}
          onClick={onAdd}
          className='add-new-slide'
        /> */}
      {/* </Col> */}
    </Row>
  );
};

export default LayerHeader;
