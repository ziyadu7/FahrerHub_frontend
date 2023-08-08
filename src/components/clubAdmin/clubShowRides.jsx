import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import Loader from '../user/loader'

function ClubShowRides() {
  const [rides, setRides] = useState([])
  const [reason, setReason] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [blockRideId, setBlockRideId] = useState('')
  const [reload, setReload] = useState(false)
  const { clubToken } = useSelector((store) => store.ClubMember)
  const [loader,setLoader] = useState(true)

  useEffect(() => {
    axiosInstance.get(`/club/getRides?admin=${clubToken}`, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setLoader(false)
      setRides(res.data.rides)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }, [reload])

  const blockRide = () => {
    const rideId = blockRideId
    axiosInstance.post('/clubAdmin/blockRide', { reason, email, name, rideId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
      setEmail('')
      setName('')
      setBlockRideId('')
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }


  const unBlockRide = (rideId) => {
    axiosInstance.patch('/clubAdmin/unBlockRide', { rideId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setReload(!reload)
      toast.success(res.data.message)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }


  const cancelRide = (rideId) => {
    axiosInstance.delete('/clubAdmin/cancelRide', { rideId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setReload(!reload)
      toast.success(res.data.message)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })

  }

  const allowRide = (rideId) => {
    axiosInstance.patch('/clubAdmin/allowRide', { rideId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setReload(!reload)
      toast.success(res.data.message)
    }).catch((err) => {
      if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }


  return (
    <div className='bg-slate-800'>
      {loader?<Loader colour={'white'} />: <>
      <Toaster toastOptions={3000} />
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Write reason for canceling the ride</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-3">
              <div className="mt-2">
                <textarea
                  type="text"
                  onChange={(e) => setReason(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
          <div className="modal-action">
            <button className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4">
              Close
            </button>
            <button
              onClick={() => blockRide()}
              className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4"
            >
              Confirm
            </button>
          </div>
        </form>
      </dialog>
      <div className='justify-between px-4 grid grid-cols-1 md:grid-cols-4 gap-3 pt-8 pb-8 mx-auto lg:max-w-7xl md:items-center md:px-8'>
        {rides.length != 0 ? rides.map((ride) => (
          <div className='bg-slate-700 p-2'>

            <div className='relative '>
              <img className='h-72 w-full' src={ride.image} alt="" />
              <div className='bg-blue-500 absolute -bottom-1 h-6 w-3/4'>
                <p className='text-white text-center'>{ride.from.split(',')[0] + '-' + ride.destination.split(',')[0] }</p>
              </div>
            </div>
            <div className=' mt-1 flex justify-between'>
              <div>
                <p className='text-white mt-1'>Head:{ride.head.name}</p>
                <h1 className='text-white'>{new Date(ride.startDate).toLocaleDateString()}</h1>
              </div>
              <div className='flex place-items-end'>
                {ride.isAccepted == false ? <button onClick={() => allowRide(ride._id)} className='bg-blue-600 rounded-md text-white px-2 py-1'>Allow</button> : ride.isBlocked ? new Date(new Date(ride.startDate).setDate(new Date(ride.startDate).getDate() - 3)).toLocaleDateString() > new Date().toLocaleDateString() ? <button onClick={() => unBlockRide(ride._id)} className='bg-green-600 rounded-md text-white px-2 py-1'>Unblock</button> : <button onClick={() => cancelRide(ride._id)} className='bg-red-600 rounded-md text-white px-2 py-1'>Cancel</button> : new Date(new Date(ride.startDate).setDate(new Date(ride.startDate).getDate() - 7)).toLocaleDateString() >= new Date().toLocaleDateString() ? <button onClick={
                  () => {
                    window.my_modal_6.showModal(),
                    setEmail(ride.head.email)
                    setName(ride.head.name)
                    setBlockRideId(ride._id)
                  }
                } className='bg-yellow-300 rounded-md text-white px-2 py-1'>Block</button> : ''}
              </div>
            </div>
          </div>
        )) : <div className='text-white '>
          <h1 className='font-semibold text-center text-3xl'>Currently no rides available!!</h1>
        </div>}
      </div>
      </>}</div>
  )
}

export default ClubShowRides