import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import RiderCard from './riderCard'
import { BsFillQuestionOctagonFill } from 'react-icons/bs'
import Loader from '../user/loader'
import RouteMap from './map'

function SingleRide() {
  const { rideId } = useParams()
  const [ride, setRide] = useState()
  const [isJoined, setIsJoined] = useState(false)
  const [reload, setReload] = useState(false)
  const { clubToken } = useSelector((state) => state.ClubMember)
  const { userId } = useSelector((state) => state.User)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loader, setReloader] = useState(true)
  const [sure, setSure] = useState(false)
  const [map, setMap] = useState(false)


  const navigate = useNavigate()


  useEffect(() => {
    axiosInstance.get(`/club/singleRide/${rideId}`, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setRide(res.data.ride)
      setReloader(false)
      setSure(res.data.isSure)
      if (res.data.isJoined) {
        setIsJoined(true)
      }
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }, [reload])

  const joinRide = async (rideId, isSure) => {
    axiosInstance.patch('/club/joinRide', { rideId, isSure }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }


  const removeRider = (rideId, userId) => {
    axiosInstance.patch('/club/removeRider', { rideId, userId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }


  const leftRide = (rideId, userId) => {
    axiosInstance.patch('/club/leftRide', { rideId, userId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
    })
  }

  const confirmRide = (rideId, userId) => {
    axiosInstance.patch('/club/confirmRide', { rideId, userId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      {loader ? (
        <div className='h-screen w-full bg-black'>
          <Loader colour={'white'}/>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(https://wallpapercave.com/wp/wp3647900.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
          className={`bg-fixed min-h-screen capitalize`}
        >
          <Toaster toastOptions={3000} />
          <div className='container z-30 mx-auto px-5 lg:px-32 backdrop-blur-sm  flex relative justify-between lg:pt-10 '>
            <div>
              <button onClick={() => navigate(-1)} className='hover:bg-white hover:text-black py-1 text-white rounded-sm px-4 me-1'>
                Back
              </button>
            </div>
            <div>
              {ride?.head._id === userId || isJoined ? (
                <button onClick={() => navigate(`/club/message/${rideId}`)} className='bg-blue-500 text-white rounded-sm px-4 me-1'>
                  Messages
                </button>
              ) : (new Date(ride.startDate) >= new Date() ?
                <button
                  id='deleteButton'
                  data-modal-toggle='deleteModal'
                  type='button'
                  className='block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  onClick={() => setIsModalOpen(true)}
                >
                  Join
                </button> : ''
              )}
              {ride?.head._id !== userId && isJoined && new Date(ride.startDate) >= new Date() ? (
                <div className='dropdown backdrop-blur-sm z-30 menu-dropdown-toggle'>

                  <label tabIndex={0} className='bg-blue-600 py-1 text-white rounded-sm px-4 me-1'>
                    Options
                  </label>
                  <ul tabIndex={0} className='dropdown-content z-50 mt-1 bg-black menu shadow text-white rounded-box w-52'>
                    <li onClick={() => leftRide(ride._id, userId)}>
                      <a>Leave</a>
                    </li>
                    {sure ? '' : (
                      <li onClick={() => confirmRide(ride._id, userId)}>
                        <a>Confirm</a>
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='container backdrop-blur-sm -z-0 mx-auto px-5 py-2 lg:px-32 flex flex-col items-center lg:flex-row relative lg:pt-24  '>
            <img src={ride?.image} className='w-full h-96 -z-0 rounded-lg object-cover' alt='' />
            <div className='bg-blue-500 absolute top-10 h-6 rounded-lg'>
              <div className='flex justify-between gap-1'>
                <p className='text-white text-center'>
                  {ride?.from.split(',')[0].trim() + '-' + ride?.destination.split(',')[0].trim()}
                </p>

              </div>
            </div>
            <div className='justify-between mt-4 lg:mt-0 text-white md:mt-10 px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8'>
              <p className='mb-2'>
                <span className='font-semibold'>Description : </span> {ride.description}
              </p>
            </div>
          </div>

          {isModalOpen && (
            <div tabIndex='-1' aria-hidden='true' className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
              <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
                <div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
                  <button onClick={() => setIsModalOpen(false)} type='button' className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white' data-modal-toggle='deleteModal'>
                    <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                      <path fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd'></path>
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                  <BsFillQuestionOctagonFill className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto' />
                  <p className='mb-4 text-gray-500 dark:text-gray-300'>Are you sure ?</p>
                  <div className='flex justify-center items-center space-x-4'>
                    <button onClick={() => {
                      const isSure = false;
                      joinRide(ride._id, isSure);
                      setIsModalOpen(false);
                    }} data-modal-toggle='deleteModal' type='button' className='py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>
                      Not Sure
                    </button>
                    <button
                      onClick={() => {
                        const isSure = true;
                        joinRide(ride._id, isSure);
                        setIsModalOpen(false);
                      }}
                      type='submit'
                      className='py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
                    >
                      Yes, I'm sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='container mx-auto backdrop-blur-sm '>
            <div className='flex justify-between container mx-auto px-5 py-2 lg:px-32 relative lg:pt-24'>
              <h1 className='text-center text-3xl font-extrabold text-white mt-2'>{map ? 'Route Map' : 'Riders'}</h1>
              <h1 onClick={() => setMap(!map)} className='text-center hover:font-bold text-white mt-2'>{map ? 'Riders' : 'Route Map'}</h1>
            </div>
            {map ? <div>
              <RouteMap startLatitude={ride?.fromLocation?.latitude} startLongitude={ride?.fromLocation?.longitude} endLatitude={ride?.destinationLocation?.latitude} endLongitude={ride?.destinationLocation?.longitude} />
            </div> : <div className='justify-center container px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 mx-auto lg:max-w-6xl md:items-center md:px-8'>
              {ride?.riders.map((rider) => (
                <RiderCard userId={userId} ride={ride} rider={rider} removeRider={removeRider} />
              ))}
            </div>}
          </div>
        </div>
      )}

    </>
  )
}

export default SingleRide