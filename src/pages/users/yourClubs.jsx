import React from 'react'
import NavBar from '../../components/user/navBar'
import YourClubPage from '../../components/user/yourClubPage'
import { Toaster } from 'react-hot-toast'

function YourClubs() {
  return (
    <div><Toaster toastOptions={3000}/><NavBar/><YourClubPage/></div>
  )
}

export default YourClubs