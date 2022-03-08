import React from 'react';
import { Menu, Row, Col, Button, Image } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import Home from '../../assets/Home.png'
import MenuIcon from '../../assets/Menu.png'
import BasketOrange from '../../assets/BasketOrange.png'
import UserOrange from '../../assets/UserOrange.png'
import ArrowLeft from '../../assets/ArrowLeft.png'
import FoodDetails from '../../assets/FoodDetails.png'
import localStorageGuestServices from '../../services/localStorageGuestServices'
import localStorageTableNo from '../../services/localStorageTableNo';
import axios from '../../config/axios';

const { setGuestID, getGuestID } = localStorageGuestServices
const { getTableNo} = localStorageTableNo

function SidebarGuest(props) {
    const location = useLocation()
    const navigate = useNavigate()

    const onClickSidebar = async (e) => {
        if (e.key === '/menu') {
            props.onClickShowSidebar()
            if (getGuestID()) {
                navigate('/menu')
            } else {
                await axios.post('/guest/login', {
                    fname: 'Guest',
                    role: 'guest'
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

        } else {
            props.onClickShowSidebar()
            navigate(e.key)
        }
    }

    return (
        <Row className='sidebar'>
            <Col span={24}>
                <Row className='headerSidebar'>
                    <Col span={20}>
                        <div className='titleHeaderSidebar'>
                            EsanZab
                        </div>
                    </Col>
                    <Col span={4}>
                        <Button type='text' className='buttonMain' onClick={props.onClickShowSidebar}>
                            <Image src={ArrowLeft} className='iconSidebar' preview={false} />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Menu
                            defaultSelectedKeys={[location.pathname]}
                            mode='inline'
                            onClick={onClickSidebar}
                        >
                            <Menu.Item
                                key={`/table/${getTableNo()}`}
                                icon={<Image src={Home} className='iconSidebar' preview={false} />}
                            >
                                หน้าแรก
                            </Menu.Item>
                            <Menu.Item
                                key='/menu'
                                icon={<Image src={MenuIcon} className='iconSidebar' preview={false} />}
                            >
                                เมนูอาหาร
                            </Menu.Item>
                            <Menu.Item
                                key='/order'
                                icon={<Image src={BasketOrange} className='iconSidebar' preview={false} />}
                            >
                                ตะกร้าอาหาร
                            </Menu.Item>
                            <Menu.Item
                                key='/order_details'
                                icon={<Image src={FoodDetails} className='iconSidebar' preview={false} />}
                            >
                                ใบเสร็จอาหาร
                            </Menu.Item>
                            <Menu.Item
                                key='/login'
                                icon={<Image src={UserOrange} className='iconSidebar' preview={false} />}
                            >
                                เข้าสู่ระบบ
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}

export default SidebarGuest;
