import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import SearchBox from '../user/search'
import Loader from '../user/loader'
import { useNavigate } from 'react-router-dom'

function ClubListPage() {
  const { token } = useSelector((state) => state.SuperAdmin)
  const [clubs, setClubs] = useState()
  const [search, setSearch] = useState('')
  const [reload, setReload] = useState(false)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()


  const blockClub = (clubId, isBlock) => {
    axiosInstance.patch('/admin/blockClub', { clubId, isBlock }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
    }).catch((err) => {
      if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }

  useEffect(() => {
    axiosInstance.get('/admin/clubs', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setClubs(res.data.clubs)
      setLoader(false)
    }).catch((err) => {
      if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }, [reload])
  return (
    <div style={{ width: '95%' }} className=''><Toaster toastOptions={4000} />{loader ? <Loader bg={'white'} colour={'black'} /> : <>
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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-4">
                    image
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {clubs ? clubs.filter((club) => club.clubName.includes(search)).map((club) => {
                  return (
                    <tr key={club._id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{club.clubName}</td>
                      <td className="whitespace-nowrap px-6 py-4">{club.admins[0].admin.name}</td>
                      <td className="whitespace-nowrap px-6 py-4"><img className='sm:w-32 sm:h-28 md:h-36 md:w-52' src={club.logo} alt="" /></td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {club.isBlocked ? <span onClick={() => blockClub(club._id, false)} className='text-green-600 me-1'>Unblock</span> : <span onClick={() => blockClub(club._id, true)} className='text-red-600 px-3 me-1'>Block</span>}
                      </td>
                    </tr>
                  )
                }) :
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td className="whitespace-nowrap px-6 py-4">Mark</td>
                    <td className="whitespace-nowrap px-6 py-4">Otto</td>
                    <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div></>
    }
    </div>
  )
}

export default ClubListPage