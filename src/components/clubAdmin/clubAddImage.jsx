import React, { useEffect, useState } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import Loader from '../user/loader';
import { useNavigate } from 'react-router-dom';

function ClubAddImage() {

  const [image, setImage] = useState('')
  const [addImage, setAddImage] = useState(false)
  const [images, setImages] = useState([])
  const [reload, setReload] = useState(false)
  const { clubToken } = useSelector((state) => state.ClubMember)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/clubAdmin/getImages', {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      setImages(res.data.images)
      setLoader(false)
    }).catch((err) => {
      if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err.response.data.message) {
        toast.error(err.response.data.message)
      }
    })
  }, [reload])

  function isValidImage(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

    return validExtensions.includes(extension);
  }

  const handleImageChange = (img) => {
    if (isValidImage(img?.target?.files[0]?.name)) {
      if (img.target.files[0]?.size > 1 * 1024 * 1024) {
        toast.error('Image size should be less than 1 MB');
        return;
      }
      let reader = new FileReader()
      reader.readAsDataURL(img.target.files[0])
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.onerror = (err) => {
        console.log(err);
      }
    } else {
      toast.error('Please add valid image')
    }
  }

  const postImage = async () => {
    if (image.trim().length != 0) {
      axiosInstance.post('/clubAdmin/addImage', { image }, {
        headers: {
          authorization: `Bearer ${clubToken}`
        }
      }).then((res) => {
        toast.success(res.data.message)
        setReload(!reload)
        setAddImage(false)
      }).catch((err) => {
        if (err.response.status == 403) {
          navigate('/accessDenied')
        } else if (err.response.status == 500) {
          navigate('/serverError')
        } else if (err.response.data.message) {
          toast.error(err.response.data.message)
        }
      })
    } else {
      toast.error('Add any image')
    }
  }

  const removeImage = async (imageId) => {
    axiosInstance.patch('/clubAdmin/removeImage', { imageId }, {
      headers: {
        authorization: `Bearer ${clubToken}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      setReload(!reload)
    }).catch((err) => {
      if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err.response.data.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }

  return (
    <div className='bg-slate-800 relative'>
      {loader ? <Loader colour={'white'} /> : <>
        <Toaster toastOptions={3000} />
        <div className={`absolute p-2 bg-white overflow-hidden rounded-md h-3/4 top-3 left-1/4 right-1/4 z-50 m-auto ${addImage ? 'block' : 'hidden'}`}>
          <div>
            <div className='flex justify-between'>
              <button onClick={() => setAddImage(false)} className='bg-transparent border-2 hover:bg-red-600 border-red-700 text-black py-1 px-2 rounded-md'>Cancel</button>
              <button onClick={() => postImage()} className='bg-black text-white py-1 px-2 rounded-md'>Confirm</button>
            </div>
            <div className="mb-4 flex justify-center mx-auto">
              <div>
                <label
                  htmlFor="formFileSm"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200 font-medium"
                >
                  Add Images
                </label>
                <input
                  onChange={handleImageChange}
                  className="relative m-0 block w-full h-10 cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding pl-3 pr-8 text-sm font-normal text-neutral-700 transition duration-300 ease-in-out overflow-hidden hover:bg-neutral-200 focus:border-primary focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:bg-neutral-700 dark:focus:border-primary"
                  id="formFileSm"
                  type="file"
                />
              </div>
            </div>
            <div className="flex justify-center">
              {image && (
                <div className="max-w-full h-auto overflow-x-auto">
                  <img
                    src={image}
                    className="block max-w-full h-auto"
                    alt="Uploaded Image"
                  />
                </div>
              )}
            </div>

          </div>
        </div>
        <div className='flex m-auto pt-4 pe-3 justify-end'>
          <button onClick={() => setAddImage(true)} className='bg-black text-white py-1 px-2 rounded-md'>Add Image</button>
        </div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24 ">
          <div className="-m-1 flex flex-wrap md:-m-2 ">
            <div className="flex w-full flex-wrap">
              {images && images.length != 0 ? images.map((img, i) => (

                <div key={img._id} className={`w-1/2 p-1 md:p-2 relative`}>
                  <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src={img.image} />
                  <CiCircleRemove onClick={() => removeImage(img._id)} className='text-red-600 absolute top-3 right-3 text-2xl cursor-pointer' />
                </div>
              )) : <div className="w-1/2 p-1 md:p-2 relative">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                <CiCircleRemove className='text-red-600 absolute top-3 right-3 text-2xl cursor-pointer' />
              </div>}
            </div>
          </div>
        </div>
      </>}
    </div>
  )
}

export default ClubAddImage