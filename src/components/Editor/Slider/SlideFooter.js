import React from 'react'
import { Row, Col, Tooltip } from 'antd'
import { FaTrash } from '../../FontAwesome'
import { Link } from 'react-router-dom'
import BasicButton from '../../form_control/BasicButton'

const SlideFooter = ({ onClick }) => {
  return (
    <Row justify='space-between' style={{ paddingTop: '12px' }}>
      <Col span={8}>
        <Tooltip placement='top' title={'Delete Slide'}>
          {/* <Link
            style={{ padding: '0' }}
            onClick={onClick}
            className='btn-delete-slide'
            to=''
          >
            <FaTrash /> Delete
          </Link> */}
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

export default SlideFooter
