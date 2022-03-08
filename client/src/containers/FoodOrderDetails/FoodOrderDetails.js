import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import localStorageServices from '../../services/localStorageUserServices'
import localStorageGuestServices from '../../services/localStorageGuestServices'
import HaveNoFoodDetails from './HaveNoFoodDetails'
import { Row, Col, Button, Divider } from 'antd'

const { getGuestID } = localStorageGuestServices
const { getUserID, getRole } = localStorageServices

function FoodOrderDetails() {
    const [orderDetailsToday, setOrderDetailsToday] = useState([])
    const [orderDetailsHistory, setOrderDetailsHistory] = useState([])
    const [isShowOrderDetailsHistory, setIsShowOrderDetailsHistory] = useState(false)
    // let current date
    const now = new Date()
    const local = now.toLocaleString().split(' ')[0]
    console.log(local)

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    const fetchOrderDetails = async () => {
        let userId
        if (getRole() === 'user') {
            userId = getUserID()
        } else {
            userId = getGuestID()
        }
        const response = await axios.get('/order')
        const newDetails = [...response.data].filter(item => item.Order.UserId === userId)
        const orderToday = newDetails.filter(item => item.Order.ordered_datetime.split(' ')[0] === local)
        const orderHistory = newDetails.filter(item => item.Order.ordered_datetime.split(' ')[0] !== local)
        console.log(newDetails)
        setOrderDetailsHistory(orderHistory)
        setOrderDetailsToday(orderToday)
    }

    const onClickNotShowOrderDetailsHistory = () => {
        setIsShowOrderDetailsHistory(false)
    }

    const onClickShowOrderDetailsHistory = () => {
        setIsShowOrderDetailsHistory(true)
    }

    const orderToday = (orderDetailsToday.map(item => (
        <Row justify='center' key={item.id} className='itemIn foodDetailsContainer'>
            <Col span={22}>
                <div style={{ fontSize: '14px', margin: '10px 0px' }}>
                    <div>{`หมายเลขโต๊ะ :  ${item.Order.table_no}`}</div>
                    <div>{`ชื่อลูกค้า :  ${item.Order.User.fname}`}</div>
                    <div>{`เวลาสั่งอาหาร:  ${item.Order.ordered_datetime}`}</div>
                    <div>{`วิธีการชำระเงิน :  ${item.pay_method}`}</div>
                    <Divider className='itemIn' />
                    {item.Order.Food.map(item => (
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
                    <Divider className='itemIn' />
                    <Row justify='end' >
                        {item.Order.status === 'payed' || item.pay_method === 'credit' ?
                            <div className='foodStatusPayed '>จ่ายแล้ว</div>
                            :
                            null
                        }
                        <Col>
                            <div >{`รวม ${item.total} บาท`}</div>
                            <div  >{`ลด ${item.discount} บาท`}</div>
                            <div style={{ borderTop: 'solid' }}>{`รวมสุทธิ ${Number(item.total) - Number(item.discount)} บาท`}</div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    ))
    )

    const orderHistory = (orderDetailsHistory.map(item => (
        <Row justify='center' key={item.id} className='itemIn foodDetailsContainer'>
            <Col span={22}>
                <div style={{ fontSize: '14px', margin: '10px 0px' }}>
                    <div>{`หมายเลขโต๊ะ :  ${item.Order.table_no}`}</div>
                    <div>{`ชื่อลูกค้า :  ${item.Order.User.fname}`}</div>
                    <div>{`เวลาสั่งอาหาร:  ${item.Order.ordered_datetime}`}</div>
                    <div>{`วิธีการชำระเงิน :  ${item.pay_method}`}</div>
                    <Divider className='itemIn' />
                    {item.Order.Food.map(item => (
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
                    <Divider className='itemIn' />
                    <Row justify='end' >
                        {item.Order.status === 'payed' || item.pay_method === 'credit' ?
                            <div className='foodStatusPayed '>จ่ายแล้ว</div>
                            :
                            null
                        }
                        <Col >
                            <div >{`รวม ${item.total} บาท`}</div>
                            <div  >{`ลด ${item.discount} บาท`}</div>
                            <div style={{ borderTop: 'solid' }}>{`รวมสุทธิ ${Number(item.total) - Number(item.discount)} บาท`}</div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    ))
    )

    return (
        <>
            {orderDetailsToday.length === 0 ? <HaveNoFoodDetails /> :
                <Row justify='center' style={{ marginBottom: '60px' }}>
                    <Col span={23}>
                        <div className='title itemIn'>
                            การสั่งอาหาร
                        </div>
                        {orderToday}
                        {isShowOrderDetailsHistory ? orderHistory : null}
                        <div style={{ textAlign: 'center', margin: '30px 0px' }}>
                            {!isShowOrderDetailsHistory ?
                                <Button onClick={onClickShowOrderDetailsHistory}>
                                    แสดงรายการทั้งหมด
                                </Button>
                                :
                                <Button onClick={onClickNotShowOrderDetailsHistory}>
                                    ย่อ
                                </Button>
                            }
                        </div>
                    </Col>
                </Row>

            }
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

export default FoodOrderDetails