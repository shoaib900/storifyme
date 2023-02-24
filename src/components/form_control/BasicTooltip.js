import { Tooltip } from 'antd'

const BasicTooltip = ({
  children,
  tooltipTitle,
  tooltipPosition,
  arrowPositionIsCenter,
  style,
  className,
}) => {
  return (
    <Tooltip
      title={tooltipTitle}
      placement={tooltipPosition}
      arrowPointAtCenter={arrowPositionIsCenter}
      className={className}
      style={style}
    >
      {children}
    </Tooltip>
  )
}

BasicTooltip.defaultProps = {
  tooltipTitle: '',
  tooltipPosition: 'bottom',
  arrowPositionIsCenter: false,
  className: '',
  style: {},
}

export default BasicTooltip
