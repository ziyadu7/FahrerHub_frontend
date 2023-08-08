import React, { useState } from 'react'
import ClubAdminHead from '../../components/clubAdmin/clubAdminHead'
import ClubMembersManage from '../../components/clubAdmin/clubMembersManage'
import ClubAddImage from '../../components/clubAdmin/clubAddImage'
import ClubShowRides from '../../components/clubAdmin/clubShowRides'

function ClubAdminHome(props) {

  const [page,setPage] = useState('addImage')
  const club = props.club 
  return (
    <div>
      <ClubAdminHead setPage = {setPage} page={page} club = {club}/>
      {page=='members'?<ClubMembersManage/>:''}
      {page=='addImage'?<ClubAddImage/>:''}
      {page=='trips'?<ClubShowRides/>:''}
    </div>
  )
}

export default ClubAdminHome