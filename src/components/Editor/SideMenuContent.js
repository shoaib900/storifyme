import React, { useEffect, useRef } from 'react'
import { Layout } from 'antd'
import { Tabs } from 'antd'
import {
  ColorPicker,
  Emojis,
  Images,
  Stickers,
  Text,
  Videos,
  Shapes,
  Giphy,
} from './SideBar'

const { TabPane } = Tabs

const { Sider } = Layout

const SideMenuContent = ({
  sideType,
  onClose,
  open,
  customComponent,
  uploadFiles,
}) => {
  const siderBarRef = useRef()

  useEffect(() => {
    document.addEventListener('click', handleClose, true)
    return () => {
      document.removeEventListener('click', handleClose, true)
    }
  }, [open])

  const handleClose = (e) => {
    if (siderBarRef.current && siderBarRef.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    open && onClose(!open)
  }

  return (
    <Sider
      className={open ? 'siderTwo slideIn' : 'slideOut'}
      ref={siderBarRef}
      style={{ flex: '0 0 270px !important' }}
    >
      {sideType === 'background' && <ColorPicker />}
      {sideType === 'text' && (
        <div>
          <h3 className='header-text'>Click on text to add to story</h3>
          <Text />
        </div>
      )}
      {sideType === 'media' && (
        <div>
          {/* <h3 className='headerBG'>Media</h3> */}
          <Tabs defaultActiveKey='1' type='card' style={{ color: 'white' }}>
            <TabPane
              tab={<span style={{ padding: '4px' }}>Photo</span>}
              key='1'
              style={{ width: '100%' }}
            >
              <Images />
            </TabPane>
            <TabPane
              tab={<span style={{ padding: '4px' }}>Videos</span>}
              key='2'
            >
              <Videos />
            </TabPane>
            <TabPane tab={<span style={{ padding: '4px' }}>GIFs</span>} key='3'>
              <Giphy />
            </TabPane>
          </Tabs>
        </div>
      )}
      {sideType === 'objects' && (
        <div>
          <h3 className='headerBG'>Objects</h3>
          <Tabs defaultActiveKey='1' type='card' style={{ color: 'white' }}>
            <TabPane tab='Shape' key='1' className='hidescroll'>
              <Shapes />
            </TabPane>
            <TabPane tab='Emoji' key='2' className='hidescroll'>
              <Emojis />
            </TabPane>
            <TabPane tab='Stickers' key='3'>
              <Stickers />
            </TabPane>
          </Tabs>
        </div>
      )}
      {sideType === 'custom' && (
        <div>
          <h3 className='headerBG'>{customComponent?.name}</h3>
          {customComponent?.component}
        </div>
      )}
      {sideType === 'upload' && <div>{uploadFiles?.component}</div>}
    </Sider>
  )
}

export default SideMenuContent
