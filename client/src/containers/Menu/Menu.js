import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, List, Tabs, Image, Divider } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './Menu.module.css'
import GotoCartButton from './GotoCartButton';
import FoodDefualt from '../../assets/FoodDefualt.png'
import axios from '../../config/axios';
import { useCartContext } from '../../context/CartContext';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} className={styles.site_custom_tab_bar} style={{ ...style }} />
        )}
    </Sticky>
);

function Menu() {
    const location = useLocation()
    const { cart, cartAction } = useCartContext()
    const { fetchCartData } = cartAction

    const [menuData, setMenuData] = useState([])
    const quantityTotal = cart.Food.reduce((prev, current) => prev + Number(current.Cart_item.quantity), 0)

    const fetchMenuData = async () => {
        await axios.get('/cart/food')
            .then(res => {
                console.log(res.data)
                setMenuData([...res.data])
            })
    }

    useEffect(() => {
        fetchCartData()
    }, [])

    useEffect(() => {
        fetchMenuData()
    }, [])

    const layoutGridFoodList = {
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    }

    const foodQuantity = (foodId) => {
        const targetFood = [...cart.Food].find(item => item.id === Number(foodId))
        if (targetFood){
            return <div className='quantityModal quantity'>{targetFood.Cart_item.quantity}</div>
        } else {
            return null
        }
    }
    
    const filterCategoryMenu = (category) => {
        const menu = [...menuData]
        const categoryMenu = menu.filter(item => item.category === category)
        return (
            <Row justify='center'>
                <Col span={23}>
                    <div
                        className='title'
                        style={{ fontSize: '20px', margin: '0px 0px 5px' }}
                    >
                        {category}
                    </div>
                    <List
                        grid={layoutGridFoodList}
                        dataSource={categoryMenu}
                        renderItem={item => (
                            <Link
                                key={item.id}
                                to={`/food/${item.id}`}
                                state={{ backgroundLocation: location }}
                            >
                                <List.Item
                                    key={item.id}
                                    className={styles.list_menu}
                                >
                                    <Row justify='space-between'>

                                        <Col span={20} style={{ margin: '10px 0' }}>
                                            <Row justify='start' gutter={16}>
                                                <Col style={{ marginLeft: '10px' }}>
                                                    {!(item.picture) ?
                                                        <Image src={FoodDefualt} className='foodImage' preview={false}  /> :
                                                        <Image src={item.picture} className='foodImage' preview={false} />}
                                                </Col>
                                                <Col>
                                                    <div className={styles.title_food}>{item.name}</div>
                                                    <div className={styles.description_food}>{`${item.price} บาท`}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={3}>
                                            {foodQuantity(item.id)}
                                        </Col>
                                    </Row>
                                </List.Item>
                            </Link>
                        )}
                    />
                </Col>
            </Row>
        )
    }

    return (
        <>
            <Row justify='center' style={{ marginBottom: '78px' }}>
                <Col span={24}>
                    <Row justify='space-around'>
                        <StickyContainer style={{ width: '100%' }}>
                            <Tabs
                                defaultActiveKey="1"
                                centered
                                tabBarGutter={16}
                                renderTabBar={renderTabBar}
                                className={styles.tabbar}
                            >
                                <TabPane tab='ทั้งหมด' key='1'>
                                    {filterCategoryMenu('เมนูแนะนำ')}
                                    <Divider className='itemIn' />
                                    {filterCategoryMenu('อาหารคาว')}
                                    <Divider className='itemIn' />
                                    {filterCategoryMenu('ของหวาน')}
                                    <Divider className='itemIn' />
                                    {filterCategoryMenu('เครื่องดื่ม')}
                                </TabPane>
                                <TabPane tab='เมนูแนะนำ' key='2'>
                                    {filterCategoryMenu('เมนูแนะนำ')}
                                </TabPane>
                                <TabPane tab='อาหารคาว' key='3'>
                                    {filterCategoryMenu('อาหารคาว')}
                                </TabPane>
                                <TabPane tab='ของหวาน' key='4'>
                                    {filterCategoryMenu('ของหวาน')}
                                </TabPane>
                                <TabPane tab='เครื่องดื่ม' key='5'>
                                    {filterCategoryMenu('เครื่องดื่ม')}
                                </TabPane>
                            </Tabs>
                        </StickyContainer>
                    </Row>
                </Col>
            </Row>
            <GotoCartButton quantityTotal={quantityTotal} />
        </>
    )
}

export default Menu;
