import React from 'react'
import { Row, Col } from 'antd'
import { FaAdd, FaStopwatch } from '../../FontAwesome'
import BasicButton from '../../form_control/BasicButton'
import AutoAdvance from './AutoAdvance'

const LayerController = ({ onAdd }) => {
  return (
    <div className='middle-elements'>
      <Row>
        <Col>
          <BasicButton
            withTooltip
            icon={<FaAdd />}
            className='btn-save-m-e'
            tooltipProps={{ tooltipTitle: 'Add New Slide' }}
            onClick={onAdd}
          />
        </Col>
      </Row>
      <AutoAdvance />
      <Row style={{ marginTop: 10, fontSize: '10px' }}>
        <Col>Disable</Col>
      </Row>
    </div>
  )
}

export default LayerController
