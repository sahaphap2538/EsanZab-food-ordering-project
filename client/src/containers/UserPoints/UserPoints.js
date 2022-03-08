import React from 'react'
import { Row, Col } from 'antd'


function UserPoints(props) {
    const { points } = props

    return (
        <Row justify='center'>
            <Col span={23}>
                <div className='title'>สะสมแต้มและแลกรางวัล</div>
                <div className='itemOut1 listContainer' >
                    <div>
                        <div className='subtitle'>คุณมีแต้มสะสมทั้งหมด</div>
                        <span 
                            className='title' 
                            style={{ margin: '0px 10px', color:'#FA4A0C',fontSize:'64px' }}>
                                {points}
                        </span>
                        <span className='text'>แต้ม</span>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default UserPoints