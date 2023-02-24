import React from 'react'
import { Card } from 'antd'
import { Drag } from '../..'
import { ItemTypes } from '../../../../helper/contants'
import { styles } from './styles'
import { MasonryItems } from '../../../MasonryItems'

const MansoryStickers = ({ giphys = [], notFoundMsg, loadingIcon }) => {
  if (giphys.length > 0) {
    return (
      <>
        <MasonryItems style={styles.mansory}>
          {giphys.map((gif, i) => {
            return (
              <Card
                key={i}
                cover={
                  <Drag type={ItemTypes.IMAGE}>
                    <img src={gif.images.fixed_width.url} />
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
