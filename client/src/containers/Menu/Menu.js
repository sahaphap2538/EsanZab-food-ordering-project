import React from 'react';
import { Row, Col, List, Tabs } from 'antd'

const { TabPane } = Tabs;

function Menu() {

    function callback(key) {
        console.log(key);
    }

  return (
    <Row justify='center'>
        <Col xs={24}>
            <Row justify='space-around'>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab='ทั้งหมด' key='1'>
                        ทั้งหมด
                    </TabPane>
                    <TabPane tab='เมนูแนะนำ' key='2'>
                        เมนูแนะนำ
                    </TabPane>
                    <TabPane tab='อาหารคาว' key='3'>
                        อาหารคาว
                    </TabPane>
                    <TabPane tab='ของหวาน' key='4'>
                        ของหวาน
                    </TabPane>
                    <TabPane tab='เครื่องดื่ม' key='5'>
                        เครื่องดื่ม
                    </TabPane>
                </Tabs>
            </Row>
        </Col>
    </Row>
  )
}

export default Menu;
