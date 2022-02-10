import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'
import axios from '../../config/axios';
import { Row, Col, Form, Input, Button, Typography, Radio, Select, notification } from "antd"

const { Text } = Typography
const { Item } = Form
const { Password } = Input
const { Group } = Radio
const { Option } = Select

const dayChild = [];
for (let i = 1; i <= 31; i++) {
    if (i < 10) {
        dayChild.push(<Option key={'0' + i}>0{i}</Option>);
    } else {
        dayChild.push(<Option key={i}>{i}</Option>);
    }
}
const monthChild = [];
for (let i = 1; i <= 12; i++) {
    if (i < 10) {
        monthChild.push(<Option key={'0' + i}>0{i}</Option>);
    } else {
        monthChild.push(<Option key={i}>{i}</Option>);
    }
}
//ปี พ.ศ.
const currentYear = new Date().getFullYear() + 543
const yearChild = [];
//คิดอายุปัจจุบันถึงสูงสุดเป็น 130 ปี
for (let i = currentYear; i >= currentYear - 120; i--) {
    yearChild.push(<Option key={i}>{i}</Option>);
}

function Register() {
    const [gender, setGender] = useState("")
    const [genderOther, setGenderOther] = useState('')
    const navigate = useNavigate()

    const onChangeGender = (e) => {
        const newGender = e.target.value
        setGender(newGender)
    }
    const onChangeGenderOther = (e) => {
        const newOther = e.target.value
        setGenderOther(newOther)
    }

    const onFinishRegister = async (values) => {
        const { day, month, year, gender } = values
        if (gender === "อื่นๆ") {
            values.gender = genderOther
        }
        values.birthday = `${day}/${month}/${year}`
        console.log(values)
        await axios.post('/user/register', {
            username: values.username,
            password: values.password,
            fname: values.fname,
            lname: values.lname,
            gender: values.gender,
            birthday: values.birthday,
            points: 0,
            role: 'user'
        })
            .then(res => {
                console.log(res)
                notification.success({
                    message: res.data.message
                })
                navigate('/login')
            })
            .catch(err => {
                notification.error({
                    message: 'มีชื่อผู้ใช้งานนี้แล้วให้เปลี่ยนอีเมลหรือเบอร์โทรศัพท์'
                })
            })
    }

    return (
        <Row justify='center'>
            <Col xs={22} sm={16} md={12}>
                <Row className='itemOut'>
                    <Text className='title'>
                        สมัครสมาชิก
                    </Text>
                </Row>
                <Form
                    onFinish={onFinishRegister}
                >
                    <Row gutter={8} >
                        <Col span={12}>
                            <Item
                                className={styles.subItem}
                                name="fname"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อ"
                                    }
                                ]}
                            >
                                <Input placeholder='ชื่อ' className='input' />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item
                                className={styles.subItem}
                                name="lname"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกนามสกุล"
                                    }
                                ]}
                            >
                                <Input placeholder='นามสกุล' className='input' />
                            </Item>
                        </Col>
                    </Row>
                    <Item
                        className='itemIn'
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "กรุณากรอกอีเมลหรือเบอร์โทรศัพท์ของคุณ"
                            },
                        ]}
                    >
                        <Input placeholder='อีเมลหรือเบอร์โทรศัพท์' className={'input'} />
                    </Item>
                    <Item
                        className='itemIn'
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "กรุณากรอกรหัสผ่านของคุณ"
                            },
                            {
                                min: 8,
                                message: "รหัสผ่านต้องมีความยาว 8 ตัวอักษรขึ้นไป"
                            },
                        ]}
                    >
                        <Password placeholder='รหัสผ่าน' className='input' />
                    </Item>
                    <Item
                        className='itemIn'
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "กรุณายืนยันรหัสผ่านของคุณ"
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error("ยืนยันรหัสผ่านไม่ตรงกัน"))
                                }
                            })
                        ]}
                    >
                        <Password placeholder='ยืนยันรหัสผ่าน' className='input' />
                    </Item>

                    <Item
                        className='itemIn'
                        name="birthday"
                    >
                        <Row>
                            <Text>
                                วันเกิด
                            </Text>
                        </Row>
                        <Row gutter={8}>
                            <Col span={8}>
                                <Item
                                    className={styles.subItem}
                                    name="day"
                                >
                                    <Select placeholder='วัน' allowClear >
                                        {dayChild}
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item
                                    className={styles.subItem}
                                    name="month"
                                >
                                    <Select placeholder='เดือน' allowClear >
                                        {monthChild}
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item
                                    className={styles.subItem}
                                    name="year"
                                >
                                    <Select placeholder='ปี' allowClear >
                                        {yearChild}
                                    </Select>
                                </Item>
                            </Col>
                        </Row>
                    </Item>
                    <Item
                        className='itemIn'
                        name="gender"
                    >
                        <Group value={gender} onChange={onChangeGender}>
                            <Row gutter={[8]}>
                                <Col span={6}><Radio value="หญิง">หญิง</Radio></Col>
                                <Col span={6}><Radio value="ชาย">ชาย</Radio></Col>
                                <Col span={12}>
                                    <Radio value="อื่นๆ">
                                        <Row gutter={[8]}>
                                            <Col span={8}>อื่นๆ</Col>
                                            <Col span={16}>{gender === 'อื่นๆ' ? <Input value={genderOther} onChange={onChangeGenderOther} /> : null}</Col>
                                        </Row>
                                    </Radio>
                                </Col>
                            </Row>
                        </Group>
                    </Item>
                    <Item>
                        <Button htmlType='submit' className='buttonMain'>
                            ลงทะเบียน
                        </Button>
                    </Item>
                </Form>
            </Col>
        </Row>
    )
}

export default Register;
