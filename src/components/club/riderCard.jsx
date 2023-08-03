import React from 'react'

function RiderCard(props) {
  const rider = props.rider
  const removeRider = props.removeRider
  const ride = props.ride
  const userId = props.userId
  return (
    <div className='bg-slate-700 rounded-sm p-2 capitalize'>
      <div className='relative  flex justify-center'>
        <img className='h-40 sm:h-60 md:h-72 w-3/4 sm:w-full' src={rider.rider?.profileImage ? rider.rider?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="" />
        <div className='bg-blue-500 absolute -bottom-1 h-6 w-3/4'>
          <p className='text-white text-center'>{rider.rider.name}</p>
        </div>
      </div>
      <p className='text-slate-400 text-center mt-1 overflow-hidden'>Phone : {rider.rider.phone}</p>
      <div className='flex justify-between p-2'>
        {ride?.head._id === userId ? <button onClick={() => removeRider(ride._id, rider.rider._id)} className='bg-red-600 rounded-md text-white px-1'>Remove</button> : ''}
      </div>
    </div>
  )
}

export default RiderCard