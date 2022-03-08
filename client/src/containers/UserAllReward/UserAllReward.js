import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import axios from '../../config/axios'
import localStorageServices from '../../services/localStorageUserServices'
import HaveNoReward from './HaveNoReward'

const { getUserID } = localStorageServices

function UserAllReward() {
    const [myDiscountData, setMyDiscountData] = useState([])

    const fetchMyDiscountData = async () => {
        await axios.get('/discount/item/user')
            .then(res => {
                console.log(res.data)
                const targetUser = [...res.data].find(item => item.id === getUserID())
                const myDiscount = targetUser.Discounts.filter(item => item.Discount_item.quantity > 0)
                setMyDiscountData(myDiscount)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchMyDiscountData()
    }, [])

    return (
        <>
            {myDiscountData.length === 0 ? <HaveNoReward/> :
                <Row justify='center'>
                    <Col span={23}>
                        <div className='title itemIn'>
                            ส่วนลดของฉัน
                        </div>
                        {myDiscountData.map(item => (
                            <Row justify='center' key={item.id}>
                                <Col span={23}>
                                    <div className='itemIn listContainer' style={{ height: '110px' }}>
                                        <div
                                            className='quantityModal'
                                            style={{ position: 'absolute', top: '0px', right: '10px' }}
                                        >
                                            {item.Discount_item.quantity}
                                        </div>
                                        <div className='title' style={{ color: '#FA4A0C' }}>
                                            {` ${item.code_name} `}
                                        </div>
                                        <div>
                                            <span
                                                className='title'
                                                style={{ color: '#FA4A0C' }}>
                                                {`ลด ${item.percent}% `}
                                            </span>
                                            <span className='itemSide'>{`สูงสุด${item.max_discount} บาท`} </span>
                                        </div>
                                        <div>
                                            <span> {`สั่งขั้นต่ำ ${item.min_total} บาท `}</span>
                                            <span className='itemSide'>{`หมดอายุ ${item.expr}`} </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        ))
                        }
                    </Col>
                </Row>}
        </>
    )
}

export default UserAllReward