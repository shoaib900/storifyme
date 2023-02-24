import React, { useState, useEffect, useRef } from 'react'
import { Layout, Select } from 'antd'
import BasicButton from '../../../form_control/BasicButton'
import { isUrl, validValue } from '../../../../helper/meta'
import { changeLayerElementChildStyle, changeRectAlignments } from '../../../../redux/slices/storiesSlice'
import { DeleteFilled } from '@ant-design/icons'
import { Animation } from '../Animation'
import Styles from './styles'
import { useRedux } from '../../../../hooks'
import { STORIES_KEY } from '../../../../helper/contants'
const { Header } = Layout

const LayerDesignNav = ({ openAnimationPanel }) => {
  let [dispatch, , getState] = useRedux()
  let { active_storyId, data } = getState(STORIES_KEY)
  let { storyLayers, activeLayer } = data[active_storyId]

  let [optionVisiblity, setOptionVisiblity] = useState(false)

  useEffect(() => {
    if (storyLayers.length - 1 >= 0 && storyLayers[activeLayer]) {
      let { elements, activeElementIndex } = storyLayers[activeLayer]
      setOptionVisiblity(false)
      elements.forEach(({ isActive }) => {
        // console.log(isActive)
        isActive && setOptionVisiblity(isActive)
      })
    } else setOptionVisiblity(false)
  }, [storyLayers])

  const [isTrue, setIstrue] = useState(false)
  const [input, setInput] = useState('')
  const [invalidurl, setInvalidurl] = useState()

  let urlRef = useRef()
  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (!urlRef.current?.contains(event.target)) {
        setIstrue(false)
      }
    })
  }, [])

  const { Option } = Select

  const applyStyle = (style) => {
    // dispatch(changeLayerElementChildStyle(style))
    let newAligns = {
      height: 100,
      left: 100,
      position: "absolute",
      rotateAngle: 0,
      top: 0,
      width: 100, ...style
    }
    dispatch(changeRectAlignments({ newAligns, index: 0 }))
  }
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header className='headerTwo'>
        {optionVisiblity && (
          <div className='icon-container'>
            <Styles tag='h1' />
            <BasicButton
              className='animateBtn'
              type='default'
              withTooltip
              tooltipProps={{
                tooltipTitle: 'Animate',
              }}
              onClick={() => openAnimationPanel({ component: <Animation /> })}
            >
              Animate
            </BasicButton>
            <span className='deleteIcon'>
              <DeleteFilled />
            </span>
            {/*<span onClick={() => { }} style={{ margin: '3px 10px 0 0' }}>
              <Select
                showSearch
                style={{ width: 100 }}
                placeholder='Arial'
                optionFilterProp='children'
                onChange={changeFontStyle}
                defaultValue={'Arial'}
                // onSearch={changeFontStyleSearch}
                filterOption={(input, option) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value='Arial'>Arial</Option>
                <Option value='Roboto'>Roboto</Option>
                <Option value='Serif'>Serif</Option>
                <Option value='Sans-serif'>Sans-serif</Option>
                <Option value='Fantasy'>Fantasy </Option>
              </Select>
            </span>
            <span
              onClick={() => {
                console.log(sizeDecreament)
                if (count > 0) {
                  setCount(count - 1)
                } else {
                  alert("You can't less more than 0")
                }
              }}
            >
              <MinusOutlined className='minusIcon' />
            </span>
            <span className='inputCount'>{count}</span>
            <span
              onClick={() => {
                console.log(sizeIncreament)
                if (count <= 9) {
                  setCount(count + 1)
                } else {
                  alert("You can't add more than 10")
                }
              }}
            >
              <PlusOutlined className='plusIcon' />
            </span>
            <span
              onClick={() => {
                console.log(fontColor)
              }}
              className='alignment-icon'
            >
              <FontColorsOutlined />
            </span>
            <span
              onClick={() => {
                console.log(backgroundColor)
              }}
              className='alignment-icon'
            >
              <BgColorsOutlined />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                console.log(fontWeight)
                dispatch(changeLayerElementChildStyle({ fontWeight }))
              }}
              className='alignment-icon'
            >
              <BoldOutlined />
            </span>
            <span
              onClick={() => {
                console.log(fontStyleItaic)
              }}
              className='alignment-icon'
            >
              <ItalicOutlined />
            </span>
            <span
              onClick={() => {
                console.log(fontSize)
              }}
              className='alignment-icon'
            >
              <img
                height='15'
                src='https://img.icons8.com/small/96/000000/sentence-case.png'
              />
            </span>
            <span
              onClick={() => {
                console.log(fontWeightLighter)
              }}
              style={{ marginTop: '3px' }}
            >
              <Select
                showSearch
                style={{ width: 100 }}
                placeholder='Regular'
                optionFilterProp='children'
                onChange={changeFontWeight}
                defaultValue='Light'
                filterOption={(input, option) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value='Light'>Light</Option>
                <Option value='Bold'>Bold</Option>
                <Option value='Bolder'>Bolder</Option>
                <Option value='Regular'>Regular</Option>
              </Select>
            </span>
            <span
              onClick={() => {
                console.log(textAlignLeft)
              }}
              className='alignment-icon'
            >
              <AlignLeftOutlined />
            </span>
            <span
              onClick={() => {
                console.log(textAlignCenter)
              }}
              className='alignment-icon'
            >
              <AlignCenterOutlined />
            </span>
            <span
              onClick={() => {
                console.log(textAlignRight)
              }}
              className='alignment-icon'
            >
              <AlignRightOutlined />
            </span>
            <span className='alignment-icon' onClick={() => setIstrue(true)}>
              <LinkOutlined />
              {isTrue ? (
                <div ref={urlRef} className='urlModal'>
                  <input
                    type='url'
                    placeholder='Enter url'
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value)
                    }}
                  />
                  <BasicButton
                    onClick={() => {
                      isUrl(input)
                        ? setInvalidurl('Correct Url')
                        : setInvalidurl('Invalid Url')
                    }}
                    size='sm'
                    className='btn'
                  >
                    Apply URL
                  </BasicButton>
                  <h3 style={{ textAlign: 'center' }}>{invalidurl}</h3>
                </div>
              ) : null}
            </span>
            <BasicButton
              className='animateBtn'
              type='default'
              withTooltip
              tooltipProps={{
                tooltipTitle: 'Animate',
              }}
              onClick={() => openAnimationPanel({ component: <Animation /> })}
            >
              Animate
            </BasicButton>
            <span className='deleteIcon'>
              <DeleteFilled />
            </span>
            */}
          </div>
        )}
      </Header>
    </div>
  )
}

export { LayerDesignNav }
