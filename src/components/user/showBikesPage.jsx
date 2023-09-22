import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import BikeCard from './bikeCard';
import SearchBox from './search';
import '../../assets/css/club/upcomingRides.css'
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import { SlArrowDown} from 'react-icons/sl'
import SingleBike from './singleBike';

function ShowBikesPage() {

  const [bikes, setBikes] = useState([])
  const [bike, setBike] = useState()
  const [search, setSearch] = useState('')
  const [isReview, setIsReview] = useState(false)
  const [isBooked, setBooked] = useState(false)
  const [user, setUser] = useState(null)
  const [review, setReview] = useState('')
  const [locations, setLocations] = useState([])
  const [location, setLocationSearch] = useState(0)
  const [loader, setLoader] = useState(true)
  const [ noMore,setNoMore] = useState(false)
  const [wallet,setWallet] = useState(0)
  const [limit,setLimit] = useState(10)
  const navigate = useNavigate()

  const token = useSelector((state) => state.User.token)

  useEffect(() => {
    fetchData()
  }, [limit,location])

  useEffect(() => {
    let timer
    if(search.trim()!==''){
       timer = setTimeout(()=>{
        fetchData()
      },1000)
    }else{
      fetchData()
    }

    return clearInterval(timer)
  }, [search])

  function fetchData(){

    axiosInstance.get(`/user/showBikes?limit=${limit}&location=${location}&search=${search}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if(bikes.length == 0){
        setLocations(res.data.locations)
      }
      
      setNoMore(res?.data?.noMore)
      setBikes(res.data.bikes)
      setLoader(false)
    }).catch((err) => {
      if (err.response.status === 404) {
        navigate('/serverError')
      } else if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }

    })
  }

  const setSingleBike = async (bikeId) => {
    axiosInstance.get(`/user/getSingleBike/${bikeId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setWallet(res?.data?.wallet?.wallet)
      setBike(res.data.bike)
      setUser(res.data?.currentUser)
      if (res.data.isBooked) {
        setBooked(true)
      }
      if (res.data.isReview) {
        setIsReview(true)
      }
    }).catch((err) => {
      if (err.response.status === 404) {
        navigate('/serverError')
      } else if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }

  const addReview = async (bikeId) => {
    axiosInstance.post('/user/addReview', { review, bikeId }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((err) => {
      if (err.response.status === 404) {
        navigate('/serverError')
      } else if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }

  return (
    <>{loader ? <Loader bg={'white'} colour={'black'} /> : bike ?
      <SingleBike wallet = {wallet} isBooked={isBooked} bike={bike} addReview={addReview} setReview={setReview} isReview={isReview} setBike={setBike} />
      : <div className='bg-[url(https://wallpaperaccess.com/full/497142.jpg)] bg-fixed min-h-screen'>
        <div className="sm:flex justify-between p-2 text-white px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex mb-2 sm:mb-0">
            <select
              onChange={(e) => {
                setLocationSearch(e.target.value)
              }}
              className="block w-full py-2 px-4 leading-tight bg-black border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:bg-black focus:border-gray-500 dark:focus:border-gray-400"
            >
              <option value={0}>All</option>
              {locations?.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.location}
                </option>
              ))}
            </select>
          </div>
          <div className='flex justify-center'>
            <SearchBox search={search} setSearch={setSearch} />
          </div>
        </div>
        <section className="justify-between mt-2 sm:mt-5 text-white md:mt-10 px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          <div className="text-center container py-5">

            <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {bikes.length > 0 ? bikes.filter((bike) => (bike.make.toLowerCase().includes(search) || bike.model.toLowerCase().includes(search) || bike.category.toLowerCase().includes(search))).map((bike) => {
                return (
                  <div key={bike._id}><BikeCard setSingleBike={setSingleBike} bike={bike} /></div>
                )
              })
              
                : <Loader bg={''} colour={'black'} />
              }
            </div>
            <div className='flex justify-center'>
            {noMore?'':<div onClick={()=>{
              setLimit(limit+10)
             } } className='flex'><p>See More</p><div className='pt-1 ps-2'><SlArrowDown/></div></div>}
            </div>
          </div>
        </section>
      </div>
    }

    </>
  )
}

export default ShowBikesPage