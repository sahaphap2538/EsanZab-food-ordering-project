import React, { useState } from 'react';
import { Row, Col, Divider, Form, Button, Input, Select, notification, } from 'antd'
import axios from '../../config/axios'

const { Option } = Select

function MenuEdit(props) {
    const [file, setFile] = useState(null)

    const onChangeImageFile = (e) => {
        setFile(e.target.files[0])
    }

    const onFinishEditMenu = async (values) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', values.name)
        formData.append('price', values.price)
        formData.append('category', values.category)
        formData.append('status', values.status)

        await axios.put(`/manage_menu/${props.editID}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }})
            .then(res => {
              notification.success({
                message: 'แก้ไขรายการอาหารสำเร็จ'
              })
              console.log(res.data)
              props.fetchFoodList()
            })
            .catch(err => {
              notification.error({
                message: 'แก้ไขรายการอาหารไม่สำเร็จ กรุณาลองอีกครั้ง'
              })
              console.log(err)
            })
    }

    return (
        <Row justify='center'>
            <Col span={22}>
                <div className='itemOut'>
                    <div className='title'>แก้ไขรายการอาหาร</div>
                </div>
                <Divider className='itemIn' />
                <Form
                    name='editMenu'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinishEditMenu}
                >
                    <Form.Item
                        label='ภาพอาหาร'
                        name='picture'
                        className='itemIn'
                    >
                        <Input type='file' onChange={onChangeImageFile} style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item
                        label='ชื่ออาหาร'
                        name='name'
                        className='itemIn'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='ราคา'
                        name='price'
                        className='itemIn'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='หมวดหมู่'
                        name='category'
                        className='itemIn'
                    >
                        <Select>
                            <Option value='เมนูแนะนำ'>เมนูแนะนำ</Option>
                            <Option value='อาหารคาว'>อาหารคาว</Option>
                            <Option value='ของหวาน'>ของหวาน</Option>
                            <Option value='เครื่องดื่ม'>เครื่องดื่ม</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='สถานะ'
                        name='status'
                        className='itemIn'
                    >
                        <Select>
                            <Option value='มีสินค้า'>มีสินค้า</Option>
                            <Option value='สินค้าหมด'>สินค้าหมด</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='itemOut'>
                        <Button
                            htmlType='submit'
                            type='text'
                            className='buttonMain'
                        >
                            แก้ไข
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default MenuEdit;
