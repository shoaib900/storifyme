import React from 'react'
import { Modal } from 'antd'
import { useRedux } from '../../hooks'
import { MODAL_SLICE_NAME } from '../../helper/contants'

const ModalView = ({
  title,
  subText,
  imageSrc,
  onClose,
  okText,
  cancelText,
  centered,
  onDlete,
  okButtonProps,
  cancelButtonProps,
}) => {
  const [dispatch, , getState] = useRedux()
  const { open, body } = getState(MODAL_SLICE_NAME)

  const handleOk = () => {
    onDlete()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      title={title}
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      centered={centered}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
    >
      {imageSrc && <img src={imageSrc} />}
      {subText && <p style={{ marginTop: '1.5rem' }}>{subText}</p>}
      {body}
    </Modal>
  )
}

ModalView.defaultProps = {
  title: 'Confirmation',
  subText: '',
  imageSrc: null,
  open: true,
  onClose: () => { },
  okText: 'Close',
  cancelText: 'Back',
  centered: true,
  onDlete: () => { },
  okButtonProps: {},
  cancelButtonProps: {},
}

export default ModalView
