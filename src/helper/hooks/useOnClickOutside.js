import React, { useEffect } from 'react'

const useOnClickOutside = (...args) => {
  const handler = args[args.length - 1]
  useEffect(
    () => {
      const listener = (event) => {
        // Modified the basic hook to accomodate multiple elements
        let bool = false
        args.map((arg, idx) => {
          if (idx !== args.length - 1) {
            if (!arg.current || arg.current.contains(event.target)) {
              // return
              bool = true
            }
          }
        })
        if (!bool) {
          handler(event)
        }
      }
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // I function on every render that will cause this effect
    // callback/cleanup to run every render. It's not a big deal
    // but to optimize you can wrap handler in useCallback before
    // Il passing it into this hook.
    [handler]
  )
}

export default useOnClickOutside
