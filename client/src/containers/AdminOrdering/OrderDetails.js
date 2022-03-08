import React from 'react';
import { Row, Col, Divider, Button, notification } from 'antd'
import axios from '../../config/axios';

function OrderDetails(props) {
  const { details, fetchOrderList } = props
  const tableNo = details.Order.table_no
  const userName = details.Order.User.fname
  const orderDateTime = details.Order.ordered_datetime
  const payMethod = details.pay_method
  const foodList = details.Order.Food
  const orderId = Number(details.Order.id)
  const priceTotal = details.total
  const discount = details.discount

  const onClickServed = async (orderId) => {
    await axios.put(`/order/status/admin/${orderId}`, {
      status: 'served'
    })
      .then(res => {
        console.log(res.data)
        notification.success({
          message: 'ส่งอาหารให้ลูกค้าเรียบร้อยแล้วรอการชำระเงิน'
        })
        fetchOrderList()
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <Row justify='center'>
      <Col span={23}>
        <div className='title itemOut'>รายละเอียดการสั่งอาหาร</div>
        <Divider className='itemIn' />
        <div className='text' style={{ fontSize: '20px' }}>
          <div>{`หมายเลขโต๊ะ :  ${tableNo}`}</div>
          <div>{`ชื่อลูกค้า :  ${userName}`}</div>
          <div>{`เวลาสั่งอาหาร:  ${orderDateTime}`}</div>
          <div>{`วิธีการชำระเงิน :  ${payMethod}`}</div>
          <Divider className='itemIn' />
          {foodList.map(item => (
            <Row justify='space-between' key={item.id}>
              <Col span={11}>
                <Row>
                  <Col span={24}>
                    {item.name}
                  </Col>
                  <Col span={24}>
                    {`${item.Order_item.quantity} x ${item.price}`}
                  </Col>
                </Row>
              </Col>
              <Col span={11} style={{ textAlign: 'end' }}>
                {`${Number(item.Order_item.quantity) * Number(item.price)}`}
              </Col>
            </Row>
          ))}
        </div>
        <Divider className='itemIn' />
        <Row justify='end' >
          <Col >
            <div className='text'>{`รวม ${priceTotal} บาท`}</div>
            <div className='text' style={{ fontSize: '16px' }}>{`ลด ${discount} บาท`}</div>
            <div className='title' style={{ borderTop: 'solid' }}>{`รวมสุทธิ ${Number(priceTotal) - Number(discount)} บาท`}</div>
          </Col>
        </Row>
        <Button className='buttonMain itemOut1' onClick={() => onClickServed(orderId)}>
          เสิร์ฟอาหารสำเร็จ
        </Button>
      </Col>
    </Row>
  )
}

export default OrderDetails;
