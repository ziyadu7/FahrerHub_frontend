import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import BikeCard from './bikeCard';
import SearchBox from './search';
import '../../assets/css/club/upcomingRides.css'
import Loader from './loader';
import { useNavigate } from 'react-router-dom';

function ShowBikesPage() {

  const [bikes, setBikes] = useState([])
  const [bike, setBike] = useState()
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [isReview, setIsReview] = useState(false)
  const [isBooked, setBooked] = useState(false)
  const [user, setUser] = useState(null)
  const [review, setReview] = useState('')
  const [locations, setLocations] = useState([])
  const [locationSearch, setLocationSearch] = useState('')
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  const token = useSelector((state) => state.User.token)

  useEffect(() => {
    axiosInstance.get('/user/showBikes', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setBikes(res.data.bikes)
      setLocations(res.data.locations)
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
  }, [])


  const handleBooking = async () => {

    if (new Date() >= new Date(fromDate) || fromDate == toDate || new Date() >= new Date(toDate) || fromDate == undefined || toDate == undefined) {
      toast.error("Enter correct dates")
    } else {
      axiosInstance.post('/payment/create-checkout-session', { bike, fromDate, toDate }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url
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
  }

  const setSingleBike = async (bikeId) => {
    axiosInstance.get(`/user/getSingleBike/${bikeId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
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
      <div className="min-h-screen bg-[url(https://wallpaperaccess.com/full/497142.jpg)] ">
        <Toaster toastOptions={3000} />
        <div className="flex justify-end p-4">
          <button
            onClick={() => setBike(null)}
            className="bg-white hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4"
          >
            Back
          </button>
        </div>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Rent Form</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">From</label>
                <div className="mt-2">
                  <input
                    type="date"
                    onChange={(e) => setFromDate(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">To</label>
                <div className="mt-2">
                  <input
                    type="date"
                    onChange={(e) => setToDate(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4">
                Close
              </button>
              <button
                onClick={() => handleBooking()}
                className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4"
              >
                Confirm
              </button>
            </div>
          </form>
        </dialog>

        <div className="w-full flex justify-center h-full backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="carousel carousel-end md:ms-0 w-full md:w-3/4">
                {bike.images.map((image, index) => (
                  <div className="carousel-item w-full" key={index}>
                    <img className="transition-opacity duration-500" src={image} alt="Bike" />
                  </div>
                ))}
              </div>
              <div className="text-lg md:col-span-2 ms-10 text-white flex flex-col justify-center mt-8 md:mt-0">
                <p className="mb-2">
                  <span className="font-semibold ">Rent Amount :  </span> {bike.rentAmount}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">CC : </span> {bike.cc}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Category : </span> {bike.category}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Location : </span>{bike?.locationId?.location}
                </p>
                {isBooked ? (
                  <button className="bg-gray-300 text-black font-semibold py-2 px-4 rounded mb-4" disabled>
                    Booked
                  </button>
                ) : (
                  <button
                    onClick={() => window.my_modal_5.showModal()}
                    className="bg-slate-700 text-white font-semibold hover:bg-gray-800 py-2 px-4 rounded mb-4"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="justify-between mt-2 backdrop-blur-sm sm:mt-5 text-white md:mt-10 px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          <p className="mb-2">
            <span className="font-semibold ">Description : </span> {bike.description}
          </p>
        </div>


        <div>

        </div>
        <div className="justify-between backdrop-blur-sm mt-2 sm:mt-5 md:mt-10 px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          <div className="carousel rounded-box gap-4 capitalize">
            {bike.reviews.length !== 0 ? (
              bike.reviews.map((review, index) => (
                <div key={review._id}>
                  <dialog id="my_modalReview" className="modal modal-bottom sm:modal-middle">
                    <form method="dialog" className="modal-box">
                      <h3 className="font-bold text-lg">{review.user.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <p className=''>{review.review}</p>
                      </div>
                      <div className="modal-action">
                        <button className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4">
                          Close
                        </button>
                      </div>
                    </form>
                  </dialog>



                  <div onClick={() => window.my_modalReview.showModal()} className="overflow-hidden carousel-item hover:scale-105 bg-white transition-transform duration-200 text-black" key={index}>
                    <div className="card w-full shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title capitalize">{review.user.name}</h2>
                        <p className='overflow-hidden capitalize'>{review.review}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))


            ) : (
              <p className=' text-white text-center'>No reviews available.</p>
            )}
          </div>



        </div>
        <div className="flex backdrop-blur-sm mt-2 sm:mt-5 md:mt-10 justify-center w-full px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          {isReview && (
            <>
              <div className="flex flex-col md:flex-row flex-grow  border rounded-lg p-4">
                <div className="flex-1">
                  <textarea onChange={(e) => setReview(e.target.value)} placeholder="Type here" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                </div>
                <div className="flex items-center justify-center md:pl-4 mt-4 md:mt-0">
                  <button onClick={() => addReview(bike._id)} className="bg-green-600 text-white font-semibold py-2 px-4 rounded">
                    Add review
                  </button>
                </div>
              </div>

            </>
          )}
        </div>
      </div>

      : <div className='bg-[url(https://wallpaperaccess.com/full/497142.jpg)] bg-fixed min-h-screen'>
        <div className="sm:flex justify-between p-2 text-white px-4 mx-auto max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex mb-2 sm:mb-0">
            <select
              onChange={(e) => {
                setLocationSearch(e.target.value);
              }}
              className="block w-full py-2 px-4 leading-tight bg-black border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:bg-black focus:border-gray-500 dark:focus:border-gray-400"
            >
              <option value="">All</option>
              {locations.map((location) => (
                <option key={location._id} value={location.location.toLowerCase()}>
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
              {bikes ? bikes.filter((bike) => (bike.locationId.location.toLowerCase().includes(locationSearch)) && (bike.make.toLowerCase().includes(search) || bike.model.toLowerCase().includes(search) || bike.category.toLowerCase().includes(search))).map((bike) => {
                return (
                  <div key={bike._id}><BikeCard setSingleBike={setSingleBike} bike={bike} /></div>
                )
              })
                : <Card className="md:w-auto sm:w-auto">
                  <CardHeader color="blue-gray" className="relative h-auto">
                    <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="img-blur-shadow" layout="fill" />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                    <Typography>
                      The place is close to Barceloneta Beach and bus stop just 2 min by walk
                      and near to &quot;Naviglio&quot; where you can enjoy the main night life
                      in Barcelona.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              }

            </div>
          </div>
        </section>
      </div>
    }

    </>
  )
}

export default ShowBikesPage