import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Divider, List, Image, Button, Form, Radio, Space, message, notification } from 'antd'
import styles from '../Menu/Menu.module.css'
import { useCartContext } from '../../context/CartContext';
import SentMenuButton from './SentMenuButton';
import ModalPromotion from './ModalPromotion';
import ModalThanks from './ModalThanks';
import Reward from '../../assets/Reward.png'
import localStorageServices from '../../services/localStorageUserServices';
import localStorageGuestServices from '../../services/localStorageGuestServices';
import localStorageTableNo from '../../services/localStorageTableNo';
import axios from '../../config/axios';
import HaveNoFoodInCart from './HaveNoFoodInCart';
import Script from "react-load-script";

const { getRole, getUserID } = localStorageServices
const { getGuestID } = localStorageGuestServices
const { getTableNo } = localStorageTableNo

let OmiseCard

function Order() {
    const navigate = useNavigate()
    const { cart, cartAction } = useCartContext()
    const { fetchCartData } = cartAction
    const foodInCart = [...cart.Food]
    const [isShowPromotionMadal, setIsShowPromotionModal] = useState(false)
    const [isShowThanksMadal, setIsShowThanksModal] = useState(false)
    const [point, setPoint] = useState(0)
    const [discountData, setDiscountData] = useState([])
    const [discountItemData, setDiscountItemData] = useState([])
    const [userData, setUserData] = useState({})

    useEffect(() => {
        fetchDiscountItemData()
    }, [])

    useEffect(() => {
        fetchDiscountData()
    }, [])

    useEffect(() => {
        fetchCartData()
    }, [])

    const fetchDiscountItemData = async () => {
        await axios.get('/discount/item')
            .then(res => {
                console.log(res.data)
                setDiscountItemData([...res.data])
                const targetUser = [...res.data].find(item => item.id === getId())
                console.log(targetUser)
                setUserData(targetUser)
            })
    }

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

    const onClickPromotion = () => {
        if (getRole() === 'user') {
            navigate(`/discount`)
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

    // เพิ่มลดจำนวนอาหารในรายการอาหาร
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

    //จัดการเกี่ยวกับการสร้างอาหาร อัปเดตโค้ด
    const updateDiscountItemQuntity = async (targetDiscount) => {
        const userId = getId()
        const targetUser = discountItemData.find(item => item.id === userId)
        const targetDiscountItem = targetUser.Discounts.find(item => item.id === Number(targetDiscount.id))
        const oldQuantity = Number(targetDiscountItem.Discount_item.quantity)

        await axios.put(`/discount/item/${Number(targetDiscount.id)}/${userId}`, {
            quantity: oldQuantity - 1
        })
            .then(res => {
                console.log(res.data)
            })
    }

    const createCodeUsed = async () => {
        const userId = getId()
        //create discount item have 0 quantity  in the discount_item table for check discount item used
        await axios.post('/discount', {
            DiscountId: Number(cart.DiscountId),
            UserId: userId,
            quantity: 0
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const createOrder = async (values) => {
        const now = new Date()
        const localNow = now.toLocaleString()
        const userId = getId()

        // update for clear all in cart to null
        await axios.put(`/cart/total/${userId}`, {
            total: 0
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        await axios.put(`/cart/discount/${cart.id}`, {
            DiscountId: null,
            discount: 0
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        //delete all of food item in the cart_item
        foodInCart.forEach(async (item) => {
            await axios.delete(`/cart/${item.Cart_item.CartId}/${item.id}`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        })

        const total = Number(cart.total) - Number(cart.discount)
        // set Points of user
        if (total > 0 && getRole() === 'user') {
            await axios.get(`/user/points/${userId}`)
                .then(async (res) => {
                    console.log(res.data.points)
                    await axios.put(`/user/points/${userId}`, {
                        points: Number(res.data.points) + total
                    })
                        .then(res => {
                            console.log(res.data)
                            setPoint(res.data.data.points)
                        })
                })
        }

        await axios.post('/order', {
            pay_method: values.payment,
            total: Number(cart.total),
            table_no: getTableNo(),
            ordered_datetime: localNow,
            UserId: userId,
            Food: foodInCart,
            DiscountId: cart.DiscountId,
            discount: cart.discount
        })
            .then(async (res) => {
                console.log(res.data)
                setIsShowThanksModal(true)
                setTimeout(() => {
                    setIsShowThanksModal(false)
                    navigate('/order_details')
                    fetchCartData()
                }, 5000)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const onFinishFailed = () => {
        message.error('กรุุณากรอกสถานที่เสิร์ฟ');
    };

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     creditCardConfigure();
    //     omiseCardHandler()
    // }

    //ทำเกี่ยวกับบัตรเครดิต
    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: 'pkey_test_5r0rjsh5wecr1bcvs6q',
            currency: 'THB',
            frameLabel: 'Esanzab restaurant',
            submitLabel: 'จ่ายเลย',
            buttonLabel: 'Pay with Omise'
        });
    }

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: []
        });
        OmiseCard.configureButton("#credit-card");
        OmiseCard.attach();
    }

    const omiseCardHandler =  (values) => {
        const amount = (Number(cart.total) - Number(cart.discount)) * 100
        OmiseCard.open({
            amount: amount,
            onCreateTokenSuccess: async (token) => {
               await axios.post(`/credit`, {
                    email: userData.username,
                    name: userData.fname,
                    amount: amount,
                    token: token,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then( res => {
                        console.log(res.data)
                        checkCodeOutAndCreateOrder(values)
                    })     
            },
            onFormClosed: () => {
                console.log('close window omise')
                window.location.reload(true)
            },
      })
    }

    const checkCodeOutAndCreateOrder = async (values) => {
        if (Number(cart.DiscountId !== null)) {
            const targetDiscount = discountData.find(item => item.id === Number(cart.DiscountId))
            console.log(targetDiscount)
            //โค้ดหมด
            if (Number(targetDiscount.quantity) === 0) {
                await axios.put(`/cart/discount/${cart.id}`, {
                    DiscountId: null,
                    discount: 0
                })
                    .then(res => {
                        console.log(res.data)
                        fetchCartData()
                        message.error('โค้ดส่วนลดถูกใช้หมดแล้ว')
                        return
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            // มีโค้ด
            if (Number(targetDiscount.quantity) > 0) {
                await axios.put(`/discount/quantity/${cart.DiscountId}`, {
                    quantity: Number(targetDiscount.quantity) - 1
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                if (targetDiscount.status === 'forReward') {
                    updateDiscountItemQuntity(targetDiscount)
                } else {
                    createCodeUsed()
                }

                createOrder(values)

            }
            if (targetDiscount.quantity === 'unlimit') {
                if (targetDiscount.status === 'forReward') {
                    updateDiscountItemQuntity(targetDiscount)
                } else {
                    createCodeUsed()
                }
                createOrder(values)
            }

        } else {
            createOrder(values)
        }
    }

    //click button order food
    const onFinishCreateMenu = async (values) => {
        console.log(values.payment)
        if (foodInCart.length === 0) {
            navigate('/menu')
        } else {
            // update quantity of discountion when user will order food
            if ( values.payment === 'credit') {
                creditCardConfigure();
                omiseCardHandler(values)
            } else {
                checkCodeOutAndCreateOrder(values)
            }        
        }
    }

    return (
        <>
            {foodInCart.length === 0 ? <HaveNoFoodInCart /> :
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
                                            <div className='text'>{`รวม ${cart.total} บาท`}</div>
                                            <div className='text' style={{ fontSize: '16px' }}>{`ลด ${cart.discount} บาท`}</div>
                                            <div className='title subtitle' style={{ borderTop: 'solid' }}>{`รวมสุทธิ ${Number(cart.total) - Number(cart.discount)} บาท`}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider style={{ margin: '0 0 10px 0' }} />
                            <Row justify='center'>
                                <Col span={23}>
                                    <Row>
                                        <div className='title'>ส่วนลด</div>
                                    </Row>
                                    <Row>
                                        <Button className='buttonPromotion' type='ghost' onClick={onClickPromotion} style={{ margin: '10px 0px' }}>
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
                                    <div className='title'>สถานที่เสิร์ฟ</div>
                                    <div className='subtitle'>{`โต๊ะ ${getTableNo()}`}</div>
                                    <Divider style={{ margin: '0 0 10px 0' }} />
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
                                                { getRole() === 'user'?
                                                <Radio value='credit' ><div className='text'>บัตรเดบิต/เครดิต</div></Radio>
                                                : null
                                                }
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item >
                                <Script
                                    url="https://cdn.omise.co/omise.js"
                                    onLoad={handleLoadScript}
                                />
                                <SentMenuButton />
                                <ModalThanks isShowThanksMadal={isShowThanksMadal} setIsShowThanksModal={setIsShowThanksModal} point={point} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            }
        </>
    )
}

export default Order