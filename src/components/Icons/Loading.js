import { LoadingOutlined } from '@ant-design/icons'

const Loading = ({ style, className }) => {
  return <LoadingOutlined className={className} style={style} spin />
}

Loading.defaultProps = {
  style: { fontSize: 20, color: 'white' },
  className: '',
}

export { Loading }
