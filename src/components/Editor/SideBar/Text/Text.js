import React, { useRef } from "react";
import { Col, Row } from "antd";
import { Drag } from "../../";
import { ItemTypes } from "../../../../helper/contants";
import { styles } from "./styles";

const Text = () => {
  const exampleRef = useRef(null);
  const clickMe = () => {
    exampleRef.current.style.color = "red";
  };

  return (
    <div>
      <Row style={styles.row}>
        <Drag type={ItemTypes.HEADER1}>
          <Col span={24} style={styles.col}>
            <h1
              style={styles.title}
              ref={exampleRef}
              onClick={(e) => clickMe(e)}
            >
              Add Heading 1
            </h1>
          </Col>
        </Drag>
        <Drag type={ItemTypes.HEADER2}>
          <Col span={24} style={styles.col}>
            <h2 style={styles.headerOne}>Add Heading 2</h2>
          </Col>
        </Drag>
        <Drag type={ItemTypes.HEADER3}>
          <Col span={24} style={styles.col}>
            <h3 style={styles.headerTwo}>Add Heading 3</h3>
          </Col>
        </Drag>
        <Drag type={ItemTypes.PARAGRAPH}>
          <Col span={24} style={styles.col}>
            <p style={styles.paragraph}>Add Paragraph</p>
          </Col>
        </Drag>
        <Drag type={ItemTypes.SPAN}>
          <Col span={24} style={styles.col}>
            <p style={styles.sText}>Add Supporting Text</p>
          </Col>
        </Drag>
      </Row>
    </div>
  );
};

export default Text;
