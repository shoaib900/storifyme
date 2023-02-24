import React, { useRef, useContext, useEffect, useState } from "react";
import { Col } from "antd";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import LayerHeader from "./LayerHeader";
import LayerFooter from "./LayerFooter";
import DefaultLayer from "./DefaultLayer";
import LayerController from "./LayerController";
import { SlidesContext } from "../../../providers/Slides";
import {
  changeStoryLayer,
  addStoryLayer,
  copyStoryLayer,
  updatePostStoryLayer,
  updateIndex1StoryLayer,
} from "../../../redux/slices/storiesSlice";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
// import 'swiper/components/pagination/pagination.min.css' //Pagination not required

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import Layer from "./Layer";
import { getBackgroundStyles, validValue } from "../../../helper/meta";
import { useOnDrop, useRedux, useStories } from "../../../hooks";
import { STORIES_KEY } from "../../../helper/contants";
import { useParams } from "react-router-dom";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const StoryLayers = () => {
  const { openDeleteModal } = useContext(SlidesContext);
  const [clipboard, setclipboard] = useState({});
  const param = useParams();
  const [dispatch, , getState] = useRedux();
  const [drop] = useOnDrop();
  const story = useStories();
  // const story = stories.data[param.storyId]
  console.log("story", story);

  // let st = useStories()
  // console.log(st)

  let swiper = useRef();

  useEffect(() => {
    if (swiper.current && validValue(story?.activeLayer)) {
      swiper.current.swiper.slideTo(story.activeLayer);
    } else swiper.current.swiper.slideTo(swiper.current.swiper.activeIndex);
  }, [story?.activeLayer]);

  const addStory = () => {
    // e.stopPropagation()
    dispatch(addStoryLayer());
  };

  const onCopy = (el) => {
    console.log("onCopy", el);
    setclipboard(el);
  };

  const onPaste = (index, chik) => {
    dispatch(
      updatePostStoryLayer({
        type: clipboard.tag,
        val: clipboard.tag == "img" ? clipboard.src : clipboard.text,
        alt: "",
      })
    );
  };

  const onDelete = (el) => {
    console.log("onDelete", el);
  };

  const copyStory = () => {
    if (swiper.current && swiper.current.swiper) {
      let sw = swiper.current.swiper;
      dispatch(copyStoryLayer({ index: sw.activeIndex }));
    }
  };

  let changeLayer = (e) => {
    if (swiper.current && swiper.current.swiper) {
      let sw = swiper.current.swiper;
      dispatch(changeStoryLayer({ index: sw.activeIndex }));
    }
  };

  // console.log("number", number);

  return (
    <Swiper
      // effect={'coverflow'}
      // grabCursor={true}
      // centeredSlides={true}
      initialSlide={story?.activeLayer ?? swiper.current.swiper.activeIndex}
      allowTouchMove={false}
      slidesPerView={"auto"} //'auto' or Number of slide diplay 1,2,etc
      slideToClickedSlide
      spaceBetween={30}
      centeredSlides
      // pagination={{
      //   clickable: true,
      // }}
      // coverflowEffect={{
      //   rotate: 50,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 1,
      //   slideShadows: true,
      // }}
      // pagination={true}
      ref={swiper}
      // speed={500}
      onSlideChange={changeLayer}
    >
      {story?.storyLayers.map((layer, i) => {
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
          <SwiperSlide
            key={id}
            id={id}
            className={isActive && ""}
            style={{
              width: "265px",
              height: "400px",
            }}
          >
            {isDefault ? (
              <Col style={{ top: "18px" }}>
                <DefaultLayer />
              </Col>
            ) : (
              <div>
                <Layer
                  key={i}
                  onCopy={onCopy}
                  onPaste={onPaste}
                  onDelete={onDelete}
                  activeElementIndex={activeElementIndex}
                  isParentLayerActive={isActive}
                  layerId={id}
                  layerElements={elements}
                  dropRef={isActive ? drop : null}
                  childClass={isActive ? "active" : "in-active "}
                  style={{ ...backgroundStyle }}
                  withContextMenu={isActive}
                  topBar={
                    isActive && (
                      <LayerHeader
                        number={i + 1}
                        onAdd={addStory}
                        onCopy={copyStory}
                      />
                    )
                  }
                  bottomBar={
                    isActive &&
                    story.storyLayers.length > 1 && (
                      <LayerFooter onClick={openDeleteModal} />
                    )
                  }
                />
                {isActive && (
                  <Col>
                    <LayerController onAdd={addStory} />
                  </Col>
                )}
              </div>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default StoryLayers;
