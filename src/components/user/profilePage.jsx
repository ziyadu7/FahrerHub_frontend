import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import { toast, Toaster } from 'react-hot-toast'
import UserDetail from './userDetail'
import UserBikeDetail from './userBikeDetail'
import Loader from './loader'
import '../../assets/css/club/upcomingRides.css'
import { CgSpinner } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import ImageSlider from '../custom/imageSlider'
import isValidImage from '../../helpers/isValidImage'
import errorFunction from '../../helpers/erroHandling'


function ProfilePage() {
    const { token } = useSelector((state) => state.User)
    const [user, setUser] = useState({})
    const [change, setChange] = useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setNewName] = useState('')
    const [phone, setPhone] = useState('')
    const [newMob, setNewMob] = useState(null)
    const [adminClubs, setAdminClubs] = useState()
    const [memberClubs, setMemberClubs] = useState()
    const [profileImage, setNewProfile] = useState('')
    const [rentHistory, setRentHistory] = useState()
    const [rides, setRides] = useState([])
    const [loader, setLoader] = useState(true)
    const [submitLoad, setSubmitLoad] = useState(false)
    const [err, setErr] = useState('')
    const [showBike, setShowBike] = useState(false)
    const navigate = useNavigate()
    const [currentIndex, manageIndex] = useState(0)
    const regex_mobile = /^\d{10}$/


    useEffect(() => {
        axiosInstance.get('/user/profile', {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setLoader(false)
            setUser(res?.data?.user)
            setAdminClubs(res?.data?.adminClubs)
            setMemberClubs(res?.data?.memberClubs)
            setNewName(res?.data?.user?.name)
            setPhone(res?.data?.user?.phone)
            setRentHistory(res?.data?.rentBikes)
            setNewProfile(res?.data?.user?.profileImage)
            setRides(res?.data?.rides)
        }).catch((err) => {
            errorFunction(err,navigate)
        })
    }, [change])



    const submitEdits = async () => {
        setErr('')
        let mobile = newMob || phone
        if (name.trim().length == 0) {
            setErr("Fill all the fields")
            setSubmitLoad(false)
        } else if (regex_mobile.test(mobile) == false) {
            setErr("Enter valid mobile number")
            setSubmitLoad(false)
        } else {
            if (mobile == phone) {
                mobile = false
            }

            const formData = new FormData();
            formData.append('name',name)
            formData.append('image',profileImage)
            formData.append('mobile',mobile)
            axiosInstance.patch('/user/editProfile', formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                toast.success(res.data.message)
                setEdit(false)
                setChange(!change)
                setSubmitLoad(false)
            }).catch((err) => {
                setSubmitLoad(false)
                errorFunction(err,navigate)
            })
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        const imageFile = isValidImage(file)
        if (imageFile) {
          setNewProfile(file)
          manageIndex(0)
        } else {
          toast.error('Add valid image')
        }

    }

    const returnBike = (rentId, bikeId) => {
        axiosInstance.patch('/user/returnBike', { rentId, bikeId }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success(res.data.message)
            setChange(!change)
        }).catch((err) => {
            errorFunction(err,navigate)
        })
    }

    return (
        <div className="capitalize bg-[url('https://www.ktm.com/language-masters/en/segment-pages/naked/79-DUKE-Hero-Image.jpg')] min-h-screen bg-cover bg-fixed">
            <Toaster toastOptions={{ duration: 4000 }} />{loader ? <Loader bg={'white'} colour={'black'} /> :
                edit ?
                    <>
                        <div className="justify-center bg-transparent items-center flex overflow-x-hidden overflow-y-auto disableBar fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto max-h-full my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Edit Details
                                        </h3>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className='px-5'>
                                            <div className="space-y-12">
                                                <div className="border-b border-gray-900/10 pb-12">

                                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                                            <div className="mt-2">
                                                                <input type="text" onChange={(e) => setNewName(e.target.value)} placeholder={name} name="name" id="name" className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                                            <div className="mt-2">
                                                                <input type="text" onChange={(e) => setNewMob(e.target.value)} placeholder={newMob || phone} name="last-name" id="last-name" className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div className=''>
                                                            <div>
                                                                <div className='md:flex'>
                                                                {profileImage ? <ImageSlider images={[profileImage]} height={'h-26'} currentIndex={currentIndex} manageIndex={manageIndex} width={'w-42'} /> :<img
                                                                        src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
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
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <span className='text-red-700'>{err}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setEdit(false)
                                                setSubmitLoad(false)
                                            }
                                            }
                                        >
                                            Close
                                        </button>
                                        <button
                                            className={`bg-emerald-500 flex text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                            type="button"
                                            onClick={() => {
                                                setSubmitLoad(true)
                                                submitEdits()
                                            }}

                                        >
                                            {submitLoad ? <CgSpinner size={20} className='animate-spin' /> : <span>Submit</span>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </> :
                    showBike ? <UserBikeDetail change={change} setChange={setChange} bike={user?.bike} token={token} setShowBike={setShowBike} /> : <UserDetail setChange = {setChange} change = {change} setShowBike={setShowBike} user={user} setEdit={setEdit} adminClubs={adminClubs} returnBike={returnBike} memberClubs={memberClubs} rides={rides} rentHistory={rentHistory} />
            }
        </div>
    )
}

export default ProfilePage