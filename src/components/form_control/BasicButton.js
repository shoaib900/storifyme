import { Button, Tooltip } from 'antd'
import BasicTooltip from './BasicTooltip'

const BasicButton = ({
  children,
  type,
  icon,
  loading,
  onClick,
  size,
  disabled,
  block,
  transparent,
  href,
  withTooltip,
  tooltipProps,
  className,
  style,
}) => {
  const sz = {
    sm: 'small',
    lg: 'large',
    def: 'default',
  }
  const btnSize = sz[size]

  const link = type === 'link' ? { href } : {}

  const Wrapper = ({ children }) =>
    withTooltip ? (
      <BasicTooltip {...tooltipProps}>{children}</BasicTooltip>
    ) : (
      <>{children}</>
    )
  return (
    <Wrapper>
      <Button
        type={type}
        icon={icon}
        loading={loading}
        onClick={onClick}
        size={btnSize}
        disabled={disabled}
        block={block}
        ghost={transparent}
        {...link}
        className={className}
        style={style}
      >
        {children}
      </Button>
    </Wrapper>
  )
}

BasicButton.defaultProps = {
  type: 'primary',
  icon: null,
  loading: false,
  onClick: () => {},
  size: 'def',
  disabled: false,
  block: false,
  transparent: false,
  href: '',
  withTooltip: false,
  className: '',
  style: {},
}

export default BasicButton
