import React from 'react';
import { Button, Row, Col, Image } from 'antd'
import Vector from '../../assets/Vector.png'
import Bell from '../../assets/Bell.png'
import SidebarAdmin from './SidebarAdmin'
import localStorageUserServices from '../../services/localStorageUserServices';
import styles from './NavbarAdmin.module.css'

const { getUserName } = localStorageUserServices

function NavbarAdmin(props) {
  const adminName = getUserName()

  const onClickShowSidebar = () => {
    props.setIsHideSidebar(prev => !prev)
  }

  return (
    <Row>
      <Col span={24}>
        <Row className='navbar'>
          <Col span={6}>
            <Button type='text' className='buttonMain' style={{ textAlign: 'start' }} onClick={onClickShowSidebar}>
              <Image src={Vector} className='iconHeader' preview={false} />
            </Button>
          </Col>
          <Col span={12}>
            <p className={styles.title}>
              EsanZab
            </p>
          </Col>
          <Col span={6}>
            <Row >
              <Col span={12}>
                <Button type='text' className='buttonMain'>
                  <Image src={Bell} className='iconHeader' preview={false} />
                </Button>
              </Col>
              <Col span={12}>
                <p className='text' style={{ color: 'white',textAlign:'center',marginTop:'16px' }}>{adminName}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <SidebarAdmin isHideSidebar={props.isHideSidebar} />
    </Row>
  )
}

export default NavbarAdmin;

