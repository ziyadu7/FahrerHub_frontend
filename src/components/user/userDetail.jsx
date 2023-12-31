import React, { useState } from 'react'
import '../../assets/css/club/upcomingRides.css'
import RentHistory from './rentHistory'
import axiosInstance from '../../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import errorFunction from '../../helpers/erroHandling'

function UserDetail(props) {

  const user = props.user
  const setEdit = props.setEdit
  const adminClubs = props.adminClubs
  const memberClubs = props.memberClubs
  const rides = props.rides
  const rentHistory = props.rentHistory
  const returnBike = props.returnBike
  const setShowBike = props.setShowBike
  const setChange = props.setChange
  const change = props.change

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.User)

  const [showRent, setShowRent] = useState(false)

  const cancelBooking = (rentId,bikeId)=>{
      axiosInstance.patch('user/cancelBooking',{rentId,bikeId},{
        headers: {
          authorization: `Bearer ${token}`
      }
      }).then(res=>{
        toast.success(res.data.message)
        setChange(!change)
      }).catch(err=>{
        errorFunction(err,navigate)
      })
  }

  return (
    <div className='flex justify-center items-center disableBar backdrop-blur-sm w-full h-full'>
      <div className="container justify-center py-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 col-span-2">
            <div className=''>
              <div className="card rounded-md bg-opacity-80 bg-white mb-4">
                <div className='flex justify-end p-2'>
                  <a onClick={() => setEdit(true)} className='bg-transparen cursor-pointer text-blue-500 font-semibold hover:text-blue-700'>Edit Profile</a>
                </div>
                <div className="card-body text-center">
                  <img src={user.profileImage ? user.profileImage : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"} alt="avatar" className="rounded-md h-40 w-40 mx-auto" />
                  <h5 className="my-3">{user.name}</h5>
                  <div>
                    <button onClick={() => setShowBike(true)} className='bg-transparent hover:bg-slate-600 text-black font-semibold hover:text-white py-1 mb-2 px-2 border border-black rounded'>Show Bike</button>
                  </div>
                </div>
              </div>
              <div className="card bg-opacity-80 grid grid-cols-1 sm:grid-cols-2 rounded-md bg-white">
                <div className="card-body p-0">
                  <h1 className='mt-2 ms-2 text-black font-bold text-center'>Admin of Clubs</h1>
                  <ul className="list-reset rounded-3">
                    {adminClubs.length > 0 ? adminClubs.map((club) => {
                      return (
                        <li key={club._id} className="flex items-center justify-between p-3">
                          <i className="fas fa-globe fa-lg text-yellow-500"></i>
                          <p className="mb-0 text-center">{club.clubName}</p>
                        </li>
                      )
                    }) : <li className='flex items-center justify-between p-3 text-center'><p className="mb-0 text-center">No Clubs</p></li>}
                  </ul>
                </div>
                <div className="card-body p-0">
                  <h1 className='mt-2 ms- text-black font-bold text-center'>Member of Clubs</h1>
                  <ul className="list-reset rounded-3">
                    {memberClubs.length > 0 ? memberClubs.map((club) => {
                      return (
                        <li key={club._id} className="flex items-center justify-between p-3">
                          <i className="fas fa-globe fa-lg text-yellow-500"></i>
                          <p className="mb-0 text-center">{club.clubName}</p>
                        </li>
                      )

                    }) : <li className='flex items-center justify-between p-3 text-center'><p className="mb-0 text-center">No Clubs</p></li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 col-span-3">
            <div className="card p-2 rounded-md bg-opacity-80 bg-white mb-4">
              <div className="card-body">
                <div className="flex items-center">
                  <p className="w-1/3 font-semibold">Full Name</p>
                  <p className="text-black mb-0">{user.name}</p>
                </div>
                <hr className="my-2" />
                <div className="flex items-center">
                  <p className="w-1/3 lowercase font-semibold">Email</p>
                  <p className="text-black mb-0">{user.email}</p>
                </div>
                <hr className="my-2" />
                <div className="flex items-center">
                  <p className="w-1/3 font-semibold">Phone</p>
                  <p className="text-black mb-0">{user.phone}</p>
                </div>
                <hr className="my-2" />
                <div className="flex items-center">
                  <p className="w-1/3 font-semibold">Wallet</p>
                  <p className="text-black mb-0">{user.wallet}</p>
                </div>
              </div>
            </div>
            {showRent?<RentHistory setShowRent={setShowRent} rents={rentHistory}/>:<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-2 rounded-md bg-opacity-80 bg-white">
                <div className="card-body">
                  <p className="mb-4 text-black font-bold text-center">Participated Rides
                  </p>
                  {rides.map((ride) => (
                    <p key={ride._id} className="mb-1 text-sm text-center"> {ride?.from.split(',')[0].trim() + '-' + ride?.destination.split(',')[0].trim()}</p>
                  ))}

                </div>
              </div>
              <div className="card p-2 rounded-md bg-opacity-80 bg-white">
                <div className="card-body">
                  <h1 className="mb-4 text-black font-bold text-center">
                    Rented Bikes
                  </h1>
                  {rentHistory && rentHistory.map((rent, i) => {
                    if (i < 5) {
                      return (
                        <div key={rent._id}>
                          <div className='flex'>
                            <img src={rent.bike.images[0]} alt="" className='w-10 rounded-lg' />
                            <p className="font-semibold">{rent.bike.make + ' ' + rent.bike.model}</p>
                          </div>
                          <div className='flex justify-end'>
                            <p>Status : {rent.returned ? <span className='text-indigo-800 ms-1 '>Returned</span> : new Date() > new Date(rent.toDate) ? <span className='text-red-700 me-1' onClick={() => returnBike(rent._id, rent.bike._id)}>Return</span> :new Date() < new Date(rent.fromDate)? <span onClick={()=>cancelBooking(rent._id, rent.bike._id)} className='text-red-700 me-1'>Cancel</span> : <span className='text-green-600 me-1'>Currently Using</span>}</p>
                          </div>
                        </div>
                      )
                    }

                  })}
                  <h1 className='text-end pe-3 text-blue-700 cursor-pointer hover:text-blue-900' onClick={()=>setShowRent(true)}>Rent History</h1>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail