import React, { useContext, useEffect, useState } from "react";
// import { useDrop } from 'react-dnd'
import { Card, Col } from "antd";
import SlideHeader from "./SlideHeader";
import SlideFooter from "./SlideFooter";
import InitialSlide from "./InitialSlide";
import MiddleElements from "./MiddleElements";
import { SlidesContext } from "../../../providers/Slides";
import { ItemTypes, STORIES_KEY } from "../../../helper/contants";
import { useOnDrop, useRedux } from "../../../hooks";
import { useParams } from "react-router-dom";
import { getBackgroundStyles } from "../../../helper/meta";
import {
  addStoryLayer,
  changeStoryLayer,
} from "../../../redux/slices/storiesSlice";

const Slides = () => {
  const { openDeleteModal, slides } = useContext(SlidesContext);
  const param = useParams();
  const [dispatch, , getState] = useRedux();
  const [drop] = useOnDrop();
  const stories = getState(STORIES_KEY);
  const story = stories.data[param.storyId];
  useEffect(() => {
    console.log(story);
  }, [story]);

  // useEffect(() => {
  // setSlidesView(getSlides())
  // }, [slides])

  let isCurrentSlideRendered = false;
  const addStory = (e) => {
    // e.stopPropagation()
    dispatch(addStoryLayer());
  };

  const Slide = ({
    className,
    childClass = "in-active",
    style,
    children,
    topBar,
    bottomBar,
    onClick = () => {},
  }) => (
    <Col className={className} onClick={() => onClick()}>
      {topBar}
      <Card className={childClass} style={style}>
        {children}
      </Card>
      {bottomBar}
    </Col>
  );

  return (
    <>
      {story.storyLayers.map((layer, i) => {
        const { isActive, backgroundColor, id, child, backgroundUrl } = layer;
        let backgroundStyle = getBackgroundStyles({
          color: backgroundColor,
          url: backgroundUrl,
        });
        return (
          <>
            {!isActive && i < 2 && !isCurrentSlideRendered ? (
              <Slide
                key={i}
                className={
                  i === 0 && !story.storyLayers[i + 1]?.isActive
                    ? "past-slide"
                    : "prev-slide"
                }
                style={{ ...backgroundStyle }}
                onClick={() => dispatch(changeStoryLayer({ index: i }))}
              />
            ) : isCurrentSlideRendered ? (
              <>
                <Slide
                  className={
                    story.storyLayers[i + 1] !== undefined ||
                    story.storyLayers[i - 1].isActive
                      ? "next-slide"
                      : "future-slide"
                  }
                  style={{ background: backgroundColor }}
                  onClick={() => dispatch(changeStoryLayer({ index: i }))}
                />
              </>
            ) : (
              (isCurrentSlideRendered = true && (
                <div className="current-slide" ref={drop}>
                  <Slide
                    className="ml-25"
                    style={{ background: backgroundColor }}
                    childClass="slide"
                    topBar={
                      <SlideHeader
                        number={story.activeLayer + 1}
                        onAdd={addStory}
                      />
                    }
                    bottomBar={
                      story.storyLayers.length > 1 && (
                        <SlideFooter onClick={openDeleteModal} />
                      )
                    }
                  >
                    {child}
                  </Slide>
                  <Col className="mx-25">
                    <MiddleElements onAdd={addStory} />
                  </Col>
                </div>
              ))
            )}
          </>
        );
      })}
      {/* <Col className={lastIndex < 5 ? 'next-slide' : 'future-slide'}>
          <InitialSlide />
        </Col> */}
    </>
  );
};

export default Slides;

/* Storyfyme Reanders story:
     <Col className='past-slide'>
        <Card className='in-active'></Card>
      </Col>
      <Col className='prev-slide'>
        <Card className='in-active'></Card>
      </Col>
      <div className='current-slide'>
        <Col className='mx-25'>
          <SlideHeader />
          <Card className='slide'></Card>{' '}
        </Col>
        <Col className='mx-25'>
          <MiddleElements />
        </Col>
      </div>
      <Col className='next-slide'>
        <Card className='in-active'></Card>
      </Col>
      <Col className='future-slide'>
        <InitialSlide />
      </Col>
*/
