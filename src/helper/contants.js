import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons'
import { generateId } from './meta'

export const FONT_FAMILIES = ['Arial', 'Roboto', 'Serif', 'Sans-serif', 'Fantasy']
export const FONT_WEIGHTS = [{ name: 'Light', value: 'lighter' }, { name: 'Bold', value: 'bold' }, { name: 'Bolder', value: 'bolder' }, { name: 'Regular', value: '300' }]

export const HEADERS_TAGS = ['h1', 'h2', 'h3', 'h4']
export const TEXTS_TAGS = ['p', 'span']
export const MULTI_MEDIA_TAGS = ['img', 'video']

export const ZOOMABLE_MAP = {
  n: 't',
  s: 'b',
  e: 'r',
  w: 'l',
  ne: 'tr',
  nw: 'tl',
  se: 'br',
  sw: 'bl',
}
export const ItemTypes = {
  HEADER1: 'h1',
  HEADER2: 'h2',
  HEADER3: 'h3',
  HEADER4: 'h4',
  PARAGRAPH: 'p',
  SPAN: 'span',
  IMAGE: 'img',
  VIDEO: 'video',
}

export const ANIMATIONS = [
  'none',
  'drop',
  'fade-in',
  'fly-in-bottom',
  'fly-in-left',
  'fly-in-right',
  'fly-in-top',
  'pulse',
  'rotate-in-left',
  'rotate-in-right',
  'twirl-in',
  'whoosh-in-left',
  'whoosh-in-right',
  'zoom-in',
  'zoom-out',
]

export const DEFAULT_PICKER_COLOR = '#ffffff'

export const DEFAULT_SOLID_COLORS = [
  '#000000',
  '#ffffff',
  '#ff5757',
  '#ff66c4',
  '#cb6ce6',
  '#8c52ff',
  '#5271ff',
  '#38b6ff',
  '#5ce1e6',
  '#7ed957',
  '#c9e265',
  '#ffde59',
  '#ffbd59',
  '#ff914d',
  '#42003c',
  '#000000',
]

export const DEFAULT_GRADIENT_COLORS = [
  'linear-gradient(0deg, hsl(14, 100%, 80%) 0.00%,hsl(345, 100%, 52%) 100.00%)',
  'linear-gradient(270deg, hsl(22, 94%, 74%) 8.00%,hsl(43, 90%, 69%) 92.00%)',
  'linear-gradient(315deg, hsl(128, 62%, 75%) 8.00%,hsl(78, 96%, 73%) 92.00%)',
  'linear-gradient(270deg, hsl(57, 94%, 63%) 0.00%,hsl(139, 87%, 45%) 100.00%)',
  'linear-gradient(315deg, hsl(199, 88%, 87%) 8.00%,hsl(217, 96%, 81%) 92.00%)',
  'linear-gradient(0deg, hsl(193, 100%, 49%) 0.00%,hsl(217, 100%, 46%) 100.00%)',
  'linear-gradient(0deg, hsl(242, 26%, 72%) 0.00%,hsl(240, 26%, 63%) 51.00%,hsl(240, 26%, 63%) 100.00%)',
  'linear-gradient(0deg, hsl(238, 25%, 42%) 0.00%,hsl(234, 25%, 46%) 15.00%,hsl(237, 23%, 51%) 28.00%,hsl(240, 28%, 57%) 43.00%,hsl(240, 31%, 61%) 57.00%,hsl(235, 38%, 65%) 71.00%,hsl(242, 42%, 71%) 82.00%,hsl(241, 46%, 75%) 92.00%,hsl(248, 50%, 79%) 100.00%)',
  'linear-gradient(270deg, hsl(335, 100%, 75%) 0.00%,hsl(350, 100%, 73%) 100.00%)',
  'linear-gradient(90deg, hsl(242, 87%, 71%) 0.00%,hsl(333, 75%, 70%) 100.00%)',
  'linear-gradient(45deg, hsl(247, 49%, 29%) 0.00%,hsla(265, 64%, 63%, 0.22) 100.00%)',
  'radial-gradient(circle at center, hsl(60, 100%, 50%) 0.00%,hsl(160, 100%, 30%) 50.00%,hsl(300, 100%, 25%) 100.00%)',
  'linear-gradient(45deg, hsl(47, 49%, 29%) 0.00%,hsla(65, 64%, 63%, 0.22) 100.00%)',
  'linear-gradient(0deg, hsl(138, 25%, 42%) 0.00%,hsl(134, 25%, 46%) 15.00%,hsl(137, 23%, 51%) 28.00%,hsl(140, 28%, 57%) 43.00%,hsl(140, 31%, 61%) 57.00%,hsl(135, 38%, 65%) 71.00%,hsl(142, 42%, 71%) 82.00%,hsl(141, 46%, 75%) 92.00%,hsl(148, 50%, 79%) 100.00%)',
  'linear-gradient(270deg, hsl(235, 100%, 75%) 0.00%,hsl(250, 100%, 73%) 100.00%)',
]

//for redux slice and state selector
export const EDITOR_META_KEY = 'editorMeta'
export const STORIES_KEY = 'stories'
export const ACTIONS_STACK_KEY = 'actionsStack'
export const MODAL_SLICE_NAME = 'modal'

export const IMAGES_NOT_FOUND = 'No Images Found!'
export const VIDEOS_NOT_FOUND = 'No Videos Found!'
export const GIFS_NOT_FOUND = 'No Gifs Found!'
export const STICKERS_NOT_FOUND = 'No Stickers Found!'
export const GIPHYS_NOT_FOUND = 'No Giphys Found!'

export const IMAGES_PER_PAGE = 20
export const SEARCH_IMAGES_PER_PAGE = 20
export const STICKERS_PER_PAGE = 20
export const VIDEOS_PER_PAGE = 25

export const MIN_STORY_NAME_LENGTH = 3
export const MAX_STORY_NAME_LENGTH = 15
export const REQUIRED_STORY_MSG = 'Please enter story name!'
export const REQUIRED_STORY_MIN_MSG = `Story Name must be at least ${MIN_STORY_NAME_LENGTH} characters!`
export const REQUIRED_STORY_MAX_MSG = `Story Name cannot be longer than ${MAX_STORY_NAME_LENGTH} characters!`
export const VIEW = 'View'
export const VIEW_STORY = 'View Story'

export let ADD_NEW_STORY_LAYER = {
  activeElementIndex: null,
  id: generateId(),
  backgroundColor: '',
  backgroundUrl: '',
  elements: [],
  isActive: true,
}

// export let COPY_STORY_LAYER = Object.assign({}, ADD_NEW_STORY_LAYER)

// export let COPY_STORY_LAYER = {
//   ...ADD_NEW_STORY_LAYER,
//   id: generateId(),
//   isActive: true,
//   isDefault: false
// }

export let DEFAULT_STORY_LAYER = {
  // ...ADD_NEW_STORY_LAYER,
  id: generateId(),
  isActive: false,
  isDefault: true
}


export const CREATE_NEW_STORY = {
  name: '', // Name of story
  tags: '', //meta serach for tag(s)
  activeLayer: 0,
  storyLayers: [ADD_NEW_STORY_LAYER, DEFAULT_STORY_LAYER],
}


export const ZOOM_OPTS = {
  img: 'n, w, s, e, nw, ne, se, sw',
  video: 'n, w, s, e, nw, ne, se, sw',
  h1: 'w, e',
  h2: 'w, e',
  h3: 'w, e',
  h4: 'w, e',
  p: 'w, e',
  span: 'w, e',
}


export const BORDERS = ['top', 'left', 'bottom', 'right']

/**
 * CSS STYLES
 */
export const DEFAULT_RECT_STYLE = {
  width: 100,
  height: 100,
  top: 100,
  left: 0,
  rotateAngle: 0,
  position: 'absolute',
}

export const HEADING_STYLE = {
  color: 'rgb(51, 51, 51)',
  fontFamily: 'Roboto',
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: '1px',
  lineHeight: '1.3em',
  textAlign: 'left',
  textTransform: 'none',
  transform: 'matrix(1, 0, 0, 1, 0, 0)',
}

export const IMAGE_STYLE = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

export const VIDEO_STYLE = {
  ...IMAGE_STYLE,
  objectFit: 'scale-down',
}

export const TAGS_STYLES = {
  h1: { ...HEADING_STYLE, fontSize: '18px' },
  h2: { ...HEADING_STYLE, fontSize: '16px', lineHeight: '1.4em' },
  h3: { ...HEADING_STYLE, fontSize: '15px', lineHeight: '1.6em' },
  h4: HEADING_STYLE,
  p: { ...HEADING_STYLE, fontSize: '14px', lineHeight: '1.5em', margin: 0 },
  span: { ...HEADING_STYLE, fontSize: '14px', lineHeight: '1.5em' },
  img: IMAGE_STYLE,
  video: VIDEO_STYLE,
}
