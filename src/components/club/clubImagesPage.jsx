import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import Loader from '../user/loader';
import { useNavigate } from 'react-router-dom';


function ClubImagesPage() {

  const [images, setImages] = useState([])
  const { clubToken } = useSelector((state) => state.ClubMember)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/club/getImages', {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setImages(res.data.images)
      setLoader(false)
    }).catch((err) => {
      if (err.response.status === 404) {
        navigate('/serverError')
      } else if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }, [])

  return (
    <div className='bg-[url(https://wallpapercave.com/wp/wp3647900.jpg)] bg-fixed min-h-screen'>
      <Toaster toastOptions={3000} />
      {loader ? <Loader colour={'white'} /> :
        <div className="container m-auto px-5 py-2 lg:px-32 lg:pt-24 ">
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="container">
              <div className="-m-1 flex flex-wrap md:-m-2 ">
                <div className="grid sm:grid-cols-2 grid-cols-1">
                  {images && images.length != 0 ? images.map((img, i) => (

                    <div key={img._id} className={` p-1 md:p-2 relative`}>
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src={img.image} />
                    </div>
                  )) : <div className=" p-1 md:p-2 relative">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default ClubImagesPage