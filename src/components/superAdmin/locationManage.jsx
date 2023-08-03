import React, { useState } from 'react'
import axiosInstance from '../../api/axios';
import { toast } from 'react-hot-toast';


function LocationManage(props) {
    const [showModal, setShowModal] = useState(false);
    const [newLocation, setNewLocation] = useState('')
    const [removeLocation, setRemoveLocation] = useState('')
    const [err, setErr] = useState('')
    const locations = props.locations
    const token = props.token

    const deleteLocation = () => {
        if (removeLocation.trim().length === 0) {
            setErr('Select Location')
        } else {
            axiosInstance.delete(`/admin/removeLocation/${removeLocation}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                toast.success(res.data.message)
                setShowModal(false)
                setErr('')
            }).catch((err) => {
                setErr(err?.response?.data?.errMsg)
            })
        }

    }

    const addLocation = () => {
        if (newLocation.trim().length == 0) {
            setErr('Fill the field')
        } else {
            axiosInstance.post('/admin/addLocation', { newLocation }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                toast.success(res.data.message)
                setShowModal(false)
                setErr('')
            }).catch((err) => {
                setErr(err?.response?.data?.errMsg)
                toast.error(err?.response?.data?.errMsg)
            })
        }
    }

    return (
        <>
            <button
                className="mt-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => { setShowModal(true); setErr('') }}
            >
                Location Options
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">

                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center">
                                        Location Managemenet
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                <div className="relative grid-cols-1 sm:grid-cols-2 p-6 flex-auto">
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Add Location</label>
                                        <div className="mt-2">
                                            <input onChange={(e) => setNewLocation(e.target.value)} type="text" className="block w-full rounded-md border-0 py-1.5  p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                addLocation()
                                            }}
                                        >
                                            Add location
                                        </button>
                                    </div>
                                    <div className="sm:col-span-3 ">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Remove Location</label>
                                        <div className="mt-2">
                                            <select onChange={(e) => setRemoveLocation(e.target.value)} name="" class="bg-gray-50 z-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="">
                                                <option className='' selected value={''}>Select one and delete it</option>
                                                {locations.map((location) => (
                                                    <option value={location?._id}>{location.location}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <button
                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                deleteLocation()
                                            }}
                                        >
                                            Delete location
                                        </button>
                                    </div>

                                </div>
                                <span className='text-center text-red-600'>{err}</span>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default LocationManage