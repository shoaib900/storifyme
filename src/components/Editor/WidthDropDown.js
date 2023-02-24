import React from 'react'
import { Button, Dropdown, Space, Menu } from 'antd'
import { FaChevronUp } from '../FontAwesome'

import { Select } from 'antd';
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected is ${value}`);
};

const WidthDropDown = () => {
  
  return (
    <>

      {/* <Space wrap>
        <Dropdown placement='topCenter'> */}
          {/* <Button type='default' className='btn'>
          <FaChevronUp />
        </Button> */}
          <Select
            defaultValue="101%" style={{ width: 100,marginLeft:14 }} onChange={handleChange()} >
            <Option value="101%" >Fit</Option>
            <Option value="25%">25% &nbsp;</Option>
            <Option value="50%">50%</Option>
            <Option value="75%">75%</Option>
            <Option value="100%">100%</Option>
            <Option value="125%">125%</Option>
            <Option value="150%">150%</Option>
            <Option value="175%">175%</Option>
            <Option value="200%">200%</Option>
          </Select>


        {/* </Dropdown>
      </Space> */}
    </>
  )
}

export default WidthDropDown
