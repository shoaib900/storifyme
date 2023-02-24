import React, { useCallback, useEffect, useState } from 'react'
import { Row } from 'antd'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Preview from './Preview'
import { styles } from './styles'
import { MasonryItems } from '../../../MasonryItems'
import { InfiniteScroller } from '../../InfiniteScroller'
import {
  fetchVideos,
  searchVideos,
} from '../../../../redux/thunks/fetchEditorMeta'
import { clearSearch } from '../../../../redux/slices/editorMetaSlice'
import { EDITOR_META_KEY, VIDEOS_PER_PAGE } from '../../../../helper/contants'
import { useRedux } from '../../../../hooks'
import { debounce, validString } from '../../../../helper/meta'
import { Loading } from '../../../Icons'

const Videos = () => {
  const [dispatch, , getState] = useRedux()
  let videosState = getState(EDITOR_META_KEY)
  let {
    loadingVideos,
    videos,
    searchVideosFor,
    searchedVideos,
    noVideosFoundMsg,
    videosPage,
  } = videosState

  let [searchFor, setSearchFor] = useState(searchVideosFor)

  const url = (query = 'nature') => {
    return `https://api.pexels.com/videos/search?query=${query}&page=${videosPage}&per_page=${VIDEOS_PER_PAGE}`
  }

  useEffect(async () => {
    videos.length === 0 && dispatch(fetchVideos(url()))
  }, [])

  const onSearch = (e) => {
    let query = e.target.value
    setSearchFor(query)
    handleSearch(query)
  }

  const search = (query) => {
    validString(query)
      ? dispatch(searchVideos({ url: url(query), query }))
      : dispatch(clearSearch({ searchVideosFor: '', searchedVideos: [] }))
  }

  const handleSearch = useCallback(debounce(search), [])

  const loadMore = (page) => {
    let offsets = page * VIDEOS_PER_PAGE
    console.log(offsets)
    if (loadingVideos) return
    dispatch(fetchVideos(url()))
  }

  let renderVideos = validString(searchVideosFor) ? searchedVideos : videos

  return (
    <div className='hidescroll' style={styles.root}>
      <Input
        size='large'
        placeholder='Search Video'
        prefix={<SearchOutlined style={styles.inputLogo} />}
        style={styles.input}
        onChange={onSearch}
        value={searchFor}
      />
      <Row style={styles.row}>
        <InfiniteScroller
          loadMore={loadMore}
          hasMore={
            !loadingVideos &&
            !validString(searchVideosFor) &&
            !validString(noVideosFoundMsg)
          }
          loader={null}
          style={styles.infiniteScrollStyles}
        >
          {renderVideos.length > 0 ? (
            <>
              <MasonryItems>
                {renderVideos.map((video, i) => (
                  <Preview key={i} videoData={video} />
                ))}
              </MasonryItems>
              {!validString(searchVideosFor) && <Loading />}
            </>
          ) : validString(noVideosFoundMsg) ? (
            <div>{noVideosFoundMsg}</div>
          ) : (
                <Loading />
              )}
        </InfiniteScroller>
      </Row>
    </div>
  )
}

export default Videos
