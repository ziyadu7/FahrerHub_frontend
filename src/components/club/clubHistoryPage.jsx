import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import RideCard from './rideCard'
import Loader from '../user/loader'
import { useNavigate } from 'react-router-dom'
import { AlertIcon } from '../user/warning'
import errorFunction from '../../helpers/erroHandling'

function ClubHistoryPage() {
  const [rides, setRides] = useState([])
  const { clubToken } = useSelector((state) => state.ClubMember)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const cachedData = localStorage.getItem('rides')
    if (cachedData) {
      setRides(JSON.parse(cachedData));
      setLoader(false)
    }
    axiosInstance.get('/club/rideHistory', {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      if (!cachedData || JSON.parse(cachedData).length !== res?.data?.rides?.length) {
        setRides(res?.data?.rides)
        localStorage.setItem('rides', JSON.stringify(res?.data?.rides));
        setLoader(false)
      }
      // setRides(res?.data?.rides)
    }).catch((err) => {
      errorFunction(err,navigate)
    })
  }, [])
  return (
    <div className='bg-[url(https://wallpapercave.com/wp/wp3647900.jpg)] capitalize bg-fixed min-h-screen'>
      <Toaster toastOptions={3000} />
      {loader ? <Loader colour={'white'} /> :
        <div className='justify-between px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 mx-auto lg:max-w-7xl md:items-center md:px-8'>
          {rides.length != 0 ? rides.map((ride) => (
            <RideCard key={ride._id} ride={ride} isUpcoming={false} />
          )) : <AlertIcon message={'No rides available'}/>}
        </div>
      }
    </div>
  )
}

export default ClubHistoryPage