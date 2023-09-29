import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import LocationManage from './locationManage'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import ImageSlider from '../custom/imageSlider';
import isValidImage from '../../helpers/isValidImage';

function AddBikeForm(props) {

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [rentAmount, setAmount] = useState(0)
    const [cc, setCC] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [locationId, setLocationId] = useState('')
    const [locations, setLocations] = useState([])
    const [images, setImages] = useState([])
    const [currentIndex, manageIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const token = props.token
    const setShowAdd = props.setShowAdd

    useEffect(() => {
        axiosInstance.get('/admin/getLocations', { headers: { authorization: `Bearer ${token}` } }).then((res) => {
            setLocations(res?.data?.locations)
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

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 4) {
            toast.error('Maximum 4 images allowed')
        } else {
            const imageFiles = files.filter(isValidImage);
            if (imageFiles.length === files.length) {
                setImages(files);
                manageIndex(0)
            } else {
                toast.error('Add valid image')
            }
        }
    };


    const handleSubmit = () => {
        setLoading(true)
        if (make.trim().length == 0 || model.trim().length == 0 || locationId == '' || rentAmount == 0 || images.length == 0 || cc == 0 || category.trim().length == 0 || description.trim().length == 0) {
            setLoading(false)
            toast.error('Fill all the fields')
        } else {
            const formData = new FormData();

            images.forEach((image) => {
                formData.append(`images`, image);
            });

            formData.append('make', make);
            formData.append('model', model);
            formData.append('rentAmount', rentAmount);
            formData.append('locationId', locationId);
            formData.append('cc', cc);
            formData.append('category', category);
            formData.append('description', description);

            axiosInstance.post('/admin/addBike', formData, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }).then((res) => {
                toast.success(res.data.message)
                setShowAdd(false)
                setLoading(false)
                setImages([])
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
    }


    return (
        <div className='px-5'>
            <h1>ADD NEW BIKES</h1>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Make</label>
                            <div className="mt-2">
                                <input type="text" name="name" id="name" onChange={(e) => setMake(e.target.value)} className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Model</label>
                            <div className="mt-2">
                                <input type="text" name="last-name" id="last-name" onChange={(e) => setModel(e.target.value)} className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Rent Amount</label>
                            <div className="mt-2">
                                <input type="text" name="last-name" onChange={(e) => setAmount(e.target.value)} id="last-name" className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Engine Capacity</label>
                            <div className="mt-2">
                                <input type="text" onChange={(e) => setCC(e.target.value)} name="last-name" id="last-name" className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <textarea type="text" onChange={(e) => setDescription(e.target.value)} name="last-name" id="last-name" className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                            <div className="mt-2">
                                <input onChange={(e) => setCategory(e.target.value)} type="text" name="last-name" id="last-name" className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                            <div className="mt-2">
                                <select onChange={(e) => setLocationId(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={''} className='text-black' selected>Select Location</option>
                                    {locations.map((location) => (
                                        <option value={location?._id}>{console.log(location._id)}{location.location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <LocationManage token={token} locations={locations} />
                        </div>
                        <div>


                            <div className="">
                                {images.length == 0 ? '' : <ImageSlider images={images} height={'h-56 '} currentIndex={currentIndex} manageIndex={manageIndex} width={'w-56'} />}
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
                    loading?'':handleSubmit()
                }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <div className='flex'><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></div> : 'Confirm'} </button>
            </div>
        </div>
    )
}

export default AddBikeForm