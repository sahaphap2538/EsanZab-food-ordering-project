import React, { useState } from 'react';
import { Row, Col, Divider, Form, Button, Input, notification, } from 'antd'
import axios from '../../config/axios'

function MenuEdit(props) {
    const { editID, fetchFoodList, foodName, foodPrice, foodCategory, foodStatus, setFoodName, setFoodPrice, setFoodCategory, setFoodStatus } = props


    const [file, setFile] = useState(null)

    const onChangeImageFile = (e) => {
        setFile(e.target.files[0])
    }

    const onChangFoodName = (e) => {
        setFoodName(e.target.value)
    }

    const onChangeFoodPrice = (e) => {
        setFoodPrice(e.target.value)
    }

    const onChangeFoodCategory = (e) => {

        setFoodCategory(e.target.value)
    }

    const onChangeFoodStatus = (e) => {
        setFoodStatus(e.target.value)
    }

    const onFinishEditMenu = async (values) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', foodName)
        formData.append('price', foodPrice)
        formData.append('category', foodCategory)
        formData.append('status', foodStatus)

        await axios.put(`/manage_menu/${editID}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                notification.success({
                    message: 'แก้ไขรายการอาหารสำเร็จ'
                })
                console.log(res.data)
                fetchFoodList()
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
                    onFinish={onFinishEditMenu}
                >
                    <div>ภาพอาหาร</div>
                    <Input
                        className='itemIn'
                        type='file'
                        onChange={onChangeImageFile}
                        style={{ border: 'none' }}
                    />
                    <div >ชื่ออาหาร</div>
                    <Input
                        value={foodName}
                        onChange={onChangFoodName}
                        className='itemIn'
                    />
                    <div>ราคา</div>
                    <Input
                        value={foodPrice}
                        onChange={onChangeFoodPrice}
                        className='itemIn'
                    />
                    <div>หมวดหมู่</div>
                    <select
                        value={foodCategory}
                        className='ant-input itemIn'
                        style={{width:'100%'}}
                        onChange={onChangeFoodCategory}
                    >
                        <option value='เมนูแนะนำ'>เมนูแนะนำ</option>
                        <option value='อาหารคาว'>อาหารคาว</option>
                        <option value='ของหวาน'>ของหวาน</option>
                        <option value='เครื่องดื่ม'>เครื่องดื่ม</option>
                    </select>
                    <div>สถานะ</div>
                    <select
                        value={foodStatus}
                        className='ant-input itemIn'
                        style={{width:'100%'}}
                        onChange={onChangeFoodStatus}
                    >
                        <option value='มีสินค้า'>มีสินค้า</option>
                        <option value='สินค้าหมด'>สินค้าหมด</option>
                    </select>
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
