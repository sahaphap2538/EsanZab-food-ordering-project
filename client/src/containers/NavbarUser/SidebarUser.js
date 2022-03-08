import React from 'react';
import { Menu, Row, Col, Button, Image } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '../../assets/Menu.png'
import BasketOrange from '../../assets/BasketOrange.png'
import ArrowLeft from '../../assets/ArrowLeft.png'
import Code from '../../assets/Code.png'
import Reward from '../../assets/Reward.png'
import FoodDetails from '../../assets/FoodDetails.png'
import PowerOrange from '../../assets/PowerOrange.png'
import { useUserContext } from '../../context/UserContext'
import localStorageServices from '../../services/localStorageUserServices';
import localStorageTableNo from '../../services/localStorageTableNo';

const { removeToken } = localStorageServices
const { getTableNo } = localStorageTableNo

function SidebarUser(props) {
    const { userAction } = useUserContext()
    const location = useLocation()
    const navigate = useNavigate()

    const onClickSidebar = (e) => {
        if (e.key === `/table/${getTableNo()}`) {
            userAction.setRole('guest')
            removeToken()
        }
        props.onClickShowSidebar()
        navigate(e.key)
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
                                key='/user_discount'
                                icon={<Image src={Code} className='iconSidebar' preview={false} />}
                            >
                                ส่วนลดของฉัน
                            </Menu.Item>
                            <Menu.Item
                                key='/user_reward'
                                icon={<Image src={Reward} className='iconSidebar' preview={false} />}
                            >
                                แต้มสะสมและรางวัล
                            </Menu.Item>
                            <Menu.Item
                                key={`/table/${getTableNo()}`}
                                icon={<Image src={PowerOrange} className='iconSidebar' preview={false} />}
                            >
                                ออกจากระบบ
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}

export default SidebarUser;





