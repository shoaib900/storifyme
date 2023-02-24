import React, { useCallback, useState } from 'react'
import { ModalContext } from './'

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null)

  const closeModal = useCallback(() => setModalContent(null))

  return (
    <ModalContext.Provider
      value={{
        setModalContent,
        closeModal,
      }}
    >
      {children} {modalContent && modalContent}
    </ModalContext.Provider>
  )
}

export default ModalProvider
