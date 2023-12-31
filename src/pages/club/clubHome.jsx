import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import ClubImagesPage from '../../components/club/clubImagesPage'
import ClubHead from '../../components/club/clubHead'
import { clubMemberLogin } from '../../store/slice/clubMembers'
import ClubHistoryPage from '../../components/club/clubHistoryPage'
import UpcomingRidePage from '../../components/club/upcomingRidePage'
import RidersBody from '../../components/club/riders'
import errorFunction from '../../helpers/erroHandling'

function ClubHome() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState('images')
  const { token } = useSelector((store) => store.User)
  const [club, setClub] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    axiosInstance.get(`/club/home/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const role = res.data.role
      const clubToken = res.data.token
      const clubId = res.data.clubId
      dispatch(clubMemberLogin({ role, clubToken, clubId }))
      setClub(res.data.club)
    }).catch((err) => {
      errorFunction(err,navigate)
    })

    return ()=>{
      localStorage.removeItem('rides');
      localStorage.removeItem('currentRides');
      localStorage.removeItem('riders');
    }
  }, [])
  return (
    <div><Toaster toastOptions={{ duration: 4000 }} />{club ? <div><ClubHead setPage={setPage} page={page} club={club} />{
      page == 'images' ? <ClubImagesPage /> : page == 'history' ? <ClubHistoryPage /> : page == 'trips' ? <UpcomingRidePage /> : page == 'riders' ? <RidersBody /> : ''
    }</div> : ''}</div>
  )
}

export default ClubHome