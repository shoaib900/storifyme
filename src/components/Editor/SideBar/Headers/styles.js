import { HEADERS_TAGS, MULTI_MEDIA_TAGS, TEXTS_TAGS, FONT_FAMILIES, FONT_WEIGHTS } from "../../../../helper/contants"
import {
  PlusOutlined,
  MinusOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  BoldOutlined,
  ItalicOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'
import { Select } from "antd"
import { changeLayerElementChildStyle, changeRectAlignments } from "../../../../redux/slices/storiesSlice"
import { useRedux } from "../../../../hooks"
import { useCallback, useState } from "react"

const { Option } = Select

export const icons = {
  plusIcon: <PlusOutlined />,
  minusIcon: <MinusOutlined />,
  colorIcon: <FontColorsOutlined />,
  backgroundColorIcon: <BgColorsOutlined />,
  fontWeightIcon: <BoldOutlined />,
  fontStyleIcon: <ItalicOutlined />,
  textAlignLeftIcon: <AlignLeftOutlined />,
  textAlignRightIcon: <AlignRightOutlined />,
  textAlignCenterIcon: <AlignCenterOutlined />,
  textAlignBottomIcon: <VerticalAlignBottomOutlined />,
}

const DropDown = ({ options = [], withDiffVals = false, slected = null, onChange, cssStyle, children }) => {
  return (
    <span style={{ margin: '3px 10px 0 0' }}>
      <Select
        showSearch
        style={{ width: 100 }}
        placeholder={options[0]}
        optionFilterProp='children'
        onChange={(v) => onChange({ [cssStyle]: v })}
        defaultValue={slected || withDiffVals ? options[0].value : options[0]}
        filterOption={(input, option) =>
          option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((o, i) => <Option key={i} value={withDiffVals ? o.value : o}>{withDiffVals ? o.name : o}</Option>)}
        {children}
      </Select>
    </span>)
}

const IconButton = ({ icon = null, value = '', slected = false, onClick, cssStyle, style, children }) => {
  return (
    <span
      onClick={() => onClick({ [cssStyle]: value })}
      className='alignment-icon'
      style={style}
    >
      {icon}
      {children}
    </span>)
}

const FontSize = ({ defaultValue = 16, applyStyles }) => {
  const [fontSize, updateFont] = useState(defaultValue)
  return (
    <>
      <IconButton icon={icons.plusIcon} cssStyle={'fontSize'} value={fontSize} onClick={(s) => fontSize < 24 ? (updateFont(fontSize + 1), applyStyles({ fontSize: `${fontSize + 1}px` })) : alert("You can't apply more than 24 pixels.")} />
      <span className='inputCount'>{fontSize}</span>
      <IconButton icon={icons.minusIcon} cssStyle={'fontSize'} value={fontSize} onClick={() => fontSize > 0 ? (updateFont(fontSize - 1), applyStyles({ fontSize: `${fontSize - 1}px` })) : alert("You can't apply less than 0 pixels")} />
    </>)
}

const Styles = ({ tag, styles }) => {
  let [dispatch] = useRedux()
  let textTags = [...TEXTS_TAGS, ...HEADERS_TAGS]
  let applyStyles = useCallback((style) => {
    if (textTags) dispatch(changeLayerElementChildStyle(style))
    else if (MULTI_MEDIA_TAGS.includes(tag)) dispatch(changeRectAlignments({ ...style, index: 0 }))
  }, [styles])

  if (textTags.includes(tag)) {
    return (<>
      <DropDown options={FONT_FAMILIES} onChange={applyStyles} cssStyle={'fontFamily'} />
      <IconButton icon={icons.colorIcon} cssStyle={'color'} value='red' onClick={applyStyles} />
      <IconButton icon={icons.backgroundColorIcon} cssStyle={'backgroundColor'} value='black' onClick={applyStyles} />
      <IconButton icon={icons.fontWeightIcon} cssStyle={'fontWeight'} value='bold' onClick={applyStyles} />
      <IconButton icon={icons.fontStyleIcon} cssStyle={'fontStyle'} value='italic' onClick={applyStyles} />
      <FontSize applyStyles={applyStyles} />
      <IconButton icon={icons.textAlignLeftIcon} cssStyle={'textAlign'} value='left' onClick={applyStyles} />
      <IconButton icon={icons.textAlignRightIcon} cssStyle={'textAlign'} value='right' onClick={applyStyles} />
      <IconButton icon={icons.textAlignCenterIcon} cssStyle={'textAlign'} value='center' onClick={applyStyles} />
      <DropDown options={FONT_WEIGHTS} withDiffVals onChange={applyStyles} cssStyle={'fontWeight'} />
    </>
    )
  }
  else if (MULTI_MEDIA_TAGS.includes(tag)) {
    return (
      <>
        <IconButton icon={icons.textAlignBottomIcon} style={{ transform: 'rotate(180deg)' }} cssStyle={'top'} value='0px' onClick={applyStyles} />
        <IconButton icon={icons.textAlignRightIcon} cssStyle={'right'} value='0px' onClick={applyStyles} />
        <IconButton icon={icons.textAlignLeftIcon} cssStyle={'left'} value='0px' onClick={applyStyles} />
        <IconButton icon={icons.textAlignBottomIcon} cssStyle={'bottom'} value='0px' onClick={applyStyles} />
      </>)
  }
  return
}

export default Styles
