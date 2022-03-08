import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { Row, Col, Input, Button, message, List } from 'antd'
import axios from '../../config/axios'
import localStorageServices from '../../services/localStorageUserServices'

const { getUserID } = localStorageServices

function Discount() {
    const navigate = useNavigate()
    const { cart, cartAction } = useCartContext()
    const { fetchCartData } = cartAction
    const [inputContent, setInputContent] = useState('')
    const [discountData, setDiscountData] = useState([])
    const [discountItemData, setDiscountItemData] = useState([])
    const [userDiscounts, setUserDiscounts] = useState([])
    const [isShowUserDiscounts, setIsShowUserDiscounts] = useState(false)

    useEffect(() => {
        fetchCartData()
    }, [])

    useEffect(() => {
        fetchDiscountItemData()
    }, [])

    useEffect(() => {
        fetchDiscountData()
    }, [])


    const fetchDiscountItemData = async () => {
        await axios.get('/discount/item/user')
            .then(res => {
                console.log(res.data)
                const targetUser = [...res.data].find(item => item.id === getUserID())
                console.log(targetUser)
                const discountHaveQuantity = targetUser.Discounts.filter(item => Number(item.Discount_item.quantity) !== 0)
                setUserDiscounts(discountHaveQuantity)
                setDiscountItemData([...res.data])
            })
    }

    const fetchDiscountData = async () => {
        await axios.get('/discount/user')
            .then(res => {
                console.log(res.data)
                setDiscountData([...res.data])
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onChangeInputContent = (e) => {
        setInputContent(e.target.value)
    }

    const onClickInput = () => {
        if (userDiscounts.length !== 0) {
            setIsShowUserDiscounts(prev => !prev)
        }
    }

    const onClickDiscountList = (codeName) => {
        setInputContent(codeName)
        setIsShowUserDiscounts(false)
    }

    const checkAndUseCode = async (targetDiscount) => {
        // let current date
        const now = new Date()
        const day = now.getDate()
        const month = (now.getMonth() + 1) * 100
        const year = (now.getFullYear() + 543) * 10000
        const current = year + month + day
        console.log(current)
        // let exrp date
        const expr = targetDiscount.expr
        const exprDay = Number(expr.slice(0, 2))
        const exprMonth = Number(expr.slice(3, 5)) * 100
        const exprYear = Number(expr.slice(6)) * 10000
        const exprDate = exprYear + exprMonth + exprDay
        console.log(exprDate)
        //check expr date
        if (current > exprDate) {
            message.error(`โค้ดส่วนลดหมดอายุ`)
            setInputContent('')
            return
            //check price total
        } else if (Number(cart.total) < targetDiscount.min_total) {
            message.error(`ราคาอาหารรวมขั้นต่ำ ${targetDiscount.min_total} บาท`)
            setInputContent('')
            return
        } else {
            let discount = Number(cart.total) * (targetDiscount.percent / 100)

            if (discount > Number(targetDiscount.max_discount)) {
                discount = Number(targetDiscount.max_discount)
            }

            console.log(discount)
            await axios.put(`/cart/discount/user/${cart.id}`, {
                DiscountId: targetDiscount.id,
                discount: discount
            })
                .then(res => {
                    console.log(res.data)
                    navigate('/order')
                    message.success('ใช้ส่วนลดสำเร็จ')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onClickUseCode = async () => {
        setIsShowUserDiscounts(false)
        console.log(inputContent)
        const targetDiscount = discountData.find(item => item.code_name === inputContent)

        console.log(targetDiscount)
        if (!targetDiscount) {
            message.error('โค้ดส่วนลดไม่ถูกต้อง')
            setInputContent('')
            return
        } else {
            const targetUser = discountItemData.find(item => item.id === getUserID())
            const targetDiscountItem = targetUser.Discounts.find(item => item.id === Number(targetDiscount.id))

            if (targetDiscount.status === 'forReward') {
                if (targetDiscountItem) {
                    const discountItemQuantity = Number(targetDiscountItem.Discount_item.quantity)
                    //check code used
                    if (discountItemQuantity <= 0) {
                        message.error('คุณใช้โค้ดส่วนลดนี้แล้ว')
                        setInputContent('')
                        return
                    } else {
                        checkAndUseCode(targetDiscount)
                    }

                } else {
                    message.error('คุณไม่มีโค้ดนี้อยู่ในส่วนลดสะสมของคุณ')
                    setInputContent('')
                    return
                }

            } else {
                if (targetDiscountItem) {
                    const discountItemQuantity = Number(targetDiscountItem.Discount_item.quantity)
                    //check code used
                    if (discountItemQuantity <= 0) {
                        message.error('คุณใช้โค้ดส่วนลดนี้แล้ว')
                        setInputContent('')
                        return
                    }
                } else {
                    checkAndUseCode(targetDiscount)
                }
            }
        }
    }

    return (
        <Row justify='center'>
            <Col span={23}>
                <div className='title itemOut'>ส่วนลด</div>
                <Row justify='space-between'>
                    <Col span={17}>
                        <Input
                            placeholder='ใส่โค้ดส่วนลด'
                            value={inputContent}
                            onChange={onChangeInputContent}
                            onClick={onClickInput}
                            className='input'
                        />
                        {!isShowUserDiscounts ? null :
                            <List
                                header='ส่วนลดของคุณ'
                                style={{ marginTop: '3px' }}
                                size="small"
                                bordered
                                dataSource={userDiscounts}
                                renderItem={item => (
                                    <List.Item key={item.id} onClick={()=> onClickDiscountList(item.code_name)}>
                                        <Row justify='center' style={{ width: '100%' }}>
                                            <Col span={24}>
                                                <div
                                                    className='quantityModal'
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        right: '0px',
                                                        height: '20px',
                                                        width: '20px',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    {item.Discount_item.quantity}
                                                </div>
                                                <div style={{ color: '#FA4A0C' }}>
                                                    {` ${item.code_name} `}
                                                </div>
                                                <div>
                                                    <span
                                                        style={{ color: '#FA4A0C' }}>
                                                        {`ลด ${item.percent}% `}
                                                    </span>
                                                    <span className='itemSide'>{`สูงสุด${item.max_discount}บาท`} </span>
                                                </div>
                                                <div>
                                                    <span> {`สั่งขั้นต่ำ ${item.min_total} บาท `}</span>
                                                </div>
                                                <div>
                                                    {`หมดอายุ ${item.expr}`}
                                                </div>
                                            </Col>
                                        </Row>
                                    </List.Item>)}
                            />
                        }
                    </Col>
                    <Col span={6}>
                        <Button
                            className='buttonMain'
                            onClick={onClickUseCode}
                        >
                            ตกลง
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Discount