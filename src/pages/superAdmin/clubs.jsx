import React from 'react'
import ClubListPage from '../../components/superAdmin/clubList'
import SideBar from '../../components/superAdmin/sideBar'

function ClubList() {
  return (
    <div className='flex'>
        <SideBar/><ClubListPage/>
    </div>
  )
}

export default ClubList