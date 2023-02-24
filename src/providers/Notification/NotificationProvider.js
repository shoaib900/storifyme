import React, { useCallback } from 'react'
import { notification } from 'antd'
import { NotificationContext } from './'

const NotificationProvider = ({ children }) => {
  //type = success | info | warning | error
  //placement = topRight | topLeft | bottomRight | bottomLeft
  //duration = If not specified, default value is 4.5 seconds. If you set the value to 0, the notification box will never close automatically.
  const openNotification = useCallback(
    ({
      title = 'Notifiction',
      desc = '',
      type = 'open',
      placement = 'topRight',
      duration = 3,
      icon = null,
      className,
      style,
    }) => {
      let iconProps = icon ? { icon: icon } : {}
      let args = {
        message: title,
        description: desc,
        placement,
        duration,
        className,
        ...iconProps,
        style,
      }
      notification[type](args)
    }
  )

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
