import React from 'react'
import { Card } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { isUrl, isValidObject } from '../../../../helper/meta'
import { MasonryItems } from '../../../MasonryItems'
import Drag from '../../Drag/Drag'
import { ItemTypes } from '../../../../helper/contants'

const MasonaryImages = ({
  alt,
  images = [],
  stories = [],
  noFoundMsg,
  loadingIcon,
}) => {
  const { active_storyId, data } = stories
  let { activeLayer, storyLayers } = data[active_storyId]
  let bgImgSrc = storyLayers[activeLayer].backgroundUrl
  let backgroundImg = !isValidObject(alt) && isUrl(bgImgSrc)

  const hasBackgroundImg = (urls) => {
    let imgsUrls = Object.keys(urls).map((key) => urls[key])
    return imgsUrls.includes(bgImgSrc)
  }

  if (images.length > 0) {
    return (
      <>
        <MasonryItems>
          {images.map(({ urls }, i) => {
            return (
              <Card
                className={
                  backgroundImg && hasBackgroundImg(urls) ? 'selectedImg' : ''
                }
                key={i}
                cover={
                  <Drag type={ItemTypes.IMAGE}>
                    <img alt={alt} src={urls.thumb} data-url={urls.regular} />
                  </Drag>
                }
                bodyStyle={
                  backgroundImg && hasBackgroundImg(urls)
                    ? { position: 'absolute' }
                    : {}
                }
              >
                {backgroundImg && hasBackgroundImg(urls) && (
                  <CheckCircleTwoTone
                    twoToneColor='#52c41a'
                    style={{ fontSize: '18px' }}
                  />
                )}
              </Card>
            )
          })}
        </MasonryItems>
        {loadingIcon}
      </>
    )
  } else if (!noFoundMsg) return loadingIcon
  else return <div>{noFoundMsg}</div>
}

export default MasonaryImages
