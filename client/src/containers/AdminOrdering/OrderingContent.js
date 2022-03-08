import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button } from 'antd'
import OrderDetails from './OrderDetails';
import axios from '../../config/axios';

function OrderingContent() {
  const [orderList, setOrderList] = useState([])
  const [details, setDetails] = useState('')

  const columns = [
    {
      title: 'ลำดับที่',
      key: 'sequence',
      render: (text, record) => (
        orderList.indexOf(record) + 1
      )
    },
    {
      title: 'หมายเลขโต๊ะ',
      key: 'tableNo',
      render: (text, record) => (
        Number(record.Order.table_no)
      ),
      sorter: (a, b) => a.Order.table_no - b.Order.table_no,
    },
    {
      title: 'ชื่อลูกค้า',
      key: 'fname',
      render: (text, record) => (
        record.Order.User.fname
      )
    },
    {
      title: 'รายละเอียดการสั่ง',
      key: 'details',
      render: (text, record) => (
        <Button
          type='text'
          className='buttonCreateFood'
          style={{ backgroundColor: '#1877F2' }}
          onClick={() => onclickOrderDetails(record.id)}
        >
          <p style={{ width: '100%' }}>รายละเอียดอาหาร</p>
        </Button>
      )
    },
  ]

  useEffect(() => {
    fetchOrderList()
  }, [])

  const fetchOrderList = async () => {
    const response = await axios.get('/order/admin')
    const newOrder = [...response.data].filter(item => item.Order.status === 'ordered')
    //change 'id' to 'key' for uniqe in antd <Table/>
    newOrder.forEach(item => {
      item.key = item.id
    })
    setOrderList(newOrder)
    console.log(newOrder)
    if (newOrder.length !== 0) {
      const initailDetails = newOrder[0]
      console.log(initailDetails)
      setDetails(initailDetails)
    }
  }

  const onclickOrderDetails = (id) => {
    const OrderDetailsById = orderList.find(item => item.id === Number(id))
    setDetails(OrderDetailsById)
  }

  return (
    <Row className='adminContentContainer'>
      <Col span={15} className='adminContentBox'>
        <Row justify='center' className='itemOut'>
          <Col span={24}>
            <div className='titleTable'>การสั่งอาหาร</div>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={24}>
            {orderList.length === 0 ? null :
              <Table
                dataSource={orderList}
                columns={columns}
                size='middle'
                pagination={{ pageSize: 15 }}
              />
            }
          </Col>
        </Row>
      </Col>
      <Col span={8} className='adminContentBox' style={{ minHeight: '100vh' }}>
        {details === '' ? null : <OrderDetails details={details} fetchOrderList={fetchOrderList} />}
      </Col>
    </Row>
  )
}

export default OrderingContent;

