import React from 'react'
import ReactGPicker from 'react-gcolor-picker'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs } from 'antd'
// import { SlidesContext } from '../../providers/Slides'
import { changeBackground } from '../../../../redux/slices/storiesSlice'
import { Images } from '../'
import { isGradientColor, validString } from '../../../../helper/meta'
import {
  DEFAULT_SOLID_COLORS,
  DEFAULT_GRADIENT_COLORS,
  DEFAULT_PICKER_COLOR,
  STORIES_KEY
} from '../../../../helper/contants'

import { useRedux } from '../../../../hooks'

const ColorPicker = () => {

  let [dispatch, , getState] = useRedux()
  let story = getState(STORIES_KEY)
  // const story = useSelector((state) => state[STORIES_KEY])
  const { active_storyId, data } = story
  let { activeLayer, storyLayers } = data[active_storyId]
  let { backgroundColor: bgColor, backgroundUrl } = storyLayers[activeLayer]
  const isGradient = validString(bgColor) && isGradientColor(bgColor)

  const { TabPane } = Tabs
  // const { changeBackground } = useContext(SlidesContext)

  const changeColor = (color) => {
    if (
      (bgColor !== '' && color === 'rgb(255, 255, 255)') ||
      (color !== '' && backgroundUrl === '') ||
      (color !== 'rgb(255, 255, 255)' && backgroundUrl !== '')
    )
      dispatch(changeBackground({ type: color }))
  }

  return (
    <div>
      {/* <h3 className='headerBG'>Background</h3> */}
      <Tabs defaultActiveKey='1' type='card' style={{ color: 'white' }}>
        <TabPane tab='Color' key='1'>
          <ReactGPicker
            value={!isGradient ? bgColor : DEFAULT_PICKER_COLOR}
            onChange={changeColor}
            colorBoardHeight={220}
            defaultColors={DEFAULT_SOLID_COLORS}
          />
        </TabPane>
        <TabPane tab='Gradient' key='2'>
          <ReactGPicker
            value={isGradient ? bgColor : DEFAULT_PICKER_COLOR}
            gradient={true}
            solid={false}
            onChange={changeColor}
            defaultColors={DEFAULT_GRADIENT_COLORS}
          />
        </TabPane>
        <TabPane tab='Images' key='3'>
          <Images alt='background-image' />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ColorPicker
