import React from 'react'
import { Form, Input } from 'antd'

const errorStyle = {
  position: 'absolute',
  color: '#ff0000',
}

const ModalForm = ({ setStoryName, setTags, error, onSubmit }) => {
  return (
    <Form layout='vertical' style={{ textAlign: 'initial' }}>
      <Form.Item label='Name:'>
        <Input
          placeholder='Type in your story name'
          autoFocus
          spellCheck
          onChange={(e) => setStoryName(e.target.value)}
          onKeyUp={(e) => (e.key === 'Enter' ? onSubmit() : '')}
          style={error?.trim() ? { border: '1px solid #ff0000' } : {}}
        />
        {error?.trim() && <div style={errorStyle}>{error}</div>}
      </Form.Item>
      <Form.Item
        label='Add tags:'
        extra='Press enter, tab or comma to separate items.'
      >
        <Input
          spellCheck
          placeholder='Search for tag(s)'
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Item>
    </Form>
  )
}

export default ModalForm
