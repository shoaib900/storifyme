import React, { useEffect, useRef, useState } from "react";
import { Col, InputNumber, Row, Slider } from "antd";
import { FaStopwatch } from "../../FontAwesome";

const AutoAdvance = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [delay, setDelay] = useState(5);
  const autoAdvanceModal = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!autoAdvanceModal.current?.contains(e.target)) {
        setModalVisible(false);
      }
    });
  }, []);
  const onChange = (value) => setDelay(value);
  console.log("first", delay);
  return (
    <>
      <Row style={{ marginTop: 25 }}>
        <Col
          id="auto-features"
          style={{
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setModalVisible(!modalVisible);
          }}
        >
          <FaStopwatch />
          <Row style={{ marginTop: 10 }}>
            <Col>Auto advance</Col>
          </Row>
        </Col>
      </Row>

      {!modalVisible ? null : (
        <div
          ref={autoAdvanceModal}
          id="auto-features-modal"
          className="customModal"
        >
          <div className="topContent">
            <input
              type="checkbox"
              id="auto-adv"
              onChange={(e) => console.log(e.target.checked)}
            />
            <label htmlFor="auto-adv">Enable auto advance</label>
          </div>
          <h6>Delay</h6>
          <div className="slider">
            <Row>
              <Col span={8}>
                <Slider
                  style={{ width: "80px" }}
                  min={1}
                  max={15}
                  onChange={onChange}
                  trackStyle={{ backgroundColor: "black" }}
                  handleStyle={{ backgroundColor: "black", border: "black" }}
                  value={delay}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={delay}
                  max={15}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    marginLeft: "60px",
                    color: "black",
                  }}
                  value={`${delay}s`}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default AutoAdvance;
