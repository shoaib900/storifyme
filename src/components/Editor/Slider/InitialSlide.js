import React from 'react'
import { Card, Row, Col, Avatar } from 'antd'
import { FaRedo, Falink, FaEnvelope } from '../../FontAwesome'

const InitialSlide = () => {
  return (
    <Card
      hoverable
      style={{
        width: '265px',
        height: '465px',
        borderRadius: '2px',
        background: '#000000',
        overflow: 'hidden',
        position: 'relative',
      }}
      className='in-active'
    >
      <div
        style={{
          color: 'white',
          background: '#202125',
          // marginTop: '50px',
          // paddingLeft: '25px',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        <Row style={{ marginTop: '10px' }}>
          <Col span={6}>ABC</Col>
          <Col offset={12} span={6}>
            <Avatar
              shape='square'
              size='small'
              style={{ background: '#2E2E30' }}
              icon={<FaRedo />}
            />
          </Col>
        </Row>
        <div style={{ color: 'white', fontSize: '9px' }}>storifyme.com</div>
        <Row style={{ marginTop: '30px', fontSize: '13px' }}>
          <Col span={6}>
            <Avatar
              shape='square'
              size='medium'
              style={{ marginLeft: 9, background: '#2E2E30' }}
              icon={<Falink />}
            />
            Get Link
          </Col>
          <Col offset={3} span={6}>
            <Col span={6}>
              <Avatar
                shape='square'
                size='medium'
                style={{ background: '#2E2E30' }}
                icon={<FaEnvelope />}
              />
              Email
            </Col>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default InitialSlide
