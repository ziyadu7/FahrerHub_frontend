import React, {useEffect} from 'react'
import AdminLogin from '../../components/superAdmin/adminLogin'

function SuperAdminLogin() {
  useEffect(()=>{
    console.log('loging')
},[])

  return (
    <AdminLogin/>
  )
}

export default SuperAdminLogin