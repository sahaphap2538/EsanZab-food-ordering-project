import React from 'react'
import { Link } from 'react-router-dom'
import Pass from '../../assets/Pass.png'
import { Modal, Image, Button} from 'antd'
import { useCartContext } from '../../context/CartContext';

function ModalThanks(props) {
    const { cart } = useCartContext()
    return (
        <Modal
            centered
            visible={props.isShowThanksMadal}
            footer={null}
            bodyStyle={{ height: '60vh' }}
            width='90vw'
            onCancel={() => props.setIsShowThanksModal(false)}
            style={{ textAlign: 'center' }}
        >

            <Image src={Pass} width={80} height={80} preview={false} />
            <div className='title' style={{ fontSize: '32px', marginBottom:'15px' }}>ส่งรายการสำเร็จกรุณารอรับอาหารสักครู่ค่ะ</div>
            <div className='text' style={{ fontSize: '24px' }}>คุณได้แต้มสะสมเพิ่ม</div>
            <div className='title' style={{ fontSize: '72px',color: '#FA4A0C' }}>{props.point}</div>
        </Modal>
    )
}

export default ModalThanks