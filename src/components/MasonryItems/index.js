import Masonry from 'react-responsive-masonry'

const MasonryItems = ({ children, columnsCount, gutter, style, ...rest }) => {
  console.log(rest)
  return (
    <Masonry
      columnsCount={columnsCount}
      gutter={gutter}
      style={style}
      {...rest}
    >
      {children}
    </Masonry>
  )
}

MasonryItems.defaultProps = {
  columnsCount: 2,
  gutter: '10px',
  style: {},
}

export { MasonryItems }
