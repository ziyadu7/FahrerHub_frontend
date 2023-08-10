import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import Loader from '../user/loader'
import { useNavigate } from 'react-router-dom'

function ClubMembersManage() {
  const { clubToken } = useSelector((store) => store.ClubMember)
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState('')
  const [change, setChange] = useState(false)
  const [loader,setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/clubAdmin/getMembers', { headers: { authorization: `Bearer ${clubToken}` } }).then((res) => {
      setMembers(res.data.members)
      setLoader(false)
    }).catch((err) => {
      if(err.response.status==500){
        navigate('/serverError')
    }else if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }, [change])

  const removeMember = async (id) => {
    axiosInstance.patch('/clubAdmin/removeMember', { id }, { headers: { authorization: `Bearer ${clubToken}` } }).then((res) => {
      toast.success(res.data.message)
      setChange(!change)
    }).catch((err) => {
      if(err.response.status==500){
        navigate('/serverError')
    }else if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }

  const changeStatus = (userId, accepted) => {
    axiosInstance.patch('/clubAdmin/requestManage', { accepted, userId }, { headers: { authorization: `Bearer ${clubToken}` } }).then((res) => {
      toast.success(res.data.message)
      setChange(!change)
    }).catch((err) => {
      if(err.response.status==500){
        navigate('/serverError')
    }
    })
  }

  return (
    <div className='bg-gradient-to-b from-cyan-950'><Toaster toastOptions={3000} />
    {loader?<Loader colour={'white'} />: <div className='grid grid-cols-1 pt-8 sm:p-5'>
        <div className="flex justify-end m-2">
          <div className='flex'>
            <label className="sr-only">Search</label>
            <div className="">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            </div>
            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div className="inline-block p-10 bg-slate-200 bg-opacity-50">
          <div className="overflow-auto">
            <table className="w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.length != 0
                  ? members.filter((member) => member.member.name.toLowerCase().includes(search) || member.member.email.toLowerCase().includes(search)).map((member, index) =>
                    <tr key={member._id} className="border-b dark:border-neutral-500">

                      <td className="whitespace-nowrap px-6 py-4 font-medium">{member.member.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{member.member.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{member.member.phone}</td>
                      <td className="whitespace-nowrap flex justify-between px-6 py-4">
                        {member.isAccepted == false ? <div><span onClick={() => {
                          const accepted = false
                          changeStatus(member.member._id, accepted)
                        }} className='text-red-700 me-2'>decline</span><span onClick={() => {
                          const accepted = true
                          changeStatus(member.member._id, accepted)
                        }} className='text-green-600 me-1'>Accept</span></div> : <span onClick={() => removeMember(member.member._id)} className='text-red-700 me-1'>Remove</span>}
                      </td>
                    </tr>
                  )
                  :
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
      </div>}
     
    </div>
  )
}

export default ClubMembersManage