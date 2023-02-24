import { useDispatch, useSelector } from 'react-redux'
import { validString, validValue } from '../helper/meta'

const useRedux = () => {
  const dispatch = useDispatch()
  const states = useSelector((states) => states)

  const getState = (name) => {
    if (validString(name) && validValue(states[name])) return (states[name] && states[name].present) ? states[name].present : states[name]
    else return states
  }

  return [dispatch, states, getState]
}

export default useRedux
