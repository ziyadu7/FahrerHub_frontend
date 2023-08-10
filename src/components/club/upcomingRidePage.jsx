import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import RideCard from './rideCard'
import '../../assets/css/club/upcomingRides.css'
import Loader from '../user/loader'
import CreateRideFrom from './createRideFrom'

function UpcomingRides() {

  const { clubToken } = useSelector((store) => store.ClubMember)

  const [rides, setRides] = useState([])
  const [loader, setLoader] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/club/getRides', {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setRides(res.data.rides)
      setLoader(false)
    }).catch((err) => {
      if (err.response.status === 404) {
        navigate('/serverError')
      } else if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }, [refresh])



  return (
    <div className='bg-[url(https://wallpapercave.com/wp/wp3647900.jpg)] capitalize bg-fixed min-h-screen'>
      <Toaster toastOptions={3000} />
      {loader ? <Loader colour={'white'} /> : <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <CreateRideFrom refresh={refresh} setRefresh={setRefresh} />
        </dialog>
        <div className='flex text-white  justify-between pt-4 px-4'>
          <h1 className='text-3xl font-extrabold'>Upcoming Rides</h1>
          <h1 className='cursor-pointer  hover:text-blue-600' onClick={() => window.my_modal_5.showModal()}>Create new ride</h1>
        </div>
        <div className='justify-between px-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3 mx-auto lg:max-w-7xl md:items-center md:px-8'>
          {rides.length != 0 ? rides.map((ride) => (
            <RideCard key={ride._id} ride={ride} isUpcoming={true} navigate={navigate} />
          )) : <div className='text-white flex justify-center items-center w-screen'>
            Currently no rides available
          </div>}
        </div></>}
    </div>
  )
}

export default UpcomingRides