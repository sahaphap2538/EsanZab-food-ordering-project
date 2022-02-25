import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { Row, Col, Input, Button, message } from 'antd'
import axios from '../../config/axios'

function Discount() {
    const navigate = useNavigate()
    const { cart, cartAction } = useCartContext()
    const { fetchCartData } = cartAction
    const [inputContent, setInputContent] = useState('')
    const [discountData, setDiscountData] = useState([])

    useEffect(() => {
        fetchCartData()
    }, [])

    useEffect(() => {
        fetchDiscountData()
    }, [])

    const fetchDiscountData = async () => {
        await axios.get('/discount')
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

    const onClickUseCode = async () => {
        console.log(inputContent)
        const targetDiscount = discountData.find(item => item.code_name === inputContent)

        console.log(targetDiscount)
        if (!targetDiscount) {
            message.error('โค้ดส่วนลดไม่ถูกต้อง')
            setInputContent('')
            return
        } else {

            if (targetDiscount.status === 'forReward') {
                message.error('โค้ดส่วนลดสำหรับรางวัลจากแต้มสะสมเท่านั้น')
                setInputContent('')
                return
            } else {
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
                    await axios.put(`/cart/discount/${cart.id}`, {
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
                            className='input'
                        />
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