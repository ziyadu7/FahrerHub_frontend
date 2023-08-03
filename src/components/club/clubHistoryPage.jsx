import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import RideCard from './rideCard'
import Loader from '../user/loader'

function ClubHistoryPage() {
  const [rides, setRides] = useState([])
  const { clubToken } = useSelector((state) => state.ClubMember)
  const [loader, setLoader] = useState(true)


  useEffect(() => {
    axiosInstance.get('/club/rideHistory', {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setRides(res.data.rides)
      setLoader(false)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }, [])
  return (
    <div className='bg-[url(https://wallpapercave.com/wp/wp3647900.jpg)] capitalize bg-fixed min-h-screen'>
      <Toaster toastOptions={3000} />
      <div className='justify-between px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 mx-auto lg:max-w-7xl md:items-center md:px-8'>
        {rides.length != 0 ? rides.map((ride) => (
          <RideCard key={ride._id} ride={ride} isUpcoming={false} />
        )) : <div className='text-white flex justify-center items-center w-screen'>
        </div>}
      </div>
      {loader ? <Loader /> : ''}
    </div>
  )
}

export default ClubHistoryPage