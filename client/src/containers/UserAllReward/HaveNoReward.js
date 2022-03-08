import React from 'react'
import { Row, Col } from 'antd'
import { GiftOutlined } from '@ant-design/icons'

function HaveNoReward() {
    return (
        <Row justify='center'>
            <Col span={23} style={{ textAlign: 'center' }}>
                <GiftOutlined style={{ margin: '125px auto 30px auto', fontSize:'150px', color:'#c7c7c7'}}/>
                <div className='title' style={{ fontSize: '36px' }}>คุณไม่มีโค้ดสะสม</div>
                <div className='subtitle'>ไปสั่งอาหารเพื่อเพิ่มแต้มสะสมแล้วมาลุ้นรางวัลกันได้เลย</div>
            </Col>
        </Row>
    )
}

export default HaveNoReward