import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Row, Col, Image } from 'antd'
import Vector from '../../assets/Vector.png'
import Basket from '../../assets/Basket.png'
import SidebarUser from './SidebarUser';
import localStorageServices from '../../services/localStorageServices';

const { getName } = localStorageServices

function NavbarUser() {
    const username = getName()
    const [isShowSidebar, setIsShowSidebar] = useState(true)

    const onClickShowSidebar = () => {
        setIsShowSidebar(prev => !prev)
    }

    return (
        <Row>
            <Col span={24}>
                <Row className='navbar'>
                    <Col span={12}>
                        <Button type='text' className='buttonMain' style={{ textAlign: 'start' }} onClick={onClickShowSidebar}>
                            <Image src={Vector} className='iconHeader' preview={false}/>
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Row >
                            <Col span={12}>
                                <Link to='/order'>
                                    <Button type='text' className='buttonMain'>
                                        <Image src={Basket} className='iconHeader' preview={false}/>
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={12}>
                                <p className='text' style={{color:'white'}}>{username}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            { isShowSidebar? null: <SidebarUser onClickShowSidebar={onClickShowSidebar} isShowSidebar={isShowSidebar}/>  }
        </Row>
    )
}

export default NavbarUser;

