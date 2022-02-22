import { Row, Col, Button, Image } from 'antd'
import { useCartContext } from '../../context/CartContext'
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import { Dialog } from "@reach/dialog";
import styles from './Menu.module.css'
import Cross from '../../assets/Cross.png'
import localStorageGuestServices from '../../services/localStorageGuestServices'
import localStorageServices from '../../services/localStorageUserServices'

const { getGuestID } = localStorageGuestServices
const { getUserID, getRole } = localStorageServices

function FoodModal() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [foodItem, setFoodItem] = useState({})
    const [counter, setCounter] = useState(1)
    const buttonRef = useRef(null)


    const { cart, cartAction } = useCartContext()
    const { fetchCartData } = cartAction

    const fetchFoodData = async () => {
        await axios.get('/manage_menu')
            .then(res => {
                const foodById = res.data.find(item => item.id === Number(id))
                setFoodItem(foodById)
                console.log(res.data)
                console.log(foodById)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchCartData()
    }, [])

    useEffect(() => {
        fetchFoodData()
    }, [])



    const onDismiss = () => {
        navigate(-1);
    }

    const onClickMinus = () => {
        if (counter === 1) {
            return
        } else {
            setCounter(prev => prev - 1)
        }
    }

    const onClickPlus = () => {
        setCounter(prev => prev + 1)
    }

    const onClickAddFood = async () => {
        let userId;
        if (getRole() === 'user') {
            userId = getUserID()
        } else {
            userId = getGuestID()
        }

        const targetFoodExist = cart.Food.find(item => item.id === Number(id))
        console.log(cart.Food)

        if (targetFoodExist) {
            console.log(targetFoodExist)
            await axios.put('/cart', {
                quantity: counter,
                CartId: userId,
                FoodId: Number(id)
            })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            const targetFood = cart.Food.find(item => item.id === Number(id))
            const oldQuantity = Number(targetFood.Cart_item.quantity)
            const total = Number(cart.total) + (counter - oldQuantity) * Number(foodItem.price)
            console.log(total)

            await axios.put(`/cart/total/${userId}`, {
                total: total
            })
                .then(res => {
                    console.log(res.data)
                    fetchCartData()
                    navigate(-1)
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            console.log(targetFoodExist)
            await axios.post('/cart', {
                quantity: counter,
                CartId: userId,
                FoodId: Number(id)
            })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            const total = Number(cart.total) + (counter * Number(foodItem.price))
            console.log(total)

            await axios.put(`/cart/total/${userId}`, {
                total: total
            })
                .then(res => {
                    console.log(res.data)
                    fetchCartData()
                    navigate(-1)
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }


    if (!foodItem) return null;

    return (
        <Dialog
            aria-labelledby="label"
            onDismiss={onDismiss}
            initialFocusRef={buttonRef}
            className='modal'
        >
            <Row justify='center' style={{ textAlign: 'center' }}>
                <Col span={24}>
                    <Row justify='end'>
                        <Col span={4}>
                            <Button type='text' onClick={onDismiss} ref={buttonRef}>
                                <Image src={Cross} preview={false} className='iconMiddle' />
                            </Button>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col span={24}>
                            <div className='title'>{foodItem.name}</div>
                        </Col>
                        <Col span={24}>
                            <Image src={foodItem.picture} className='imageModal' preview={false} />
                        </Col>
                        <Col span={24}>
                            <div className={styles.description_food} style={{ fontSize: '18px' }}>{`ราคา ${foodItem.price} บาท`}</div>
                        </Col>
                    </Row>
                    <Row justify='space-between' gutter={[8]} className='itemOut'>
                        <Col xs={24} md={10} className='itemOut'>
                            <Row justify='center' gutter={[8]} align='middle' >
                                <Col span={6}  >
                                    <Button
                                        type='text'
                                        className='buttonMain quantityModal'
                                        onClick={onClickMinus}
                                    >
                                        -
                                    </Button>
                                </Col>
                                <Col span={6}  >
                                    <div className='quantityModal' style={{ margin: '0px auto' }}>{counter}</div>
                                </Col>
                                <Col span={6}  >
                                    <Button
                                        type='text'
                                        className='buttonMain quantityModal'
                                        onClick={onClickPlus}
                                    >
                                        +
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={13}>
                            <Button
                                type='text'
                                className='buttonMain text'
                                onClick={onClickAddFood}
                            >
                                เพิ่มอาหาร
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Dialog>
    )
}

export default FoodModal