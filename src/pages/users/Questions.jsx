import React from 'react'
import NavBar from '../../components/user/navBar'
import QAsession from '../../components/user/QAsession'
import '../../assets/css/club/upcomingRides.css'
import { Toaster } from 'react-hot-toast'

function Questions() {
  return (
    <div><Toaster toastOptions={3000}/><NavBar/><QAsession/></div>
  )
}

export default Questions