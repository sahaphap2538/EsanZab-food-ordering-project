import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Row, Col, Image } from 'antd'
import User from '../../assets/User.png'
import Vector from '../../assets/Vector.png'
import Basket from '../../assets/Basket.png'
import SidebarGuest from './SidebarGuest';
import localStorageTableNo from '../../services/localStorageTableNo';

const { getTableNo } = localStorageTableNo
function NavbarGuest() {
    const [isShowSidebar, setIsShowSidebar] = useState(true)

    const onClickShowSidebar = () => {
        setIsShowSidebar(prev => !prev)
    }

    return (
        <Row>
            <Col span={24}>
                <Row className='navbar'>
                    <Col span={6}>
                        <Button type='text' className='buttonMain' style={{ textAlign: 'start' }} onClick={onClickShowSidebar}>
                            <Image src={Vector} className='iconHeader' preview={false}/>
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Link to={`table/${getTableNo()}`}>
                            <Button type='text' className='buttonMain' style={{ fontSize: '24px' }}>
                                EsanZab
                            </Button>
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Row >
                            <Col span={12}>
                                <Link to='/order'>
                                    <Button type='text' className='buttonMain'>
                                        <Image src={Basket} className='iconHeader' preview={false}/>
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={12}>
                                <Link to='/login'>
                                    <Button type='text' className='buttonMain'>
                                        <Image src={User} className='iconUser' preview={false} />
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            {!isShowSidebar? <SidebarGuest onClickShowSidebar={onClickShowSidebar} isShowSidebar={isShowSidebar}/> : null}
        </Row>
    )
}

export default NavbarGuest;
