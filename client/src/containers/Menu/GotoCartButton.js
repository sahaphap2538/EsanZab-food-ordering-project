import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import { useCartContext } from '../../context/CartContext';

function GotoCartButton(props) {
    
    const { cart } = useCartContext()


    return (
        <Row className='button_fix_bottom'>
            <Col span={23} style={{ marginTop: '4px' }}>
                <Link to='/order'>
                    <Button className='buttonMain' type='text'>
                        <Row justify='space-between'>
                            <Col span={6}>
                                {props.quantityTotal}
                            </Col>
                            <Col span={12}>
                                ไปที่ตะกร้า
                            </Col>
                            <Col span={6}>
                                {`${cart.total} บาท`}
                            </Col>
                        </Row>
                    </Button>
                </Link>
            </Col>
        </Row>
    )
}

export default GotoCartButton