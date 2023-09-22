import React, { useContext, useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../user/search';
import AddBikeForm from './addBikeForm';
import Loader from '../user/loader'
import Pagination from '../custom/pagination';


function BikesPage({ setEditBike }) {

    const [showAdd, setShowAdd] = useState(false)
    const [bikes, setBikes] = useState()
    const [bikeUpdation, setBikeUpdation] = useState(false)
    const [search, setSearch] = useState('')
    const { token } = useSelector((state) => state.SuperAdmin)
    const [loader, setLoader] = useState(true)
    const [skip,setSkip] = useState(0)
    const [totalPage,setTotalPage] = useState(0)
    const [calls,setCalls] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [showAdd, bikeUpdation, skip])

    useEffect(() => {
        if(search.trim()==''){
            setCalls(0)
          }
        setSkip(0)
        setTimeout(fetchData, 1000)
    }, [search])

    function fetchData() {
        axiosInstance.get(`/admin/showBikes?skip=${skip}&search=${search}&calls=${calls}`, { headers: { authorization: `Bearer ${token}` } }).then((res) => {
            if(calls==0||search.trim()!=''){
                setTotalPage(res?.data?.length)
              }
            setCalls(calls+1)
            setBikes(res?.data?.bikes)
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
    }

    const removeBike = (id) => {
        axiosInstance.delete(`/admin/removeBike/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success(res.data.message)
            setBikeUpdation(!bikeUpdation)
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




    const editBike = async (id) => {
        try {
            axiosInstance.get(`/admin/getEditBike/${id}`, { headers: { authorization: `Bearer ${token}` } }).then((res) => {
                setEditBike(res.data.bike)
                navigate('/admin/editBike')
            }).catch((err) => {
                toast.error(err?.response?.data?.errMsg)
                console.log(err);
            })
        } catch (err) {
            if (err.response.status === 404) {
                navigate('/serverError')
            } else if (err.response.status == 403) {
                navigate('/accessDenied')
            } else if (err.response.status == 500) {
                navigate('/serverError')
            } else if (err?.response?.data) {
                toast.error(err?.response?.data?.errMsg)
            }
        }
    }

    return (
        <div style={{ width: '95%' }} className=' ms-5 mt-5 sm:w-auto'>{loader ? <Loader bg={'white'} colour={'black'} /> : <>
            <div className="flex justify-end m-2">
                <SearchBox search={search} setSearch={setSearch} />

            </div>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className='flex justify-between md:mx-5 md:my-5 '><h1 className=''>Rent Bikes</h1><button className='bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded' onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Back' : 'Add Bike'}</button></div>
            {showAdd ?
                <AddBikeForm token={token} setShowAdd={setShowAdd} />
                : <div className='grid grid-cols-1 '>
                    <div className="inline-block py-2 pe-4">
                        <div className="overflow-auto">
                            <table className="w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            Make
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Model
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bikes
                                        ? bikes
                                            .filter(
                                                (bike) =>
                                                    bike.make.toLowerCase().includes(search) ||
                                                    bike.model.toLowerCase().includes(search) ||
                                                    bike.category.toLowerCase().includes(search)
                                            )
                                            .map((bike, index) => (
                                                <tr key={index} className="border-b dark:border-neutral-500">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{bike.make}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{bike.model}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{bike.category}</td>
                                                    <td className="whitespace-nowrap flex justify-between px-6 py-4">
                                                        <span onClick={() => removeBike(bike._id)} className='text-red-700 me-1'>Remove</span>
                                                        <span onClick={() => editBike(bike._id)} className='text-indigo-800 ms-1'>Edit</span>
                                                    </td>
                                                </tr>
                                            ))
                                        : (
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                                <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                                <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                                <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                            <div className='flex justify-end'>
                                <Pagination
                                    totalPage={totalPage}
                                    skip={skip}
                                    setSkip={setSkip}
                                />
                            </div>
                        </div>
                    </div>
                </div>}
        </>
        }

        </div>
    )
}

export default BikesPage