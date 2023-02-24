import React, { useEffect } from 'react'
import { Row, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { EDITOR_META_KEY } from '../../../../helper/contants'
import { GIFS_API_KEY } from '../../../../config'
import { useRedux } from '../../../../hooks'
import {
  fetchGiphys,
  searchGiphys,
} from '../../../../redux/thunks/fetchEditorMeta'
import { validString } from '../../../../helper/meta'
import MansoryGiphys from './MansoryGiphys'
import { clearSearch } from '../../../../redux/slices/editorMetaSlice'
import { InfiniteScroller } from '../../'
import { Loading } from '../../../Icons'
import { styles } from './styles'

const Giphy = () => {
  let [dispatch, getState] = useRedux()
  let giphysState = getState(EDITOR_META_KEY)
  const giphysPerPage = 20
  const {
    loadingGiphys,
    giphys,
    searchGiphysFor,
    searchedGiphys,
    noGiphysFoundMsg,
  } = giphysState

  //   const giphyTrendingUrl = `http://api.giphy.com/v1/gifs/trending?api_key=${GIFS_API_KEY}`
  //   const giphySearchUrl = `http://api.giphy.com/v1/gifs/search?api_key=${GIFS_API_KEY}`

  const url = (query = '', offset = 0) => {
    let apiEndpoint = validString(query) ? 'search' : 'trending'
    return `https://api.giphy.com/v1/gifs/${apiEndpoint}?api_key=${GIFS_API_KEY}&limit=${giphysPerPage}&rating=g&offset=${offset}&q=${query}`
  }

  useEffect(async () => {
    giphys.length === 0 && dispatch(fetchGiphys(url()))
  }, [])

  const findSticers = (e) => {
    let query = e.target.value
    validString(query)
      ? dispatch(searchGiphys({ url: url(query), query }))
      : dispatch(clearSearch({ searchGiphysFor: '', searchedGiphys: [] }))
  }

  const loadMore = (page) => {
    let offsets = page * giphysPerPage
    console.log(offsets)
    if (loadingGiphys) return
    dispatch(fetchGiphys(url('', offsets)))
  }

  return (
    <div className='hidescroll' style={styles.root}>
      <Input
        size='large'
        placeholder='Search Images'
        prefix={<SearchOutlined style={styles.inputLogo} />}
        style={styles.input}
        onChange={findSticers}
        value={searchGiphysFor}
      />
      <Row style={styles.row}>
        <InfiniteScroller
          loadMore={loadMore}
          hasMore={
            !loadingGiphys &&
            !validString(searchGiphysFor) &&
            !validString(noGiphysFoundMsg)
          }
          loader={null}
          style={styles.infiniteScrollStyles}
        >
          <MansoryGiphys
            giphys={validString(searchGiphysFor) ? searchedGiphys : giphys}
            loadingIcon={loadingGiphys ? <Loading /> : ''}
            notFoundMsg={noGiphysFoundMsg}
          />
        </InfiniteScroller>
      </Row>
    </div>
  )
}

export default Giphy
