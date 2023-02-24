import React, { useRef, useContext, useEffect } from 'react'
import { Col } from 'antd'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideHeader from './SlideHeader'
import SlideFooter from './SlideFooter'
import InitialSlide from './InitialSlide'
import MiddleElements from './MiddleElements'
import { SlidesContext } from '../../../providers/Slides'
import {
  changeStoryLayer,
  addStoryLayer,
} from '../../../redux/slices/storiesSlice'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
// import 'swiper/components/pagination/pagination.min.css' //Pagination not required

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core'
import Slide from './Slide'
import { getBackgroundStyles } from '../../../helper/meta'
import { useOnDrop, useRedux } from '../../../hooks'
import { STORIES_KEY } from '../../../helper/contants'
import { useParams } from 'react-router-dom'

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination])

export default function Slides() {
  const { openDeleteModal } = useContext(SlidesContext)
  const param = useParams()
  const [dispatch, , getState] = useRedux()
  const [drop] = useOnDrop()
  const stories = getState(STORIES_KEY)
  const story = stories.data[param.storyId]

  let swiper = useRef()

  useEffect(() => {
    if (swiper.current) {
      swiper.current.swiper.slideTo(story.activeLayer)
    }
  }, [story.activeLayer])

  const addStory = (e) => {
    e.stopPropagation()
    dispatch(addStoryLayer())
  }

  let changeLayer = (e) => {
    if (swiper.current && swiper.current.swiper) {
      let sw = swiper.current.swiper
      dispatch(changeStoryLayer({ index: sw.activeIndex }))
    }
  }

  return (
    <Swiper
      // effect={'coverflow'}
      // grabCursor={true}
      // centeredSlides={true}
      initialSlide={story.activeLayer}
      allowTouchMove={false}
      slidesPerView={'auto'} //'auto' or Number of slide diplay 1,2,etc
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
      {story.storyLayers.map((layer, i) => {
        let {
          activeChildIdx,
          isActive,
          backgroundColor,
          id,
          child,
          backgroundUrl,
        } = layer
        let backgroundStyle = getBackgroundStyles({
          color: backgroundColor,
          url: backgroundUrl,
        })
        return (
          <SwiperSlide key={id} className={isActive && ''}>
            <Slide
              activeChildIndex={activeChildIdx}
              slideId={id}
              dropRef={isActive ? drop : null}
              childClass={isActive ? 'active' : 'in-active '}
              style={{ ...backgroundStyle }}
              withContextMenu={isActive}
              topBar={
                isActive && <SlideHeader number={i + 1} onAdd={addStory} />
              }
              bottomBar={
                isActive &&
                story.storyLayers.length > 1 && (
                  <SlideFooter onClick={openDeleteModal} />
                )
              }
            >
              {child}
            </Slide>
            {isActive && (
              <Col>
                <MiddleElements onAdd={addStory} />
              </Col>
            )}
          </SwiperSlide>
        )
      })}
      <SwiperSlide>
        <Col style={{ top: '18px' }}>
          <InitialSlide />
        </Col>
      </SwiperSlide>
    </Swiper>
  )
}
