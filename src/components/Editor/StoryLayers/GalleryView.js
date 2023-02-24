import React, { useRef, useContext, useState } from "react";
import { Col } from "antd";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
import LayerFooter from "./LayerFooter";
import LayerHeader from "./LayerHeader";
import { SlidesContext } from "../../../providers/Slides";
import { ReactSortable } from "react-sortablejs";

import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import Layer from "./Layer";
import { getBackgroundStyles, validValue } from "../../../helper/meta";
import { useOnDrop, useRedux, useStories } from "../../../hooks";
import { useParams } from "react-router-dom";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const GalleryView = () => {
  const { openDeleteModal } = useContext(SlidesContext);
  const param = useParams();
  const [dispatch, getState] = useRedux();
  const [drop] = useOnDrop();
  const story = useStories();
  const data = story.storyLayers;
  // let swiper = useRef()
  const [hi, setHi] = useState(data);

  // console.log("111", story.storyLayers);
  // console.log("112", hi)

  return (
    <>
      <ReactSortable
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: "grey",
          padding: "25px",
        }}
        className="custom-slide"
        list={hi}
        setList={setHi}
        animation={10}
        onChange={(order, sortable, evt) => {}}
        onEnd={(evt) => {}}
      >
        {hi.map((layer, i) => {
          let {
            activeElementIndex,
            isActive,
            backgroundColor,
            id,
            backgroundUrl,
            elements,
            isDefault = false,
          } = layer;
          let backgroundStyle = getBackgroundStyles({
            color: backgroundColor,
            url: backgroundUrl,
          });
          return (
            <SwiperSlide key={id}>
              {isDefault ? (
                <Col style={{ top: "1px" }}> </Col>
              ) : (
                <>
                  <Layer
                    key={i}
                    activeElementIndex={activeElementIndex}
                    //   isParentLayerActive={isActive}
                    layerId={id}
                    layerElements={elements}
                    style={{
                      ...backgroundStyle,
                      height: "300px",
                      width: "180px",
                    }}
                    // topBar={<LayerHeader number={i + 1} />}
                    bottomBar={
                      story.storyLayers.length > 1 && (
                        <LayerFooter onClick={openDeleteModal} />
                      )
                    }
                  />
                </>
              )}
            </SwiperSlide>
          );
        })}
      </ReactSortable>
    </>
  );
};

export default GalleryView;
