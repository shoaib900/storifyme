import {
  DEFAULT_RECT_STYLE,
  HEADERS_TAGS,
  MULTI_MEDIA_TAGS,
  TAGS_STYLES,
  TEXTS_TAGS,
} from './contants'

/**
 * Checks if a valid URL;
 * @param val: string/url != (undefined or null)
 */
export const isUrl = (url) => {
  try {
    return Boolean(new URL(url))
  } catch (e) {
    return false
  }
}

/**
 * @returns unique id
 */
export const generateId = () => {
  let head = Date.now().toString(36)
  let tail = Math.random().toString(36).substr(2)
  let id = `${head}${tail}`.match(/.{1,6}/g).join('-')
  return id
}

/**
 * Checks color is gradient or not
 * @param val: color
 * @returns true/false
 */
export const isGradientColor = (color) =>
  validString(color) && color.includes('-gradient')

/**
 * @param val: object contains color || url != (undefined or null)
 * @returns if url background --> image with styles,
 *          else if color contains '-gradient' --> backgroundImage as gardient color
 *          else --> backgroundColor
 */

export const getBackgroundStyles = ({ color, url }) => {
  // check if background image url is exist
  if (isUrl(url)) {
    return {
      backgroundImage: `url(${url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }
  }
  // any gradient
  else if (isGradientColor(color)) {
    return {
      backgroundImage: color,
    }
  } else return { backgroundColor: color }
}

/**
 * Checks if a valid string;
 * @param val: number/string/object/array != (undefined or null)
 */
export const validValue = (val) =>
  typeof val !== 'undefined' && val !== undefined && val !== null

/**
 * Checks if a valid string
 * @param str: string
 */
export const validString = (str) => !!str && typeof str === 'string'


/**
 * Checks if a valid number
 * @param num: number
 */
export const validNumber = (...nums) => {
  let isValid = true
  for (let i = 0; i < nums.length; i++) {
    if (!validValue(nums[i]) && typeof nums[i] !== 'number') {
      isValid = false
      break
    }
  }
  return isValid
}

/**
 * Checks if a valid string and validate with min length.
 * @param str: string
 */
export const validStringWithMinLength = (str, length = 1) =>
  validString(str) && str.length >= length

/**
 * Checks if a valid string and validate with max length.
 * @param str: string
 */
export const validStringWithMaxLength = (str, length = 1) =>
  validString(str) && str.length <= length

/**
 * Checks if a valid object
 * @param obj: object
 */
export const isValidObject = (obj) =>
  obj &&
  obj === Object(obj) &&
  Object.prototype.toString.call(obj) !== '[object Array]'

/**
 * Check if valid Array
 * @param arr: array 
 */
export const isValidArray = (arr) => validValue(arr) && Array.isArray(arr) && arr.length >= 1


/**
 * Checks if a valid object with keys
 * @param obj: object
 */
export const isValidObjectWithKeys = (obj) =>
  isValidObject(obj) && !!Object.keys(obj).length

/**
 * @param obj
 * @returns array
 */
export const getKeysFromObject = (obj) => {
  if (isValidObject(obj) && isValidObjectWithKeys(obj)) {
    return Object.keys(obj).map((key) => key)
  }
}

/**
 * @param rgb: string
 * @returns hex
 */
export const RGBToHex = (rgb) => {
  // Choose correct separator
  let sep = rgb.indexOf(',') > -1 ? ',' : ' '
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(')')[0].split(sep)

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16)

  if (r.length === 1) r = '0' + r
  if (g.length === 1) g = '0' + g
  if (b.length === 1) b = '0' + b

  return '#' + r + g + b
}

/**
 * empty function
 */
export const emptyFunc = () => { }

/**
 * @param start: milliseconds
 * @param end: milliseconds
 * @return 00:00:00:0000 difference
 */
export const calculteTimeDiff = (start, end) => {
  const startTime = new Date(start) // your initial time
  const endTime = new Date(end) // your later time

  const diff = endTime - startTime
  const miliSecs = 1000, //1 second = 1000 milliseconds
    min = 60 * miliSecs,
    hrs = 60 * min
  const humanDiff = `${Math.floor(diff / hrs)}:${Math.floor(
    (diff % hrs) / min
  ).toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${Math.floor(
    (diff % min) / miliSecs
  ).toLocaleString('en-US', { minimumIntegerDigits: 2 })}.${Math.floor(
    diff % miliSecs
  ).toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false })}`

  // console.log("humanDiff:", humanDiff)
  return humanDiff
}

/**
 * @param fn = function
 * @default time = 1000 = 1s
 */
export const debounce = (fn, time = 1000) => {
  let timer
  return (...rest) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...rest)
    }, time)
  }
}

/**
 * @param tag: string
 */
export const getResizableStyles = (tag) => {
  let defaultStyles = DEFAULT_RECT_STYLE
  if (MULTI_MEDIA_TAGS.includes(tag)) return defaultStyles
  else if (TEXTS_TAGS.includes(tag) || HEADERS_TAGS.includes(tag)) {
    return { ...defaultStyles, height: 22, width: 160 }
  } else return defaultStyles
}

/**
 * @param tagName: string
 * @returns object of css styles based on tagName
 */
export const getTagStyle = (tagName) => {
  if (!validString(tagName)) return {}
  else if (
    HEADERS_TAGS.includes(tagName) ||
    TEXTS_TAGS.includes(tagName) ||
    MULTI_MEDIA_TAGS.includes(tagName)
  ) {
    return TAGS_STYLES[tagName]
  }
  // else if (TEXTS_TAGS.includes(tagName)) return {}
  // else if (MULTI_MEDIA_TAGS.includes(tagName)) return {}
}

/**
 * @param string
 * @param separater
 * @returns capitalized string and remove separator e.g fade-in => Fade In
 */

export const capitalizeString = (
  str = '',
  separator = ''
  // withSeparator = false //TODO to make efficient
) => {
  if (validString(str)) {
    let capitalizedStr = ''
    str
      .split(separator)
      .forEach(
        (word, i) =>
          (capitalizedStr +=
            word.charAt(0).toLocaleUpperCase() + word.slice(1) + ' ')
      )
    return capitalizedStr.trim()
  } else return str
}

/**
 * @param array: Array
 * @param delIndex: number
 * @param deleteCount: number
 * @param insertAt: number
 * @param element: any type
 */
export const removeItemAndInsertAt = (array, delIndex, deleteCount, insertAt, element) => {
  // console.log(validNumber(delIndex, deleteCount))
  if (isValidArray(array) && validNumber(delIndex, deleteCount)) {
    let tempArr = [...array]
    tempArr.splice(delIndex, deleteCount)
    if (validNumber(insertAt) && validValue(element)) { tempArr[insertAt] = element }
    return tempArr
  } return array
}
