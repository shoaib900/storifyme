import React, { useContext, useState, useRef } from "react";
import { Button, Layout, Row, Steps } from "antd";
import { FaLayerGroup, FaRuler } from "./FontAwesome";
// import WidthDropDown from "./Editor/WidthDropDown";
import { SlidesContext } from "../providers/Slides";
import StoryLayers from "./Editor/StoryLayers";
import GalleryView from "./Editor/StoryLayers/GalleryView";

import { Select } from "antd";
const { Option } = Select;

// const handleChange = (value) => {
//   console.log(`selected is ${value}`);
// };

const { Content } = Layout;

// import { ReactSortable } from "react-sortablejs";

export default function MainContent() {
  const [gallery, setGallery] = useState(true);
  const [xoom, setXoom] = useState("100");

  const { slides } = useContext(SlidesContext);
  const noOfSlides = slides.length;
  const slidesCount = `${noOfSlides} Slide${noOfSlides > 1 ? "(s)" : ""}`;

  console.log(noOfSlides);

  const exampleRef = useRef(null);

  const clickMe = (event) => {
    exampleRef.current.style.zoom = event;
    setXoom(exampleRef.current?.style.zoom.slice(0, 2));
  };

  return (
    <div
      style={{
        height: "5000vh",
        width: "100%",
        padding: "-100px",
        overflow: "hidden",
      }}
    >
      <Content className={"content xoom" + xoom}>
        <div ref={exampleRef}>
          <Row className="slider">
            {gallery ? (
              <StoryLayers />
            ) : (
              <div style={{ width: "100%", height: "450px" }}>
                <GalleryView />
              </div>
            )}
          </Row>
        </div>

        {gallery ? (
          <div className="bottomButtons">
            <Button type="default" className="btn">
              <FaRuler />
            </Button>
            {/* <WidthDropDown /> */}
            <Select
              defaultValue="101%"
              style={{ width: 100, marginLeft: 14 }}
              onChange={(event) => clickMe(event)}
            >
              <Option value="101%">Fit</Option>
              <Option value="25%">25% </Option>
              <Option value="50%">50%</Option>
              <Option value="75%">75%</Option>
              <Option value="100%">100%</Option>
              <Option value="125%">125%</Option>
              <Option value="150%">150%</Option>
              <Option value="175%">175%</Option>
              <Option value="200%">200%</Option>
            </Select>

            <Button
              type="default"
              className="btn"
              onClick={() => setGallery(false)}
            >
              <FaLayerGroup /> &nbsp; {slidesCount}
            </Button>
          </div>
        ) : (
          <div className="bottomButtons">
            <Button
              type="default"
              className="btn close"
              onClick={() => setGallery(true)}
            >
              close
            </Button>
          </div>
        )}
      </Content>
    </div>
  );
}
