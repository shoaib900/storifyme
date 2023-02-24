import React from 'react'
import { Card } from 'antd'
import { Drag } from '../..'
import { ItemTypes } from '../../../../helper/contants'
import { styles } from './styles'
import { MasonryItems } from '../../../MasonryItems'

const MansoryStickers = ({ stickers = [], notFoundMsg, loadingIcon }) => {
  if (stickers.length > 0) {
    return (
      <>
        <MasonryItems style={styles.mansory}>
          {stickers.map((gif) => {
            let { id, images } = gif
            return (
              <Card
                key={id}
                cover={
                  <Drag type={ItemTypes.IMAGE}>
                    <img
                      src={images.downsized_medium.url}
                      //downsized = kbs, Fixed Width >= 2Mb, Fixed Height >= 4.5Mb
                      data-url={images.downsized.url}
                      // data-url={images.downsized_medium.url}
                    />
                  </Drag>
                }
              ></Card>
            )
          })}
        </MasonryItems>
        {loadingIcon}
      </>
    )
  } else if (notFoundMsg === '') return <>{loadingIcon}</>
  return <div>{notFoundMsg}</div>
}

export default MansoryStickers
