import React from 'react'
import Home from '../../components/superAdmin/home'
import SideBar from '../../components/superAdmin/sideBar'

function SuperAdminHome() {
  return (
    <div className='flex'>
      <SideBar />
       <Home/>
    </div>
    
  )
}

export default SuperAdminHome