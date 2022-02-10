import React from 'react';
import { Row, Col } from 'antd'
import OrderDetails from './OrderDetails';

function PaymentContent() {
  return (
    <Row className='adminContentContainer'>
      <Col span={17} className='adminContentBox'>
      
      </Col>
      <Col span={6} className='adminContentBox' >
        <OrderDetails/>
      </Col>
    </Row>
  )
}

export default PaymentContent;
