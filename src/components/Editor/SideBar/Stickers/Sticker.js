import React, { useEffect } from 'react'
import { Row, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { EDITOR_META_KEY, STICKERS_PER_PAGE } from '../../../../helper/contants'
import { GIPHY_API_KEY } from '../../../../config'
import { useRedux } from '../../../../hooks'
import {
  fetchStickers,
  searchStickers,
} from '../../../../redux/thunks/fetchEditorMeta'
import { validString } from '../../../../helper/meta'
import MansoryStickers from './MansoryStickers'
import { clearSearch } from '../../../../redux/slices/editorMetaSlice'
import { InfiniteScroller } from '../../'
import { Loading } from '../../../Icons'
import { styles } from './styles'

const Sticker = () => {
  let [dispatch, , getState] = useRedux()
  let stickersState = getState(EDITOR_META_KEY)
  const {
    loadingStickers,
    stickers,
    searchForStickers,
    searchedStickers,
    noStickersFoundMsg,
  } = stickersState

  const url = (query = '', offset = 0) => {
    let apiEndpoint = validString(query) ? 'search' : 'trending'
    return `https://api.giphy.com/v1/stickers/${apiEndpoint}?api_key=${GIPHY_API_KEY}&limit=${STICKERS_PER_PAGE}&rating=g&offset=${offset}&q=${query}`
  }

  useEffect(async () => {
    stickers.length === 0 && dispatch(fetchStickers(url()))
  }, [])

  const findSticers = (e) => {
    let query = e.target.value
    query.replace(' ', '+')
    validString(query)
      ? dispatch(searchStickers({ url: url(query), query }))
      : dispatch(clearSearch({ searchForStickers: '', searchedStickers: [] }))
  }

  const loadMore = (page) => {
    let offsets = page * STICKERS_PER_PAGE
    console.log(offsets)
    if (loadingStickers) return
    dispatch(fetchStickers(url('', offsets)))
  }

  return (
    <div className='hidescroll' style={styles.root}>
      <Input
        size='large'
        placeholder='Search Images'
        prefix={<SearchOutlined style={styles.inputLogo} />}
        style={styles.input}
        onChange={findSticers}
        value={searchForStickers}
      />
      <Row style={styles.row}>
        <InfiniteScroller
          loadMore={loadMore}
          hasMore={!loadingStickers && !validString(searchForStickers)}
          loader={null}
          style={styles.infiniteScrollStyles}
        >
          <MansoryStickers
            stickers={
              validString(searchForStickers) ? searchedStickers : stickers
            }
            loadingIcon={loadingStickers ? <Loading /> : ''}
            notFoundMsg={noStickersFoundMsg}
          />
        </InfiniteScroller>
      </Row>
    </div>
  )
}

export default Sticker
