import React, { useState } from 'react'
import axiosInstance from '../../api/axios'
import { toast } from 'react-hot-toast'
import '../../assets/css/club/upcomingRides.css'
import { CgSpinner } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import isValidImage from '../../helpers/isValidImage'
import ImageSlider from '../custom/imageSlider'

function CreateClub(props) {

    const [clubName, setClubName] = useState('')
    const [city, setCity] = useState('')
    const [year, setYear] = useState('')
    const [logo, setLogo] = useState('')
    const [err, setErr] = useState('')
    const [isPrivate, setIsPrivate] = useState(true)
    const [submited, setSubmited] = useState(false)
    const [currentIndex, manageIndex] = useState(0)
    const navigate = useNavigate()

    const setModal = props.setModal
    const setChange = props.setChange
    const change = props.change
    const token = props.token

    const handleSubmit = async () => {
        if (clubName.trim().length == 0 || city.trim().length == 0 || logo == '' || year == '') {
            setSubmited(false)
            setErr("Fill all the fields")
        } else if (new Date(year) >= new Date()) {
            setSubmited(false)
            setErr("Enter correct date")
        } else {
            const formData = new FormData();
            formData.append('image',logo)
            formData.append('clubName',clubName)
            formData.append('city',city)
            formData.append('year',year)
            formData.append('isPrivate',isPrivate)
            axiosInstance.post('/user/createClub', formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                setSubmited(false)
                if (res.status == 200) {
                    toast.success(res.data.message)
                    setChange(!change)
                }
                setModal(false)
            }).catch((err) => {
                setSubmited(false)
                if (err.response.status === 404) {
                    navigate('/serverError')
                } else if (err.response.status == 403) {
                    navigate('/accessDenied')
                } else if (err.response.status == 500) {
                    setSubmited(false)
                    navigate('/serverError')
                } else if (err?.response?.data) {
                    toast.error(err?.response?.data?.errMsg)
                }
            })

        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        const imageFile = isValidImage(file)
        if (imageFile) {
          setLogo(file)
          manageIndex(0)
        } else {
          toast.error('Add valid image')
        }

    }

    return (
        <div
            className="justify-center items-center h-auto  flex overflow-x-hidden disableBar overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-auto  mx-auto max-w-3xl">

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                    <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Create Club
                        </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <div className='px-5'>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">Club Name</label>
                                            <div className="mt-2">
                                                <input value={clubName} onChange={(e) => setClubName(e.target.value)} type="text" name="name" id="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                            <div className="mt-2">
                                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">Started Year</label>
                                            <div className="mt-2">
                                                <input type="date" value={year} onChange={(e) => setYear(e.target.value)} name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <>
                                                <div className="flex items-center mb-4">
                                                    <input
                                                        id="default-radio-1"

                                                        onChange={() => setIsPrivate(false)}
                                                        type="radio"
                                                        value=""
                                                        name="default-radio"
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="default-radio-1"
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Public
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="default-radio-2"
                                                        checked
                                                        type="radio"
                                                        onChange={() => setIsPrivate(true)}
                                                        value=""
                                                        name="default-radio"
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="default-radio-2"
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Private
                                                    </label>
                                                </div>
                                            </>
                                        </div>
                                        <div>
                                            <div className="">
                                                <div className=''>
                                                {logo ? <ImageSlider images={[logo]} height={'h-26'} currentIndex={currentIndex} manageIndex={manageIndex} width={'w-42'} />:<img
                                                        src={
                                                             "https://www.lighting.philips.com/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=855&qlt=82"
                                                        }
                                                        alt="...."
                                                    />}
                                                </div>
                                                <div className="pt-5">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        acceptedfiles=".jpg,.jpeg,.png"
                                                        id="file"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <span className='text-red-600'>{err && err}</span>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {

                                setModal(false)
                            }
                            }
                        >
                            Close
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                                setSubmited(true)
                                handleSubmit()
                            }}

                        >
                            {submited ? <CgSpinner size={20} className='animate-spin' /> : ''}
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClub