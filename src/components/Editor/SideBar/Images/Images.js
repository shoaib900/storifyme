import React, { useEffect } from 'react'
import { Row, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  EDITOR_META_KEY,
  IMAGES_PER_PAGE,
  SEARCH_IMAGES_PER_PAGE,
  STORIES_KEY,
} from '../../../../helper/contants'
import MasonaryImages from './MasonaryImages'
import { InfiniteScroller } from '../../InfiniteScroller'
import { Loading } from '../../../Icons'
import { useRedux } from '../../../../hooks'
import {
  fetchImages,
  searchImages,
} from '../../../../redux/thunks/fetchEditorMeta'
import { styles } from './styles'
import { UNSPLASH_CLIENT_ID } from '../../../../config'
import { validString } from '../../../../helper/meta'
import { clearSearch } from '../../../../redux/slices/editorMetaSlice'

const Images = ({ alt = {} }) => {
  const [dispatch, state, getState] = useRedux()

  const stories = getState(STORIES_KEY)


  const {
    loadingImages,
    images,
    searchedImages,
    searchedBackgroundImages,
    searchingImagesFor,
    searchingBackgroundImagesFor,
    imagesPage,
    noImagesFoundMsg,
  } = state[EDITOR_META_KEY]

  const hasBackgroundImg = validString(alt)

  // randomUrl =  'https://api.unsplash.com/photos/random?client_id=' + accessToken + '&count=20'
  const searchUrl = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_ID}&per_page=${SEARCH_IMAGES_PER_PAGE}&query=`
  const url = `https://api.unsplash.com/photos?client_id=${UNSPLASH_CLIENT_ID}&page=${imagesPage}&per_page=${IMAGES_PER_PAGE}`

  const onSearch = (e) => {
    let query = e.target.value
    let url = searchUrl + query.replace(' ', '+')
    if (!validString(query)) clearSearches()
    if (hasBackgroundImg) {
      // url,for,query
      dispatch(searchImages({ url, for: alt, query }))
    } else {
      dispatch(searchImages({ url, for: alt, query }))
    }
  }

  const clearSearches = () => {
    hasBackgroundImg
      ? dispatch(
        clearSearch({ searchingImagesFor: '', searchedBackgroundImages: [] })
      )
      : dispatch(clearSearch({ searchingImagesFor: '', searchedImages: [] }))
    return
  }

  const loadMore = () => {
    if (loadingImages) return
    dispatch(fetchImages(url))
  }

  useEffect(() => {
    images.length === 0 && dispatch(fetchImages(url))
  }, [])

  return (
    <div className='hidescroll' style={styles.root}>
      <Input
        size='large'
        placeholder='Search Images'
        prefix={<SearchOutlined style={styles.inputLogo} />}
        style={styles.input}
        onChange={onSearch}
        value={
          hasBackgroundImg ? searchingBackgroundImagesFor : searchingImagesFor
        }
      />
      <Row style={styles.row}>
        <InfiniteScroller
          loadMore={loadMore}
          hasMore={
            hasBackgroundImg
              ? !loadingImages &&
              !validString(searchingBackgroundImagesFor) &&
              !validString(noImagesFoundMsg)
              : !loadingImages &&
              !validString(searchingImagesFor) &&
              !validString(noImagesFoundMsg)
          }
          loading={null}
          style={styles.infiniteScrollStyles}
        >
          <MasonaryImages
            alt={alt}
            images={
              hasBackgroundImg && validString(searchingBackgroundImagesFor)
                ? searchedBackgroundImages
                : validString(searchingImagesFor)
                  ? searchedImages
                  : images
            }
            stories={stories}
            loadingIcon={loadingImages ? <Loading /> : ''}
            noFoundMsg={noImagesFoundMsg}
          />
        </InfiniteScroller>
      </Row>
    </div>
  )
}

export default Images
