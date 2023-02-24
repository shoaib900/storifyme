import { calculteTimeDiff } from '../../helper/meta'

const logColor = {
  actiontitle: 'color:#9E9E9E; font-weight: lighter',
  action: 'color:#03A9F4; font-weight: bold',
  error: 'color:#F20404; font-weight: bold',
  nextState: 'color:#4CAF50; font-weight: bold',
  prevState: 'color:#9E9E9E; font-weight: bold',
  black: 'color:black; font-weight: bold',
  black: 'color:white; font-weight: bold',
}

const logger = (store) => (next) => (action) => {
  let startingTime = Date.now()
  let prevState = store.getState()
  const label = action.type
  try {
    let result = next(action)
    let endingTime = Date.now()
    let time = '%c @ ' + calculteTimeDiff(startingTime, endingTime)
    let nextState = store.getState()
    console.group(
      `%c action %c${label} ${time}`,
      logColor.actiontitle,
      logColor.white,
      logColor.actiontitle
    )
    console.info('%c prev state ', logColor.prevState, prevState)
    console.info('%c action', logColor.action, action)                    // redux
    console.info('%c next state', logColor.nextState, nextState)
    console.groupEnd(label)
    return result
  } catch (e) {
    let endingTime = Date.now()
    let time = '%c @' + calculteTimeDiff(startingTime, endingTime)
    console.group(
      `%c action %c${label} ${time}`,
      logColor.actiontitle,
      logColor.black,
      logColor.actiontitle
    )
    console.info('%c prev state ', logColor.prevState, prevState)
    console.info('%c action', logColor.action, action)
    console.info('%c error', logColor.error, e)
    console.groupEnd(label)
  }
}

export { logger }
