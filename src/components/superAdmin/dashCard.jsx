import React from 'react'
import { FaUsers, FaHashtag } from 'react-icons/fa'
import { RiMotorbikeFill } from 'react-icons/ri'

function DashCard(props) {

  const userCount = props?.userCount
  const bikeCount = props?.bikeCount
  const clubCount = props?.clubCount

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bikeCount ? 'bg-blue-500' : clubCount ? 'bg-green-600' : userCount ? 'bg-slate-700' : ''} rounded-md p-3`}>
            {userCount ? <FaUsers className='text-white' /> : clubCount ? <FaHashtag className='text-white' /> : bikeCount ? <RiMotorbikeFill className='text-white' /> : ''}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{bikeCount ? 'Rent Bike Count' : clubCount ? 'Total club count' : userCount ? 'Total user count' : ''}</dt>
              <dd className="text-2xl font-bold text-gray-900">{bikeCount || clubCount || userCount}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashCard