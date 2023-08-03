import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import LocationManage from './locationManage'
import { toast } from 'react-hot-toast'

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
    const token = props.token

    useEffect(() => {
        axiosInstance.get('/admin/getLocations', { headers: { authorization: `Bearer ${token}` } }).then((res) => {
            setLocations(res?.data?.locations)
        }).catch((err) => {
            toast.error(err?.response?.data?.errMsg)
        })
    }, [])

    function isValidImage(logo) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

        return validExtensions.includes(extension);
    }


    const handleImageChange = (event) => {
        const files = event.target.files;
        const results = [];

        for (let i = 0; i < files.length; i++) {
            console.log(files[i].name);
            if (isValidImage(files[i].name)) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = () => {
                    results.push(reader.result);

                    if (results.length === files.length) {
                        setImages(results);
                    }
                };

                reader.onerror = (error) => {
                    console.log(error);
                };

                reader.readAsDataURL(file);
            } else {
                toast.error('Add valid image')
                break
            }

        }
    };


    const handleSubmit = () => {
        console.log(locationId);
        if (make.trim().length == 0 || model.trim().length == 0 || locationId == '' || rentAmount == 0 || images.length == 0 || cc == 0 || category.trim().length == 0 || description.trim().length == 0) {
            toast.error('Fill all the fields')
        } else {
            axiosInstance.post('/admin/addBike', { make, model, rentAmount, locationId, images, cc, category, description }, { headers: { authorization: `Bearer ${token}` } }).then((res) => {
                toast.success(res.data.message)
                setShowAdd(false)
                setImages([])
            }).catch((error) => {
                toast.error(error?.response.data.errMsg)
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
                                <div className='md:flex'>
                                    {images.length == 0 ? '' : images.map((image, i) => (
                                        <img key={i} style={{ height: '100px', width: '100px' }}
                                            src={
                                                image
                                            }
                                            alt="...."
                                            className="avatar"
                                        />
                                    ))}

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
                <button type="" onClick={() => handleSubmit()} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button>
            </div>
        </div>
    )
}

export default AddBikeForm