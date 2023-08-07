import React from 'react'

function RideCard(props) {
  const navigate = props.navigate
  const ride = props.ride
  const isUpcoming = props.isUpcoming
  return (
    <div key={ride._id} onClick={() => { isUpcoming ? navigate(`/club/singleRide/${ride._id}`) : '' }} className='bg-slate-700 p-2 hover:scale-105 transition-transform cursor-pointer'>
      <div className='relative '>
        <img className='h-72 w-full' src={ride.image} alt="" />
        <div className='bg-blue-500 absolute -bottom-1 h-6 w-3/4'>
          <p className='text-white text-center'>{ride.from.split(',')[0] + '-' + ride.destination.split(',')[0] }</p>
        </div>
      </div>
      <p className='text-slate-400 mt-1 line-clamp-2'>{ride.description}</p>
      <div className='flex justify-between mt-1'>
        <p className='text-white mt-1'>Organizer : {ride.head.name}</p>
        <h1 className='text-white'>{new Date(ride.startDate).toLocaleDateString()}</h1>
      </div>
      <div className='flex justify-between mt-1'>
        <p className='text-white mt-1'>Max Riders : {ride.maxRiders}</p>
        <h1 className='text-white'> {new Date(ride.endDate).toLocaleDateString()}</h1>
      </div>
    </div>
  )
}

export default RideCard