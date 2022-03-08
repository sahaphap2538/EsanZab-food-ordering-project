import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../containers/Banner/Banner'
import { FacebookFilled, PhoneFilled } from '@ant-design/icons'
import localStorageTableNo from '../../services/localStorageTableNo';

import { Row, Col } from 'antd'

const { setTableNo } = localStorageTableNo

function HomePage() {
  const { table_no } = useParams()

  const setTableNoInHomePage = () => {
    setTableNo(table_no)
    console.log(table_no)
  }

  useEffect(() => {
    setTableNoInHomePage()
  }, [setTableNo])

  return (
    <>
      <Row className='clientPage'>
        <Col span={24}>
          <Banner />
        </Col>
      </Row>
      <Row
        justify='center'
        style={{
          position: 'absolute',
          bottom: '0',
          backgroundColor: '#FA4A0C',
          height: '90px',
          width: '100%',
          color: 'white'

        }}
      >
        <Col span={23} className='itemIn'>
          <Row justify='center'>
            <Col >
              <div style={{ backgroundColor: 'white', width: '27px', height: '27px' }}>
                <FacebookFilled style={{ fontSize: '28px', color: '#1877F2' }} />
              </div>
            </Col>
            <Col style={{ marginLeft: '10px' }}>
              <div>EsanZab Restaurant</div>
            </Col>
          </Row>
        </Col>

        <Col span={23}>
          <Row justify='center'>
            <Col>
              <PhoneFilled style={{ fontSize: '28px', color: '#1877F2' }} />
            </Col>
            <Col style={{ marginLeft: '10px' }}>
              <div >099-9999999</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default HomePage;
