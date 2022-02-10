import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Image, Button, notification } from 'antd'
import MenuCreate from './MenuCreate';
import MenuEdit from './MenuEdit';
import axios from '../../config/axios';
import Delete from '../../assets/Delete.png'
import Plus from '../../assets/Plus.png'


function ManageMenuContent() {
  const [foodList, setFoodList] = useState([])
  const [isShowCreate, setIsShowCreate] = useState(true)
  const [editID, setEditID] = useState('')

  const columns = [
    {
      title: 'ภาพอาหาร',
      dataIndex: 'picture',
      key: 'picture',
      render: link => (<Image className='foodImageAdmin' src={link} />)
    },
    {
      title: 'ชื่ออาหาร',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'category',
      key: 'category',
      filters: [
        {
          text: 'เมนูแนะนำ',
          value: 'เมนูแนะนำ',
        },
        {
          text: 'อาหารคาว',
          value: 'อาหารคาว',
        },
        {
          text: 'ของหวาน',
          value: 'ของหวาน',
        },
        {
          text: 'เครื่องดื่ม',
          value: 'เครื่องดื่ม',
        },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'มีสินค้า',
          value: 'มีสินค้า',
        },
        {
          text: 'สินค้าหมด',
          value: 'สินค้าหมด',
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: text => {
        if (text === 'สินค้าหมด') {
          return (<p style={{ color: 'red' }}>สินค้าหมด</p>)
        } else {
          return 'มีสินค้า'
        }
      }
    },
    {
      title: 'แก้ไข',
      key: 'edit',
      render: (text, record) => (
        <Button
          type='text'
          className='buttonEdit'
          onClick={() => onclickEditFoodList(record.id)}
        >
          แก้ไข
        </Button>
      )
    },
    {
      title: 'ลบ',
      key: 'delete',
      render: (text, record) => (
        <Button
          type='text'
          onClick={() => deleteFoodList(record.id)}
        >
          <Image src={Delete} className='iconSmall' preview={false} />
        </Button>
      )
    },
  ]

  useEffect(() => {
    fetchFoodList()
  }, [])

  const fetchFoodList = async () => {
    const response = await axios.get('/manage_menu')
    const newFood = [...response.data]
    //change 'id' to 'key' for uniqe in antd <Table/>
    newFood.forEach(item => {
      item.key = item.id
    })
    setFoodList(newFood)
    console.log(newFood)
  }

  const deleteFoodList = async (id) => {
    await axios.delete(`/manage_menu/${id}`)
    .then(res => {
      notification.success({
        message: 'ลบรายการอาหารสำเร็จ'
      })
      fetchFoodList()
    })
    .catch(err => {
      notification.error({
        message: 'ลบไม่สำเร็จ กรุณาลองอีกครั้ง'
      })
      console.log(err)
    })
    
  }

  const onclickEditFoodList = (id) => {
    setEditID(id)
    setIsShowCreate(false)
  }

  const onClickAddMenu = () => {
    setIsShowCreate(true)
    setEditID('')
  }

  return (
    <Row className='adminContentContainer'>
      <Col span={17} className='adminContentBox'>
        <Row justify='center' className='itemOut'>
          <Col span={12}>
            <div className='titleTable'>จัดการรายการอาหาร</div>
          </Col>
          <Col span={12}>
            <Row justify='end'>
              <Col span={8} className='itemSide'>
                <Button
                  type='text'
                  className='buttonCreateFood'
                  onClick={onClickAddMenu}
                >
                  <Image src={Plus} className='iconSmall' preview={false} />
                  เพิ่มเมนู
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={24}>
            <Table
              dataSource={foodList}
              columns={columns}
              size='small'
              pagination={{ pageSize: 10 }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={6} className='adminContentBox' style={{height:'100vh'}}>
        {isShowCreate ? <MenuCreate fetchFoodList={fetchFoodList} /> : <MenuEdit editID={editID} fetchFoodList={fetchFoodList} />}
      </Col>
    </Row>
  )
}

export default ManageMenuContent;
