import React from 'react'
import '../../assets/css/club/upcomingRides.css'

function DashRentTable(props) {

  const rentDetails = props.rentDetails

  return (
    <div className="px-4 py-5 sm:p-6 disableBar overflow-scroll">
      <h2 className="text-xl font-bold text-gray-900">Rent Details</h2>
      <div className="mt-4 ">
        <table className="min-w-full divide-y  divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rentDetails.length > 0 && rentDetails.map((rent) => (
              <tr key={rent._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.bike.make + ' ' + rent.bike.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(rent.fromDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(rent.toDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashRentTable