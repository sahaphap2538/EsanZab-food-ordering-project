import React from 'react';
import { Menu, Image } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import Order from '../../assets/Order.png'
import Payment from '../../assets/Payment.png'
import ManageFood from '../../assets/ManageFood.png'
import Power from '../../assets/Power.png'
import styles from './SidebarAdmin.module.css'

function SidebarAdmin(props) {
    const currentPath = useLocation().pathname
    const navigate = useNavigate()

    const onClickSidebar = (e) => {
        navigate(e.key)
    }

    return (
        <Menu
            className='sidebar'
            style={{ top: '50px' }}
            defaultSelectedKeys={[currentPath]}
            mode='inline'
            inlineCollapsed={!(props.isHideSidebar)}
            onClick={onClickSidebar}
        >
            <Menu.Item
                key='/admin_ordering'
                icon={<Image src={Order} className='iconSidebar' preview={false}/>}
            >
                <p className={styles.text}>การสั่งอาหาร</p>
            </Menu.Item>
            <Menu.Item
                key='/admin_payment'
                icon={<Image src={Payment} className='iconSidebar' preview={false} />}
            >
               <p className={styles.text}>การชำระเงิน</p>
            </Menu.Item>
            <Menu.Item
                key='/admin_managemenu'
                icon={<Image src={ManageFood} className='iconSidebar' preview={false} />}
            >
                <p className={styles.text}>จัดการรายการอาหาร</p>
            </Menu.Item>
            <Menu.Item
                key='/admin_login'
                icon={<Image src={Power} className='iconSidebar' preview={false} />}
            >
                <p className={styles.text}>ออกจากระบบ</p>
            </Menu.Item>
        </Menu>
    )
}

export default SidebarAdmin;
