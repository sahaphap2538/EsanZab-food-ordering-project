import React from 'react';
import styles from './AdminLogin.module.css'
import localStorageUserServices from '../../services/localStorageUserServices';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Form, Input, notification, Button } from 'antd'
import axios from '../../config/axios'

const { setToken } = localStorageUserServices
const { Text } = Typography
const { Item } = Form
const { Password } = Input

function AdminLogin() {

    const { userAction } = useUserContext()
    const navigate = useNavigate()

    const onFinishLogin = async (values) => {
        console.log(values)
        await axios.post('/user/login', {
            username: values.username,
            password: values.password,
            role: 'admin'
        })
            .then(res => {
                console.log(res)
                setToken(res.data.token)
                userAction.setRole('admin')
                navigate('/admin_ordering')
            })
            .catch(err => {
                console.error(err)
                notification.error({
                    message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้องโปรดลองอีกครั้ง'
                })
            })
    }

    return (
        <Row justify='center'>
            <Col span={8}>
                <Row className={styles.adminLoginBox}>
                    <Col span={22} className={styles.colInLoginBox}>
                        <Row >
                            <Text className={styles.titleLogin}>
                                EsanZab
                            </Text>
                        </Row>
                        <Row className='itemOut'>
                            <Text className='title'>
                                เข้าสู่ระบบ&nbsp;Admin
                            </Text>
                        </Row>
                        <Form
                            name='login'
                            onFinish={onFinishLogin}
                        >
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
                                <Input placeholder='Admin' className='input' />
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
                            <Item className='itemOut'>
                                <Button htmlType='submit' className='buttonMain'>
                                    เข้าสู่ระบบ
                                </Button>
                            </Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>)
}

export default AdminLogin;
