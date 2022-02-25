import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import axios from '../../config/axios';
import { useCartContext } from '../../context/CartContext';

function SentMenuButton(props) {

    const { cart } = useCartContext()


    return (
        <Row className='button_fix_bottom order' justify='center'>
            <Col span={23} style={{ marginTop: '4px' }}>
                <Row justify='space-between'>
                    <Col span={10}>
                        <div className='text'>รวมสุทธิ</div>
                    </Col>
                    <Col span={10}>
                        <Row justify='end' >
                            <Col >
                                <div className='text'>{`${Number(cart.total) - Number(cart.discount)} บาท`}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button htmlType='submit' className='buttonMain' type='text'>
                    สั่งอาหาร
                </Button>
            </Col>
        </Row>
    )
}

export default SentMenuButton