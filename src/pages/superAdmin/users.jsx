import React from 'react'
import SideBar from '../../components/superAdmin/sideBar'
import UserManagement from '../../components/superAdmin/userManagement'
import { Toaster } from 'react-hot-toast'

function Users() {
  return (
    <div className='flex'><Toaster toastOptions={3000}/><SideBar/><UserManagement/></div>
  )
}

export default Users