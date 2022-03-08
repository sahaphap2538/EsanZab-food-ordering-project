import React from 'react'
import CartNull from '../../assets/CartNull.png'
import { Row, Col, Image, Button } from 'antd'
import { Link } from 'react-router-dom'

function HaveNoFoodInCart() {
    return (
        <>
            <Row justify='center'>
                <Col span={23} style={{ textAlign: 'center' }}>
                    <Image src={CartNull} style={{ margin: '125px auto 30px auto' }} preview={false}/>
                    <div className='title' style={{ fontSize: '36px' }}>ยังไม่มีรายการอาหาร</div>
                    <div className='subtitle'>คุณสามารถกดปุ่มด้านล่างเพื่อสั่งอาหารได้เลย</div>
                </Col>
            </Row>
            <Row className='button_fix_bottom order' justify='center' style={{ height: '60px' }}>
                <Col span={23} style={{ marginTop: '5px' }}>
                    <Link to='/menu'>
                        <Button className='buttonMain' type='text'>
                            สั่งอาหาร
                        </Button>
                    </Link>
                </Col>
            </Row>
        </>
    )
}

export default HaveNoFoodInCart