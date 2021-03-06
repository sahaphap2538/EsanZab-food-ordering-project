import React from 'react'
import Pass from '../../assets/Pass.png'
import { Modal, Image } from 'antd'
import { useCartContext } from '../../context/CartContext';
import { useUserContext } from '../../context/UserContext'

function ModalThanks(props) {
    const { user } = useUserContext()
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
            <div className='title' style={{ fontSize: '32px', marginBottom: '15px' }}>ส่งรายการสำเร็จกรุณารอรับอาหารสักครู่ค่ะ</div>
            <div>
                <span className='text'>คุณได้แต้มสะสมเพิ่ม</span>
                <span className='title' style={{ color: '#FA4A0C' }}>
                    {user.role === 'user' ? `+${Number(cart.total) - Number(cart.discount)}` : '+0'}
                </span>
            </div>
            <div className='text' style={{ fontSize: '24px' }}>
                แต้มสะสมทั้งหมดของคุณ
            </div>
            <div className='title' style={{ fontSize: '48px', color: '#FA4A0C' }}>
                {props.point}
            </div>
        </Modal>
    )
}

export default ModalThanks