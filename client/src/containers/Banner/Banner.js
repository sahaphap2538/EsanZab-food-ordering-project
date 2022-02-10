import React from 'react';
import Banner1 from '../../assets/Food1.png'
import Banner2 from '../../assets/Food2.png'
import Banner3 from '../../assets/Food3.png'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import { Carousel } from 'react-carousel-minimal'
import styles from './Banner.module.css'

const data = [
    {
        image: Banner1
    },
    {
        image: Banner2
    },
    {
        image: Banner3
    },
]
// 
function Banner() {
    return (
        <Row justify='center' className={styles.Banner}>
            <Col xs={24}>
                <Row>
                   <Carousel
                        data={data}
                        width= '100%'
                        height= '500px'
                        time={5000}
                        automatic={true}
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        style={{
                            textAlign: "center",
                            width:'100%',
                            maxHeight: "500px",
                            margin: "0px auto",
                            marginBottom:'20px'
                          }}
                   />
                </Row>
                <Row justify='center'>
                    <Col xs={22} sm={12}>
                        <Link to='/login'><Button type='text' className='buttonMain'>สั่งอาหารเลย</Button></Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Banner;
