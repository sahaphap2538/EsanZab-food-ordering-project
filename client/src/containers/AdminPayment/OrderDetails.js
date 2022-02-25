import React from 'react';
import { Row, Col, Divider, Button, notification } from 'antd'
import axios from '../../config/axios';

function OrderDetails(props) {
  const { details, fetchOrderList } = props
  const tableNo = details.Order.table_no
  const userName = details.Order.User.fname
  const orderDate = details.Order.ordered_datetime.slice(0, 10)
  const orderTime = details.Order.ordered_datetime.slice(11, 19)
  const payMethod = details.pay_method
  const foodList = details.Order.Food
  const orderId = Number(details.Order.id)
  const priceTotal = details.total

  const onClickPayed = async (orderId) => {
    await axios.put(`/order/status/${orderId}`, {
      status: 'payed'
    })
     .then( res => {
      console.log(res.data)
      notification.success({
        message: 'ชำระเงินเรียบร้อย'
      })
      fetchOrderList()
     })
     .catch( err => {
       console.log(err)
     })
  }

  return (
    <Row justify='center'>
      <Col span={23}>
        <div className='title itemOut'>รายละเอียดการชำระเงิน</div>
        <Divider className='itemIn' />
        <div className='text' style={{ fontSize: '20px' }}>
          <div>{`หมายเลขโต๊ะ :  ${tableNo}`}</div>
          <div>{`ชื่อลูกค้า :  ${userName}`}</div>
          <div>{`เวลาสั่งอาหาร:  ${orderDate} ${orderTime}`}</div>
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
              <Col span={11} style={{textAlign:'end'}}>
                {`${Number(item.Order_item.quantity) * Number(item.price)}`}
              </Col>
            </Row>
          ))}
        </div>
        <Divider className='itemIn' />
        <div className='title' style={{fontSize:'28px', textAlign:'end'}}>{`รวมสุทธิ ${priceTotal}`}</div>
        <Button className='buttonMain itemOut1' onClick={() => onClickPayed(orderId)}>
            ชำระเงิน
        </Button>
      </Col>
    </Row>
  )
}

export default OrderDetails;
