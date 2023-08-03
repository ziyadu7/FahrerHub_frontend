import React from 'react'

function RentHistory(props) {
    const rents = props?.rents
    const setShowRent = props?.setShowRent
  return (
    <div className='grid grid-cols-1 card p-2 rounded-md bg-opacity-80 bg-white'>
        <div className="inline-block py-2 pe-4">
          <div className="overflow-auto">
            <table className="w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Bike
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-4">
                    From
                  </th>
                  <th scope="col" className="px-6 py-4">
                    To
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rents
                  ? rents
                    .map((rent, index) => (
                      <tr key={index} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{rent.bike.make + ' ' + rent.bike.model}</td>
                        <td className="whitespace-nowrap px-6 py-4">{rent.amount}</td>
                        <td className="whitespace-nowrap px-6 py-4">{new Date(rent.fromDate).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4">{new Date(rent.toDate).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap flex justify-between px-6 py-4">
                          {rent.returned ? <span className='text-indigo-800 ms-1'>Returned</span> : new Date() > new Date(rent.toDate) ? <span onClick={() => sendMail(rent.user.name, rent.user.email, rent.bike._id, rent, adminName)} className='text-red-700 me-1'>Send Mail</span> : <span className='text-green-600 me-1'>Booked</span>}
                        </td>
                      </tr>
                    ))
                  : (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td className="whitespace-nowrap px-6 py-4">Mark</td>
                      <td className="whitespace-nowrap px-6 py-4">Otto</td>
                      <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <h1 onClick={()=>setShowRent(false)} className='text-end pe-3 text-blue-700 hover:text-blue-900'>Back</h1>
      </div>
  )
}

export default RentHistory