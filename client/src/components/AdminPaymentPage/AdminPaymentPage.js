import React from 'react';
import PaymentContent from '../../containers/AdminPayment/PaymentContent';

function AdminPaymentPage(props) {

  const adminContentPadding = () => {
    if (!props.isHideSidebar){
      return '79px'
    }
    return '256px'
  }

  return (
    <div className='adminPage'>
      <div style={{ paddingLeft: adminContentPadding() }} className='adminContentContainer'>
        <PaymentContent />
      </div>
    </div>
  )
}

export default AdminPaymentPage;
