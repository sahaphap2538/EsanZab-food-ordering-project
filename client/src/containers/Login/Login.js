import React from 'react';
import facebook from '../../assets/FacebookLogo.png'
import google from '../../assets/GoogleLogo.png'
import styles from './Login.module.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Typography, Form, Input, Button, Image, notification } from 'antd'
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import localStorageServices from '../../services/localStorageServices';

const { setToken } = localStorageServices
const { Text } = Typography
const { Item } = Form
const { Password } = Input

function Login() {
    const { userAction } = useUserContext()
    const navigate = useNavigate()

    const loginWithFacebook = async() => {
      window.open('http://localhost:8000/auth/facebook','_self')
    }

    const onFinishLogin = async (values) => {
        console.log(values)
        await axios.post('/user/login', {
            username: values.username,
            password: values.password,
            role: 'user'
        })
            .then(res => {
                console.log(res)
                setToken(res.data.token)
                userAction.setRole('user')
                notification.success({
                    message: 'เข้าสู่ระบบสำเร็จ'
                })
                navigate('/menu')
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
            <Col xs={22} sm={16} md={12}>
                <Row className='itemIn'>
                    <Text className={styles.loginPromotion}>
                        เข้าสู่ระบบเพื่อใช้ส่วนลดและลุ้นรับรางวัลมากมาย
                    </Text>
                </Row>
                <Row>
                    <Text className='title'>
                        เข้าสู่ระบบ
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
                        <Input placeholder='อีเมลหรือเบอร์โทรศัพท์' className='input' />
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
                    <Item>
                        <Button type='text' htmlType='submit' className='buttonMain'>
                            เข้าสู่ระบบ
                        </Button>
                    </Item>
                </Form>
                <Row className='itemOut'>
                    <Text className='text'>
                        คุณยังไม่มีบัญชีใช่หรือไม่?
                        <NavLink
                            to='/register'
                            style={isActive => ({
                                color: isActive ? '#FA4A0C' : "blue",
                                textDecoration: isActive ? 'underline' : "none",
                            })}
                        >
                            สมัครเลย
                        </NavLink>
                    </Text>
                </Row>
                <Row className='itemOut'>
                    <Button type='text' className={styles.facebookButton} onClick={loginWithFacebook}>
                        <Image
                            src={facebook}
                            preview={false}
                        />
                        <div style={{ marginLeft: '10px' }}>เข้าสู่ระบบด้วย &nbsp;Facebook</div>
                    </Button>
                </Row>
                <Row className='itemOut'>
                    <Button type='text' className={styles.googleButton}>
                        <Image
                            src={google}
                            preview={false}
                            style={{ marginTop: '5px' }}
                        />
                        <div style={{ marginLeft: '10px' }}>เข้าสู่ระบบด้วย &nbsp;Google</div>
                    </Button>
                </Row>
                <Row className='itemOut' justify='center'>
                    <Col className='text'>หรือ</Col>
                </Row>
                <Row className='itemOut'>
                    <Link to='/menu' style={{ width: '100%' }}>
                        <Button type='text' className='buttonMain'>
                            สั่งอาหารโดยไม่เข้าสู่ระบบ
                        </Button>
                    </Link>
                </Row>
            </Col>
        </Row>
    )
}

export default Login;