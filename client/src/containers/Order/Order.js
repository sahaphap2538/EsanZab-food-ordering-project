import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Divider, List, Image, Button, Form, Input, Radio, Space, message } from 'antd'
import styles from '../Menu/Menu.module.css'
import { useCartContext } from '../../context/CartContext';
import SentMenuButton from './SentMenuButton';
import ModalPromotion from './ModalPromotion';
import ModalThanks from './ModalThanks';
import Reward from '../../assets/Reward.png'
import localStorageServices from '../../services/localStorageUserServices';
import localStorageGuestServices from '../../services/localStorageGuestServices';
import axios from '../../config/axios';

const { getRole, getUserID } = localStorageServices
const { getGuestID } = localStorageGuestServices

function Order() {
    const navigate = useNavigate()
    const { cart, cartAction } = useCartContext()
    const { fetchCartData } = cartAction
    const foodInCart = [...cart.Food]
    const [isShowPromotionMadal, setIsShowPromotionModal] = useState(false)
    const [isShowThanksMadal, setIsShowThanksModal] = useState(false)
    const [point, setPoint] = useState(0)

    useEffect(() => {
        fetchCartData()
    }, [])

    const gotoPromotion = () => {
        if (getRole() === 'user') {
            navigate('/discount')
        } else {
            setIsShowPromotionModal(true)
        }
    }

    const getId = () => {
        if (getRole() === 'user') {
            return getUserID()
        } else {
            return getGuestID()
        }
    }

    const onClickMinus = async (foodId, quantity, price) => {
        const userId = getId()
        if (Number(quantity) === 1) {
            await axios.delete(`/cart/${userId}/${foodId}`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            await axios.put('/cart', {
                quantity: Number(quantity) - 1,
                CartId: userId,
                FoodId: Number(foodId)
            })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        await axios.put(`/cart/total/${userId}`, {
            total: Number(cart.total) - Number(price)
        })
            .then(res => {
                console.log(res.data)
                fetchCartData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onClickPlus = async (foodId, quantity, price) => {
        const userId = getId()
        await axios.put('/cart', {
            quantity: Number(quantity) + 1,
            CartId: userId,
            FoodId: Number(foodId)
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        await axios.put(`/cart/total/${userId}`, {
            total: Number(cart.total) + Number(price)
        })
            .then(res => {
                console.log(res.data)
                fetchCartData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onFinishFailed = () => {
        message.error('กรุุณากรอกสถานที่เสิร์ฟ');
    };

    const onFinishCreateMenu = async (values) => {
        const now = new Date()
        const userId = getId()

        if (foodInCart.length === 0) {
            navigate('/menu')
        } else {
            await axios.put(`/cart/total/${userId}`, {
                total: 0
            })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            foodInCart.forEach(async (item) => {
                await axios.delete(`/cart/${item.Cart_item.CartId}/${item.id}`)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

            if (Number(cart.total) > 0 && getRole() === 'user') {
                await axios.get(`/user/points/${userId}`)
                    .then(async (res) => {
                        console.log(res.data.points)
                        await axios.put(`/user/points/${userId}`, {
                            points: Number(res.data.points) + Number(cart.total)
                        })
                            .then( res => {
                                console.log(res.data)
                                setPoint(res.data.data.points)
                            })
                })
            }

            await axios.post('/order', {
                pay_method: values.payment,
                total: Number(cart.total),
                table_no: Number(values.tableNo),
                ordered_datetime: now,
                UserId: userId,
                Food: foodInCart
            })
                .then(res => {
                    console.log(res.data)
                    setIsShowThanksModal(true)
                    setTimeout(() => {
                        setIsShowThanksModal(false)
                        navigate('/menu')
                        fetchCartData()
                    }, 5000)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        < >
            <Row justify='center' style={{ marginBottom: '90px' }}>
                <Col span={24}>
                    <Form
                        name='createMenu'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinishFailed={onFinishFailed}
                        onFinish={onFinishCreateMenu}
                    >
                        <Row justify='center'>
                            <Col span={23}>
                                <div className='title'>สถานที่เสิร์ฟ</div>
                                <Form.Item
                                    name='tableNo'
                                    className='itemIn'
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณากรอกสถานที่ส่งอาหาร"
                                        }
                                    ]}
                                >
                                    <Input placeholder='หมายเลขโต๊ะหรือหมายเลขห้องอาหาร' />
                                </Form.Item>
                                <div className='title'>วิธีการชำระเงิน</div>
                                <p style={{ color: 'red' }}>*เมื่อรับประทานเสร็จชำระเงินที่หน้าเคาน์เตอร์</p>
                                <Form.Item
                                    name='payment'
                                    className='itemIn'
                                    initialValue='cash'
                                >
                                    <Radio.Group >
                                        <Space direction="vertical">
                                            <Radio value='cash'><div className='text'>เงินสด</div></Radio>
                                            <Radio value='bank' ><div className='text'>โอนผ่านธนาคาร</div></Radio>
                                            <Radio value='credit' ><div className='text'>บัตรเดบิต/เครดิต</div></Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '0 0 10px 0' }} />
                        <Row justify='center'>
                            <Col span={23}>
                                <Row>
                                    <div className='title'>ส่วนลด</div>
                                </Row>
                                <Row>
                                    <Button className='buttonPromotion' type='ghost' onClick={gotoPromotion} style={{ margin: '10px 0px' }}>
                                        <Row justify='center'>
                                            <Col span={24}>
                                                <Image src={Reward} preview={false} style={{ padding: '0px 10px' }} />
                                                กดรับส่วนลดและโปรโมชั่นเลย
                                            </Col>
                                        </Row>
                                    </Button>
                                    <ModalPromotion isShowPromotionMadal={isShowPromotionMadal} setIsShowPromotionModal={setIsShowPromotionModal} />
                                </Row>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '0 0 10px 0' }} />
                        <Row justify='center'>
                            <Col span={23}>
                                <Row>
                                    <div className='title'>รายการอาหาร</div>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <List
                                            size='small'
                                            dataSource={foodInCart}
                                            renderItem={item => (
                                                <List.Item
                                                    key={item.id}
                                                >
                                                    <Row justify='space-between' style={{ width: '100%' }}>
                                                        <Col span={16} style={{ margin: '0' }}>
                                                            <Row justify='start' gutter={16}>
                                                                <Col >
                                                                    <Image src={item.picture} className='foodImage' preview={false} />
                                                                </Col>
                                                                <Col>
                                                                    <div className={styles.title_food}>{item.name}</div>
                                                                    <div className={styles.description_food}>{`${item.price * item.Cart_item.quantity} บาท`}</div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Row justify='space-around' gutter={[8]}  >
                                                                <Col span={6}  >
                                                                    <Button
                                                                        type='text'
                                                                        className='buttonMain quantityModal'
                                                                        onClick={() => onClickMinus(item.id, item.Cart_item.quantity, item.price)}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                </Col>
                                                                <Col span={6}  >
                                                                    <div className='quantityModal' style={{ margin: '0px auto' }}>{item.Cart_item.quantity}</div>
                                                                </Col>
                                                                <Col span={6}  >
                                                                    <Button
                                                                        type='text'
                                                                        className='buttonMain quantityModal'
                                                                        onClick={() => onClickPlus(item.id, item.Cart_item.quantity, item.price)}
                                                                    >
                                                                        +
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                </Row>
                                <Row justify='end' >
                                    <Col >
                                        <p className='title subtitle'>{`รวมสุทธิ ${cart.total} บาท`}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Form.Item >
                            <SentMenuButton />
                            <ModalThanks isShowThanksMadal={isShowThanksMadal} setIsShowThanksModal={setIsShowThanksModal} point={point}/>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Order