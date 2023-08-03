import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import SearchBox from '../user/search'

function RentsPage() {

  const { token, name } = useSelector((store) => store.SuperAdmin)
  const adminName = name
  const [rents, setRents] = useState()
  const [search, setSearch] = useState('')

  useEffect(() => {
    axiosInstance.get('/admin/rents', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setRents(res.data.rents)
    }).catch((err) => {
      toast.error(err.response.data.errMsg)
    })
  }, [])

  const sendMail = (name, email, bikeId, rent, adminName) => {
    axiosInstance.post('/admin/sentRentMail', { name, email, bikeId, rent, adminName }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.error(res.data.message)
    }).catch((err) => {
      toast.error(err)
    })
  }

  return (
    <div style={{ width: '95%' }} className=' ms-5 mt-5 sm:w-auto'>
      <div className="flex justify-end m-2">
        <SearchBox search={search} setSearch={setSearch} />

      </div>
      <div className='grid grid-cols-1 '>
        <div className="inline-block py-2 pe-4">
          <div className="overflow-auto">
            <table className="w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Bike
                  </th>
                  <th scope="col" className="px-6 py-4">
                    User
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
                    .filter(
                      (rent) =>
                        rent.bike.make.toLowerCase().includes(search) ||
                        rent.bike.model.toLowerCase().includes(search) ||
                        rent.user.name.toLowerCase().includes(search)
                    )
                    .map((rent, index) => (
                      <tr key={index} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{rent.bike.make + ' ' + rent.bike.model}</td>
                        <td className="whitespace-nowrap px-6 py-4">{rent.user.name}</td>
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
      </div>
    </div>
  )
}

export default RentsPage