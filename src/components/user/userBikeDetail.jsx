import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import '../../assets/css/club/upcomingRides.css'
import { useNavigate } from 'react-router-dom'
import errorFunction from '../../helpers/erroHandling'
import isValidImage from '../../helpers/isValidImage'
import ImageSlider from '../custom/imageSlider'

function UserBikeDetail(props) {

    const setShowBike = props?.setShowBike
    const token = props?.token
    const bike = props?.bike
    const setChange = props?.setChange
    const change = props?.change

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [cc, setCC] = useState(0)
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [form, setForm] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentIndex, manageIndex] = useState(0)
    const navigate = useNavigate()

    const editBike = () => {
        console.log(image);
        if (make.trim().length == 0 || model.trim().length == 0 || cc == 0 || category.trim().length == 0 || image == '') {
            toast.error('Fill all the fields')
        } else {
            const formData = new FormData();
            formData.append('make',make)
            formData.append('model',model)
            formData.append('category',category)
            formData.append('cc',cc)
            formData.append('image',image)
            axiosInstance.post('/user/editBike', formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                toast.success(res.data.message)
                setChange(!change)
                setForm(false)
                setEdit(false)
            }).catch((err) => {
                errorFunction(err,navigate)
            })
        }
    }

    const addBike = () => {
        if (make.trim().length == 0 || model.trim().length == 0 || cc == 0 || category.trim().length == 0 || image == '') {
            toast.error('Fill all the fields')
        } else {
            const formData = new FormData();
            formData.append('make',make)
            formData.append('model',model)
            formData.append('category',category)
            formData.append('cc',cc)
            formData.append('image',image)
            axiosInstance.post('/user/addBike', formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                toast.success(res.data.message)
                setChange(!change)
                setForm(false)
            }).catch((err) => {
                errorFunction(err,navigate)
            })
        }
    }

    const addImage = (event) => {
            const file = event.target.files[0]
            const imageFile = isValidImage(file)
            if (imageFile) {
              setImage(file)
              manageIndex(0)
            } else {
              toast.error('Add valid image')
            }
    };

    return (
        <div className='justify-center pt-4 px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
            {form || !bike ?
                <div className='p-5 bg-slate-500 rounded-md bg-opacity-40'>

                    <div className='flex justify-between'>
                        {edit ? <h1 onClick={() => { setEdit(false); setForm(false) }} className='text-white'>EDIT BIKE</h1> : <h1 className='text-white'>ADD BIKE</h1>}
                        <button className='hover:bg-white text-white hover:text-black rounded-md px-2' onClick={() => setShowBike(false)}>Back To Profile</button>
                    </div>

                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium leading-6 text-white">Make</label>
                                    <div className="mt-2">
                                        <input placeholder={make} type="text" name="name" id="name" onChange={(e) => setMake(e.target.value)} className="block w-full rounded-md border-0 py-1.5 p-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium leading-6 text-white">Model</label>
                                    <div className="mt-2">
                                        <input placeholder={model} type="text" onChange={(e) => setModel(e.target.value)} className="block w-full rounded-md border-0 p-1 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium leading-6 text-white">Engine Capacity</label>
                                    <div className="mt-2">
                                        <input placeholder={cc} type="number" onChange={(e) => setCC(e.target.value)} className="block w-full p-1 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium leading-6 h- text-white">Category</label>
                                    <div className="mt-2">
                                        <input placeholder={category} onChange={(e) => setCategory(e.target.value)} type="text" className="block p-1 w- w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>


                                    <div className="">
                                        <div className='md:flex'>
                                          {image? <ImageSlider images={[image]} height={'h-28'} currentIndex={currentIndex} manageIndex={manageIndex} width={'w-40'} />:  <img style={{ height: '100px', width: '100px' }}
                                                src={
                                                     "https://www.lighting.philips.com/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=855&qlt=82"
                                                }
                                                alt="...."
                                                className="avatar"
                                            />}

                                        </div>
                                        <div className="pt-5">
                                            <input
                                                type="file"
                                                name="photo"
                                                acceptedfiles=".jpg,.jpeg,.png"
                                                id="file"
                                                multiple
                                                onChange={addImage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        {edit ? <button type="button" onClick={() => {
                            editBike()
                        }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button> : <button type="button" onClick={() => {
                            addBike()
                        }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button>}

                    </div>
                </div> :
                <div className=''>
                    <div className="w-full bg-white bg-opacity-80 min-h-full mb-4 p-4 md:p-6">
                        <div className='flex justify-between'>
                            <button onClick={() => setShowBike(false)} className="text-blue-600 hover:underline ">
                                Back To Profile
                            </button>
                            <h5 className="my-3 text-xl font-semibold">Bike</h5>
                            <button
                                onClick={() => {
                                    setCC(bike?.cc);
                                    setCategory(bike?.category);
                                    setImage(bike?.image);
                                    setMake(bike?.make);
                                    setModel(bike?.model);
                                    setForm(true);
                                    setEdit(true);
                                }}
                                className="text-blue-600 hover:underline "
                            >
                                Edit Bike
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row text-center">
                            <div className="w-full md:w-2/3 mb-4 md:mb-0">
                                <img
                                    src={bike?.image ? bike?.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                    alt="avatar"
                                    className="mx-auto w-screen object-cover"
                                />

                            </div>

                            <div className="w-full md:w-2/3 p-2 md:p-6 bg-white bg-opacity-80 rounded-md">
                                <div className="mb-4">
                                    <div className="flex items-center">
                                        <p className="w-1/3 font-semibold">Make</p>
                                        <p className="text-black mb-0">{bike?.make}</p>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center">
                                        <p className="w-1/3 font-semibold">Model</p>
                                        <p className="text-black mb-0">{bike?.model}</p>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center">
                                        <p className="w-1/3 font-semibold">Category</p>
                                        <p className="text-black mb-0">{bike?.category}</p>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center">
                                        <p className="w-1/3 font-semibold">CC</p>
                                        <p className="text-black mb-0">{bike?.cc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserBikeDetail