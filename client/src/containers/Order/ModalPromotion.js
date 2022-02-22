import React from 'react'
import { Link } from 'react-router-dom'
import Close from '../../assets/Close.png'
import { Modal, Image, Button} from 'antd'

function ModalPromotion(props) {
    return (
        <Modal
            centered
            visible={props.isShowPromotionMadal}
            footer={null}
            bodyStyle={{ height: '60vh' }}
            width='90vw'
            onCancel={() => props.setIsShowPromotionModal(false)}
            style={{ textAlign: 'center' }}
        >

            <Image src={Close} width={80} height={80} preview={false} />
            <p className='title' style={{ fontSize: '32px' }}>ขออภัยคุณใช้ส่วนลดไม่ได้ต้องเข้าสู่ระบบเพื่อใช้ส่วนลด</p>
            <Link to='/login'>
                <Button
                    className='buttonMain'
                    type='text'
                    style={{ position: 'absolute', bottom: '15px', left: '5%', width: '90%' }}
                >
                    เข้าสู่ระบบ
                </Button>
            </Link>
        </Modal>
    )
}

export default ModalPromotion