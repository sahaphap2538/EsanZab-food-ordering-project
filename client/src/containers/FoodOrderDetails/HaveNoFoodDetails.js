import React from 'react'
import ListNull from '../../assets/ListNull.png'
import { Row, Col, Image } from 'antd'


function HaveNoFoodDetails() {
    return (
        <Row justify='center'>
            <Col span={23} style={{ textAlign: 'center' }}>
                <Image src={ListNull} style={{ margin: '125px auto 30px auto' }} preview={false}/>
                <div className='title' style={{ fontSize: '36px' }}>วันนี้คุณยังไม่ได้สั่งอาหาร</div>
                <div className='subtitle'>คุณสามารถกดปุ่มด้านล่างเพื่อสั่งอาหารได้เลย</div>
            </Col>
        </Row>
    )
}

export default HaveNoFoodDetails