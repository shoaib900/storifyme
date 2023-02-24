import React from 'react'
import { Row, Col, Tooltip } from 'antd'
import { FaTrash } from '../../FontAwesome'
import BasicButton from '../../form_control/BasicButton'

const LayerFooter = ({ onClick }) => {
  return (
    <Row justify='space-between' style={{ paddingTop: '12px' }}>
      <Col span={8}>
        <Tooltip placement='top' title={'Delete Slide'}>
          <BasicButton
            icon={<FaTrash style={{ marginRight: '10px' }} />}
            size='sm'
            type='text'
            withTooltip
            tooltipProps={{ tooltipTitle: 'Delete' }}
            style={{ padding: '0' }}
            onClick={onClick}
          >
            Delete
          </BasicButton>
        </Tooltip>
      </Col>
    </Row>
  )
}

export default LayerFooter
