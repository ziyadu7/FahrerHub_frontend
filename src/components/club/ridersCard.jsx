import React from 'react'
import { useSelector } from 'react-redux'

function RidersCard(props) {

  const rider = props?.rider
  const admin = props?.admin
  return (
    <div className="bg-black bg-opacity-70 relative shadow p-2 rounded-lg capitalize text-white hover:bg-opacity-100">
      <div className="right-0 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
        {rider && rider?.rideCount > 10 ? 'elite' : rider?.rideCount > 5 ? 'proffessional' : rider?.rideCount > 3 ? "intermediate" : rider?.rideCount >= 0 ? 'beginner' : ''}
        {admin && admin?.rideCount > 10 ? 'elite' : admin?.rideCount > 5 ? 'proffessional' : admin?.rideCount > 3 ? "intermediate" : admin?.rideCount >= 0 ? 'beginner' : ''}
      </div>
      {admin ? <div className="left-0 mt-4 rounded-r-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
        Club Admin
      </div> : ''}
      <img
        src="https://images.unsplash.com/photo-1564497717650-489eb99e8d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1963&q=80"
        className="h-32 rounded-lg w-full object-cover"
      />
      <div className="flex justify-center">
        {rider ? <img
          src={rider?.member?.profileImage ? rider?.member?.profileImage : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
          className="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16"
        /> : admin ? <img
          src={admin?.admin?.profileImage ? admin?.admin?.profileImage : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
          className="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16"
        /> : ''}
      </div>
      <div className="py-2 px-2">
        <div className="font-bold font-title text-center">
          {rider && rider?.member?.name}
          {admin && admin?.admin?.name}
        </div>
        <div className="text-sm font-light text-center my-2">
          Participated Rides : {rider ? rider?.rideCount : admin ? admin?.rideCount : ''}
        </div>
      </div>

    </div>
  )
}

export default RidersCard