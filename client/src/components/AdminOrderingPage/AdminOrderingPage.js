import React from 'react';
import OrderingContent from '../../containers/AdminOrdering/OrderingContent';

function AdminOrderingPage(props) {

  const adminContentPadding = () => {
    if (!props.isHideSidebar){
      return '79px'
    }
    return '256px'
  }

  return (
    <div className='adminPage'>
      <div style={{ paddingLeft: adminContentPadding() }} className='adminContentContainer'>
        <OrderingContent/>
      </div>
    </div>
  );
}

export default AdminOrderingPage;
