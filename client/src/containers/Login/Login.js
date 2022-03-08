import React from 'react';
// import facebook from '../../assets/FacebookLogo.png'
// import google from '../../assets/GoogleLogo.png'
import styles from './Login.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { Row, Col, Typography, Form, Input, Button, Image, notification } from 'antd'
import axios from '../../config/axios';
import { useUserContext } from '../../context/UserContext';
import localStorageUserServices from '../../services/localStorageUserServices';
import localStorageGuestServices from '../../services/localStorageGuestServices'

const { setGuestID, getGuestID } = localStorageGuestServices
const { setToken } = localStorageUserServices
const { Text } = Typography
const { Item } = Form
const { Password } = Input

function Login() {
    const { userAction } = useUserContext()
    const navigate = useNavigate()

    // const loginWithFacebook = async () => {
    //     window.open('http://localhost:8000/auth/facebook', '_self')
    // }

    const onClickLoginGuest = async () => {
        if (getGuestID()) {
            navigate('/menu')
        } else {
            await axios.post('/guest/login', {
                fname: 'Guest',
                role: 'guest',
            })
                .then(res => {
                    console.log(res.data)
                    setGuestID(res.data.id)
                    navigate('/menu')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onFinishLogin = async (values) => {
        console.log(values)
        await axios.post('/user/login', {
            username: values.username,
            password: values.password,
            role: 'user'
        })
            .then(res => {
                console.log(res.data)
                setToken(res.data.token)
                userAction.setRole('user')
                navigate('/menu')
                notification.success({
                    message: res.data.message
                })
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
                        คุณยังไม่มีบัญชีใช่ไหม?
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
                {/* <Row className='itemOut'>
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
                </Row> */}
                <Row className='itemOut2' justify='center'>
                    <Col className='text'>หรือ</Col>
                </Row>
                <Row className='itemOut'>
                    <Button type='text' className='buttonMain' onClick={onClickLoginGuest}>
                        สั่งอาหารโดยไม่เข้าสู่ระบบ
                    </Button>
                </Row>
            </Col>
        </Row>
    )
}

export default Login;
