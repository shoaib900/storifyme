import React, { useState } from 'react'
import { Card } from 'antd'
import { Drag } from '../../Drag'
import { ItemTypes } from '../../../../helper/contants'

const Preview = ({ videoData }) => {
  let [play, setPlay] = useState(false)
  let video = videoData.video_files[3]
  let [loaded,isVideoImgLoaded] = useState(false)
  return (
    <div
      className='video'
      onMouseEnter={() => setPlay(true)}
      onMouseOut={() => setPlay(false)}
    >
      {!play ? (
        <>
          <Card
            cover={
              <Drag type={ItemTypes.IMAGE}>
                <img alt='' src={videoData.image} onLoad={()=> isVideoImgLoaded(true)}/>
              </Drag>
            }
          />
          {loaded && <span></span>}
        </>
      ) : (
        <Card
          cover={
            <Drag type={ItemTypes.VIDEO}>
              <video
                loop
                autoPlay
                alt=''
                poster={videoData.image}
                id={video.id}
              >
                <source type='video/mp4' src={video.link}></source>
              </video>
            </Drag>
          }
        />
      )}
    </div>
  )
}

export default Preview
