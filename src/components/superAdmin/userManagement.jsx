import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import SearchBox from '../user/search'
import Loader from '../user/loader'
import { useNavigate } from 'react-router-dom'
import Pagination from '../custom/pagination'

function UserManagement() {

  const { token } = useSelector((state => state.SuperAdmin))
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)
  const [loader, setLoader] = useState(true)
  const [skip,setSkip] = useState(0)
  const [totalPage,setTotalPage] = useState(0)
  const [calls,setCalls] = useState(0)

  const navigate = useNavigate()  

  useEffect(() => {
      fetchData()
  }, [reload,skip])

  useEffect(() => {
    if(search.trim()==''){
      setCalls(0)
    }
      setSkip(0)
      let timer = setTimeout(() => {
        fetchData();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };


  }, [search])


  function fetchData() {
    axiosInstance.get(`/admin/users?skip=${skip}&search=${search}&calls=${calls}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if(calls==0||search.trim()!=''){
        setTotalPage(res?.data?.length)
      }
      setCalls(calls+1)
      setUsers(res?.data?.users)
      setLoader(false)
    }).then((err) => {
      if (err?.response.status === 404) {
        navigate('/serverError')
      } else if (err?.response.status == 403) {
        navigate('/accessDenied')
      } else if (err?.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }

  const statusChange = (userId, blocked) => {
    axiosInstance.patch('/admin/userStatus', { userId, blocked }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success(res?.data?.message)
      setReload(!reload)
    }).catch((err) => {
      if (err?.response.status === 404) {
        navigate('/serverError')
      } else if (err?.response.status == 403) {
        navigate('/accessDenied')
      } else if (err?.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }



  return (
    <div style={{ width: '95%' }} className=' ms-5 mt-5 sm:w-auto'>{loader ? <Loader bg={'white'} colour={'black'} /> : <>      <div className="flex justify-end m-2">
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
                    Mail
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {users
                  ? users
                    .filter(
                      (user) =>
                        user.name.toLowerCase().includes(search) ||
                        user.email.toLowerCase().includes(search)
                    )
                    .map((user) => (
                      <tr key={user._id} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.phone || 'Not Provided'}</td>
                        <td onClick={() => statusChange(user._id, user.isBlocked)} className="whitespace-nowrap flex justify-between px-6 py-4">
                          {user.isBlocked ? <span className='text-green-600 me-1'>Unblock</span> : <span className='text-red-700 px-4 me-1'>Block</span>}
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
              <div className='flex justify-center'>
              <Pagination
          totalPage={totalPage}
          skip={skip}
          setSkip={setSkip}
        />
              </div>
          </div>
        </div>
      </div>
    </>
    }    </div>
  )
}

export default UserManagement