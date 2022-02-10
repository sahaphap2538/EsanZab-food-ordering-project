import React from 'react';
import ManageMenuContent from '../../containers/AdminManageMenu/ManageMenuContent';

function AdminManageMenuPage(props) {

  const adminContentPadding = () => {
    if (!props.isHideSidebar) {
      return '79px'
    }
    return '256px'
  }

  return (
    <div className='adminPage'>
      <div style={{ paddingLeft: adminContentPadding() }} className='adminContentContainer'>  
        <ManageMenuContent />
      </div>
    </div>)
}

export default AdminManageMenuPage;
