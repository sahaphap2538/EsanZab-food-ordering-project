import React, { useState } from 'react';
import { Row, Col, Divider, Form, Button, Input, Select, notification, } from 'antd'
import axios from '../../config/axios'

const { Option } = Select

function MenuCreate(props) {
  const [file, setFile] = useState(null)

 
  const onChangeImageFile = (e) => {
    setFile(e.target.files[0])
  }

  
  const onFinishCreateMenu = async (values) => {
    //make form_data
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', values.name)
    formData.append('price', values.price)
    formData.append('category', values.category)
    formData.append('status', 'มีสินค้า')
    
   console.log(...formData)
    //post all of data to database(contains image)

    await axios.post("/manage_menu", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }})
      .then(res => {
        notification.success({
          message: 'เพิ่มรายการอาหารสำเร็จ'
        })
        console.log(res.data)
        props.fetchFoodList()
      })
      .catch(err => {
        notification.error({
          message: 'เพิ่มรายการอาหารไม่สำเร็จ กรุณาลองอีกครั้ง'
        })
        console.log(err)
      })
  }

  return (
    <div>
      <Row justify='center'>
        <Col span={22}>
          <div className='itemOut'>
            <div className='title'>เพิ่มรายการอาหาร</div>
          </div>
          <Divider className='itemIn'/>
          <Form
            name='createMenu'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            
            onFinish={onFinishCreateMenu}
          >
            <Form.Item
              label='ภาพอาหาร'
              name='picture'
              className='itemIn'
            >
              <Input type='file' onChange={onChangeImageFile} style={{border:'none'}}/>
            </Form.Item>
            <Form.Item
              label='ชื่ออาหาร'
              name='name'
              className='itemIn'
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่ออาหาร"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='ราคา'
              name='price'
              className='itemIn'
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกราคาอาหาร"
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='หมวดหมู่'
              name='category'
              className='itemIn'
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกหมวดหมู่อาหาร"
                }
              ]}
            >
              <Select>
                <Option value='เมนูแนะนำ'>เมนูแนะนำ</Option>
                <Option value='อาหารคาว'>อาหารคาว</Option>
                <Option value='ของหวาน'>ของหวาน</Option>
                <Option value='เครื่องดื่ม'>เครื่องดื่ม</Option>
              </Select>
            </Form.Item>
            <Form.Item className='itemOut'>
              <Button htmlType='submit' type='text' className='buttonMain'>เพิ่มอาหาร</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default MenuCreate;
