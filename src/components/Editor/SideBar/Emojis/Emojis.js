import 'emoji-mart/css/emoji-mart.css'
import React, { Fragment } from 'react'
import emojis from '../../../../assets/s3-bucket/emojis.json'
import Masonry from 'react-responsive-masonry'
import { Drag } from '../../'
import { ItemTypes } from '../../../../helper/contants'
import { Loading } from '../../../Icons'

const Emojis = () => {
  const [result, setResult] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  return (
    <Fragment>
      {loading ? (
        <div className='spinner'>
          <Loading />
        </div>
      ) : (
        <Masonry
          columnsCount={5}
          gutter='10px'
          style={{
            width: '80%',
            overflowY: 'scroll',
            height: '83vh',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            padding: '0 16px',
            cursor: 'pointer',
          }}
        >
          {emojis.map((url, index) => {
            return (
              <Drag type={ItemTypes.IMAGE} key={index}>
                <img width='30' alt={`emoji-${index}`} src={url} />
              </Drag>
            )
          })}
        </Masonry>
      )}
    </Fragment>
  )
}

export default Emojis
