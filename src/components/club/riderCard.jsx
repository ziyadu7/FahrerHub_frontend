import React from 'react'

function RiderCard(props) {
  const rider = props.rider
  const removeRider = props.removeRider
  const ride = props.ride
  const userId = props.userId
  return (
    <div className='bg-slate-700 rounded-sm p-2 capitalize'>
      <div className='relative flex justify-center'>
        <img className='h-40 rounded-sm sm:h-60 md:h-72 w-3/4 sm:w-full' src={rider.rider?.profileImage ? rider.rider?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="" />
        <div className='bg-blue-500 rounded-sm absolute -bottom-1 h-6 w-3/4'>
          <p className='text-white text-center' >{rider.rider.name}</p>
        </div>
      </div>
      <a className='text-slate-400 text-center mt-1 overflow-hidden' href={`tel:${rider?.rider?.phone}`}> Phone : {rider?.rider?.phone||'Not Provided'}</a>
      <div className='flex justify-between p-2'>
        {ride?.head._id === userId ? <p onClick={() => removeRider(ride._id, rider.rider._id)} className=' text-red-400 hover:text-red-600 cursor-pointer px-1'>Remove</p> : ''}
      </div>
    </div>
  )
}

export default RiderCard