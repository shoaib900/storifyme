import React, { Fragment } from 'react'
import shapes from '../../../../assets/s3-bucket/shapes.json'
import Masonry from 'react-responsive-masonry'
import { Drag } from '../../'
import { ItemTypes } from '../../../../helper/contants'
import { Loading } from '../../../Icons'

const Shapes = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <Fragment>
      {loading ? (
        <div className='spinner'>
          <Loading />
        </div>
      ) : (
        <Masonry
          columnsCount={3}
          gutter='20px'
          style={{
            width: '81%',
            overflowY: 'scroll',
            height: '83vh',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}
        >
          {shapes.map((url, index) => {
            return (
              <Drag type={ItemTypes.IMAGE} key={index}>
                <img
                  width='60'
                  alt={`shape-${index}`}
                  src={url}
                  style={{ color: '#fff' }}
                />
              </Drag>
            )
          })}
        </Masonry>
      )}
    </Fragment>
  )
}

export default Shapes
