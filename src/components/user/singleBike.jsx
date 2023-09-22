import React from 'react'
import ImageSlider from '../custom/imageSlider'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'

function SingleBike(props) {

    const setBike = props?.setBike
    const bike = props?.bike
    const isReview = props?.isReview
    const setReview = props?.setReview
    const addReview = props?.addReview
    const isBooked = props?.isBooked
    const wallet = props.wallet

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [currentIndex, manageIndex] = useState(0)

    const {token} = useSelector((state) => state.User)

    const navigate = useNavigate()

    const handleBooking = async () => {
        const currentDate = new Date()
        if (currentDate  >= new Date(fromDate) || fromDate == toDate|| new Date(fromDate) >= new Date(toDate) || currentDate  >= new Date(toDate) || fromDate == undefined || toDate == undefined) {
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
    

  return (
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
                    min={new Date().toISOString().split('T')[0]}
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
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setToDate(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                    <p>Wallet : {wallet}</p>
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
              <div className="md:ms-0 w-full md:w-[900px]">
                <ImageSlider images={bike.images} height={'md:h-[500px] sm:h-[400px] h-[300px]'} currentIndex={currentIndex} manageIndex={manageIndex} width={'w-full'} />
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
  )
}

export default SingleBike