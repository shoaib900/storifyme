import React, { Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
// import PropTypes from "prop-types";
import LazyLoad from 'react-lazy-load'
import Drag from '../Editor/Drag/Drag'
import { ItemTypes } from '../../helper/constants/Contants'

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Giphy = styled.img`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.21rem;
`
export const LazyImage = ({ src, alt, isGif, onGifClick }) => {
  const refPlaceholder = React.useRef()

  const removePlaceholder = () => {
    refPlaceholder.current.remove()
  }

  return (
    <Fragment>
      {isGif ? (
        <Fragment>
          <Placeholder ref={refPlaceholder} />
          <LazyLoad
            offsetTop={200}
            //   onContentVisible={() => removePlaceholder}
          >
            <Drag type={ItemTypes.IMAGE}>
              <Giphy
                onLoad={removePlaceholder}
                onError={removePlaceholder}
                src={src}
                alt={alt}
                onClick={onGifClick}
              />
            </Drag>
          </LazyLoad>
        </Fragment>
      ) : (
        <ImageWrapper>
          <Placeholder ref={refPlaceholder} />
          <LazyLoad
            offsetTop={200}
            //   onContentVisible={() => removePlaceholder}
          >
            <Drag type={ItemTypes.IMAGE}>
              <StyledImage
                onLoad={removePlaceholder}
                onError={removePlaceholder}
                src={src}
                alt={alt}
              />
            </Drag>
          </LazyLoad>
        </ImageWrapper>
      )}
    </Fragment>
  )
}

// LazyImage.propTypes = {
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
// };
