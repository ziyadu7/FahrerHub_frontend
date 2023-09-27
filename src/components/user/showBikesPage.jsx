import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import BikeCard from './bikeCard';
import SearchBox from './search';
import '../../assets/css/club/upcomingRides.css'
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import { SlArrowDown } from 'react-icons/sl'
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
  const [noMore, setNoMore] = useState(false)
  const [seeMoreLoad, setSeeMoreLoad] = useState(false)
  const [wallet, setWallet] = useState(0)
  const [limit, setLimit] = useState(10)
  const navigate = useNavigate()

  const token = useSelector((state) => state.User.token)

  useEffect(() => {
    fetchData()
  }, [limit, location])

  useEffect(() => {
    let timer;

    console.log(search);

    timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);


  function fetchData() {

    axiosInstance.get(`/user/showBikes?limit=${limit}&location=${location}&search=${search}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (bikes.length == 0) {
        setLocations(res.data.locations)
      }
      setNoMore(res?.data?.noMore)
      setSeeMoreLoad(false)
      setBikes(res?.data?.bikes)
      setLoader(false)
    }).catch((err) => {
      setSeeMoreLoad(false)
      if (err?.response?.status === 404) {
        navigate('/serverError')
      } else if (err?.response?.status == 403) {
        navigate('/accessDenied')
      } else if (err?.response?.status == 500) {
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
      if (err?.response?.status === 404) {
        navigate('/serverError')
      } else if (err?.response?.status == 403) {
        navigate('/accessDenied')
      } else if (err?.response?.status == 500) {
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
      if (err?.response?.status === 404) {
        navigate('/serverError')
      } else if (err?.response?.status == 403) {
        navigate('/accessDenied')
      } else if (err?.response?.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }

  return (
    <>{loader ? <Loader bg={'white'} colour={'black'} /> : bike ?
      <SingleBike wallet={wallet} isBooked={isBooked} bike={bike} addReview={addReview} setReview={setReview} isReview={isReview} setBike={setBike} />
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
              {bikes.length > 0 ? bikes.map((bike) => {
                return (
                  <div key={bike._id}><BikeCard setSingleBike={setSingleBike} bike={bike} /></div>
                )
              })

                : <Loader bg={''} colour={'black'} />
              }
            </div>
            <div className='flex justify-center'>
              {noMore ? '' : <div onClick={() => {
                setLimit(limit + 10)
                setSeeMoreLoad(true)
              }} className='flex'>{seeMoreLoad ? <div class="text-center">
                <div role="status">
                  <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div> : <><p>See More</p><div className='pt-1 ps-2'><SlArrowDown /></div></>}
              </div>}
            </div>
          </div>
        </section>
      </div>
    }

    </>
  )
}

export default ShowBikesPage