import InfiniteScroll from 'react-infinite-scroller'
import { emptyFunc } from '../../../helper/meta'
import { Loading } from '../../Icons'

const InfiniteScroller = ({
  children,
  pageStart,
  loadMore,
  hasMore,
  useWindow,
  initialLoad,
  loading,
  style,
}) => {
  return (
    <InfiniteScroll
      pageStart={pageStart}
      loadMore={loadMore}
      hasMore={hasMore}
      useWindow={useWindow}
      initialLoad={initialLoad}
      loader={loading}
      style={style}
    >
      {children}
    </InfiniteScroll>
  )
}

InfiniteScroller.defaultProps = {
  pageStart: 0,
  loadMore: emptyFunc,
  hasMore: false,
  useWindow: false,
  initialLoad: false,
  loading: <Loading />,
  style: {},
}

export { InfiniteScroller }
