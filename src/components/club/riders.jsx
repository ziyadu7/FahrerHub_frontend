import React, { useEffect, useState } from 'react'
import SearchBox from '../user/search'
import RidersCard from './ridersCard'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import Loader from '../user/loader'
import { useNavigate } from 'react-router-dom'
import errorFunction from '../../helpers/erroHandling'

function RidersBody() {

  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(true)
  const { clubToken } = useSelector((state) => state.ClubMember)
  const [riders, setRiders] = useState([])
  const [admin, setAdmin] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const cachedData = localStorage.getItem('riders')
    if (cachedData) {
      setRiders(JSON.parse(cachedData));
      setLoader(false)
    }
    axiosInstance.get('/club/getRiders', {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      if (!cachedData || JSON.parse(cachedData).length !== res?.data?.riders?.length) {
        setRiders(res?.data?.rides)
        localStorage.setItem('riders', JSON.stringify(res?.data?.riders));
        setLoader(false)
      }
      // setRiders(res.data.riders)
      setAdmin(res?.data?.admin)
      // setLoader(false)
    }).catch((err) => {
      errorFunction(err,navigate)
    })
  }, [])

  return (
    <div className='bg-[url(https://wallpapercave.com/wp/wp3647900.jpg)] bg-fixed min-h-screen'>
      {loader ? <Loader colour={'white'} /> : <>
        <div className={`justify-end pt-4 px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8`}>
          <SearchBox search={search} setSearch={setSearch} />
        </div>
        <div className="justify-between mt-2 sm:mt-5 text-white md:mt-10 px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          <div className="text-center container py-5">
            <div className="grid sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {loader ? '' : <RidersCard admin={admin} />}
              {riders?.filter((rider) => admin?.admin?._id !== rider?.member?._id && rider?.member?.name.toLowerCase().includes(search)).map((rider) => (
                <RidersCard key={rider?._id} rider={rider} />
              ))}
            </div>
          </div>
        </div>
      </>}
    </div>
  )
}

export default RidersBody