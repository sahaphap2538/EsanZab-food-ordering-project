import React, { useState } from 'react'
import { Row, Col, Button, Spin, message } from 'antd'
import { LoadingOutlined, GiftOutlined } from '@ant-design/icons'
import axios from '../../config/axios'

function RandomPoints(props) {
    const { points, userId, fetchPoints } = props
    const [isShowLoad, setIsShowLoad] = useState(false)
    const [rewardData, setRewardData] = useState('')

    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
    const reward = (
        <Row justify='center'>
            <Col span={23}>
                <div className='title'>
                    คุณได้รับรางวัล!!!
                </div>
                <div className='itemIn listContainer' style={{height:'110px'}}>
                    <div className='title' style={{ color: '#FA4A0C' }}>
                        {` ${rewardData.code_name} `}
                    </div>
                    <div>
                        <span 
                            className='title' 
                            style={{ color: '#FA4A0C' }}> 
                            {`ลด ${rewardData.percent}% `}
                        </span>  
                        <span className='itemSide'>{`สูงสุด${rewardData.max_discount} บาท`} </span>
                    </div>
                    <div>
                        <span> {`สั่งขั้นต่ำ ${rewardData.min_total} บาท `}</span>  
                        <span className='itemSide'>{`หมดอายุ ${rewardData.expr}`} </span>
                    </div> 
                </div>
            </Col>
        </Row>
    )

    const getContentReward = () => {
        if ( rewardData === '' && isShowLoad === false) {
            return null
        }
        if (isShowLoad) {
            return <Spin indicator={antIcon} />
        }

        if (reward !== '' && isShowLoad === false) {
            return reward
        }
    }

    const onClickGetReward = async () => {
        if (Number(points) < 1000) {
            message.error('แต้มของคุณไม่เพียงพอต้อง 1000 แต้มขึ้นไป')
        } else {
            setIsShowLoad(true)
            await axios.get('/discount/user')
                .then(async (res) => {
                    console.log(res.data)
                    const discountForReward = [...res.data].filter(item => (item.status === 'forReward') && (item.quantity === 'unlimit' || Number(item.quantity) > 0))
                    console.log(discountForReward)
                    let index = Math.floor(Math.random() * (100 - 1 + 1) + 1)
                    if (index % 2 === 0) {
                        index = 0
                    } else {
                        if (index < 40) {
                            index = 1
                        } else if (index < 70) {
                            index = 2
                        } else if (index < 90) {
                            index = 3
                        } else {
                            index = 4
                        }
                    }

                    const myDiscount = discountForReward[index]
                    //get discount for check the same item in the discount_item table
                    await axios.get('/discount/item/user')
                        .then(async (res) => {
                            console.log(res.data)
                            const targetUser = [...res.data].find(item => item.id === Number(userId))
                            const theSameDiscount = targetUser.Discounts.find(item => item.id === Number(myDiscount.id))
                            if (theSameDiscount) {
                                //have the same item then update quantity
                                await axios.put(`/discount/item/user/${Number(myDiscount.id)}/${Number(userId)}`, {
                                    quantity: Number(theSameDiscount.Discount_item.quantity) + 1
                                })
                                    .then(res => {
                                        console.log(res.data)
                                    })

                            } else {
                                //not the same item
                                //create discount in the discount_item table
                                await axios.post('/discount/user', {
                                    DiscountId: Number(myDiscount.id),
                                    UserId: Number(userId),
                                    quantity: 1
                                })
                                    .then(async (res) => {
                                        console.log(res.data)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }

                            if (myDiscount.quantity !== 'unlimit') {
                                //update quantity of discount
                                await axios.put(`/discount/quantity/user/${Number(myDiscount.id)}`, {
                                    quantity: Number(myDiscount.quantity) - 1
                                })
                                    .then(res => {
                                        console.log(res.data)
                                    })
                            }

                            //update user's points 
                            await axios.put(`/user/points/user/${userId}`, {
                                points: Number(points) - 1000
                            })
                                .then(res => {
                                    console.log(res.data)
                                    fetchPoints()
                                })

                            setRewardData(myDiscount)
                            console.log(myDiscount)
                            setTimeout(() => {
                                setIsShowLoad(false)
                            }, 3000);

                        })

                })
        }

    }

    return (
        <Row justify='center'>
            <Col span={23}>
                <div className='itemOut1' style={{ textAlign: 'center' }}>
                    < GiftOutlined style={{ fontSize: '72px', color: '#FA4A0C' }} />
                    <div
                        className='title subtitle itemOut'
                        style={{ color: '#FA4A0C' }}>
                        คุณสามารถใช้ 1000 แต้ม เพื่อลุ้นรับโค้ดส่วนลดมากมายโดยกดสุ่มรางวัลได้เลย
                    </div>
                    {getContentReward()}
                </div>
                <Button
                    className='buttonMain'
                    style={{ position: 'fixed', bottom: '30px', left: '3%', width: '94%' }}
                    onClick={onClickGetReward}
                >
                    สุ่มรางวัล
                </Button>
            </Col>
        </Row>
    )
}

export default RandomPoints