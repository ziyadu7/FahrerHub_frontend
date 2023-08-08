import React, { useContext, useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import LocationManage from './locationManage';

function EditBikePage({ editBike, setEditBike }) {

  const [locationId, setLocationId] = useState(editBike.locationId)
  const [locations, setLocations] = useState([])
  const [croppedImages, setCroppedImages] = useState([]);
  const [make, setMake] = useState(editBike.make)
  const [model, setModel] = useState(editBike.model)
  const [rentAmount, setAmount] = useState(editBike.rentAmount)
  const [cc, setCC] = useState(editBike.cc)
  const [category, setCategory] = useState(editBike.category)
  const [description, setDescription] = useState(editBike.description)
  const { token } = useSelector((state) => state.SuperAdmin)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/admin/getLocations', { headers: { authorization: `Bearer ${token}` } }).then((res) => {
      setLocations(res?.data?.locations)
    }).catch((err) => {
      toast.error(err?.response?.data?.errMsg)
      console.log(err)
    })
  }, [])

  const handleSubmit = () => {
    if (make.trim().length == 0 || model.trim().length == 0 || locationId.trim().length == 0 || rentAmount == 0 || cc == 0 || category.trim().length == 0 || description.trim().length == 0) {
      toast.error('Fill all the fields')
    } else {
      let images
      if (croppedImages.length > 0) {
        images = croppedImages
      } else {
        images = editBike.images
      }

      axiosInstance.patch(`/admin/editBike/${editBike._id}`, { make, model, rentAmount, locationId, images, cc, category, description }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
        setTimeout(() => { navigate('/admin/rentBikes') }, 3000)
      }).catch((error) => {
        if (error.data.response.errMsg) {
          toast.error(error.data.response.errMsg)
        }

      })
    }
  }

  function isValidImage(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

    return validExtensions.includes(extension);
  }

  const handleImageChange = (event) => {
    const files = event.target.files;
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (isValidImage(file.name)) {
        if (file.size > 1 * 1024 * 1024) { 
          toast.error('Image size should be less than 1 MB');
          break;
      }
        const reader = new FileReader();

        reader.onload = () => {
          results.push(reader.result);

          if (results.length === files.length) {
            setCroppedImages(results);
          }
        };

        reader.onerror = (error) => {
          console.log(error);
        };

        reader.readAsDataURL(file);
      } else {
        toast.error('Add valid image')
      }

    }
  };



  return (
    <div style={{ width: '95%' }}  className=' ms-5 mt-5 sm:w-auto'><Toaster toastOptions={{ duration: 4000 }} />
      <div className='flex justify-between md:mx-5 md:my-5 '><h1 className=''>Rent Bikes</h1><button className='bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded' onClick={() => navigate('/admin/rentBikes')}>Back</button></div>
      <div className='px-5'>
        <h1>ADD NEW BIKES</h1>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Make</label>
                <div className="mt-2">
                  <input type="text" placeholder={make} name="name" id="name" onChange={(e) => setMake(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Model</label>
                <div className="mt-2">
                  <input type="text" placeholder={model} name="last-name" id="last-name" onChange={(e) => setModel(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Rent Amount</label>
                <div className="mt-2">
                  <input type="text" placeholder={rentAmount} name="last-name" onChange={(e) => setAmount(e.target.value)} id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Engine Capacity</label>
                <div className="mt-2">
                  <input type="text" placeholder={cc} onChange={(e) => setCC(e.target.value)} name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <div className="mt-2">
                  <textarea type="text" placeholder={description} onChange={(e) => setDescription(e.target.value)} name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                <div className="mt-2">
                  <input placeholder={category} onChange={(e) => setCategory(e.target.value)} type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                <div className="mt-2">
                  <select onChange={(e) => setLocationId(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {console.log(locationId)}
                    <option selected>{locationId?.location}</option>
                    {locations.map((location) => (
                      <>
                        <option value={location?._id}>{location.location}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div>
                  <LocationManage token={token} locations={locations} />
                </div>
              </div>
              <div>


                <div className="">
                  <div className='md:flex'>
                    {croppedImages.length == 0 && editBike.images.map((image, index) => (
                      <>
                        <img key={index + 1}
                          src={
                            image
                          }
                          alt="...."
                          className="avatar"
                        />

                      </>
                    ))}

                    {croppedImages.map((image, index) =>
                      <img key={index}
                        src={
                          image
                        }
                        alt="...."
                        className="avatar grid md:grid-cols-4"
                      />)}

                  </div>
                  <div className="pt-5">
                    <input
                      type="file"
                      name="photo"
                      acceptedfiles=".jpg,.jpeg,.png"
                      id="file"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" onClick={() => {
            handleSubmit()
          }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button>
        </div>
      </div>

    </div>

  )
}

export default EditBikePage