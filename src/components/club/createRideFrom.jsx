import React, { useState } from 'react'
import axiosInstance from '../../api/axios'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateRideFrom(props) {

    const setRefresh = props?.setRefresh
    const refresh = props?.refresh
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [from, setFrom] = useState('')
    const [image, setImage] = useState('')
    const [fromLongitude, setFromLongitude] = useState('')
    const [fromLatitude, setFromLatitude] = useState('')
    const [toLongitude, setToLongitude] = useState('')
    const [toLatitude, setToLatitude] = useState('')
    const [fromSug, setFromSug] = useState(false)
    const [toSug, setToSug] = useState(false)
    const navigate = useNavigate()


    const { clubToken } = useSelector((store) => store.ClubMember)
    const [destination, setDestination] = useState('')
    const [description, setDescription] = useState('')
    const [maxRiders, setRidersCound] = useState(0)

    const handeSubmit = async () => {
        if (from.trim().length == 0 || destination.trim().length == 0 || image == '' || fromLongitude == '' || toLongitude == '' || fromLatitude == '' || toLatitude == '' || description.trim().length == 0 || maxRiders == 0 || startDate == undefined || endDate == undefined) {
            toast.error('Fill all the fiels')
        } else if (new Date() >= new Date(startDate) || startDate == endDate || new Date() >= new Date(endDate)) {
            toast.error('Enter correct dates')
        } else {
            axiosInstance.post('/club/createRide', { startDate, endDate, from, image, destination, maxRiders, description, fromLatitude, fromLongitude, toLatitude, toLongitude }, {
                headers: {
                    authorization: `Bearer ${clubToken}`
                }
            }).then((res) => {
                toast.success(res?.data?.message)
                setRefresh(!refresh)
            }).catch((err) => {
                if(err.response.status === 404){
                    navigate('/serverError')
                }else if (err.response.status == 403) {
                    navigate('/accessDenied')
                } else if (err.response.status == 500) {
                    navigate('/serverError')
                } else if (err.response.data.errMsg) {
                    toast.error(err.response.data.errMsg)
                }
            })
        }
    }

    function isValidImage(logo) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

        return validExtensions.includes(extension);
    }

    const handleImageChange = (img) => {
        if (isValidImage(img?.target?.files[0]?.name)) {
            if (img.target.files[0].size > 1 * 1024 * 1024) {
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

    const [locationSuggestions, setLocationSuggestions] = useState([]);

    // Function to get location suggestions from Mapbox Geocoding API
    const getLocationSuggestions = async (query) => {
        const MAPBOX_API_KEY = import.meta.env.VITE_SERVERURL
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
        const params = {
            access_token: MAPBOX_API_KEY,
            types: 'place', // Limit results to places only
            limit: 5, // Number of suggestions to retrieve
            country: "IN"
        };

        try {
            const response = await axios.get(endpoint, { params });
            return response.data.features;
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
            return [];
        }
    };

    // Function to handle location suggestion selection
    const handleLocationSuggestion = async (query) => {
        // Get location suggestions when the user types
        const suggestions = await getLocationSuggestions(query);
        setLocationSuggestions(suggestions);
    };

    return (
        <form method="dialog" className="modal-box disableBar overflow-y-scroll bg-slate-300">
            <h3 className="font-bold text-lg text-center">Create Ride</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Start date</label>
                    <div className="mt-2">
                        <input
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">End date</label>
                    <div className="mt-2">
                        <input
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">From</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            onChange={(e) => {
                                setFromSug(true)
                                setFrom(e.target.value);
                                handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
                            }}
                            value={from}
                            placeholder={from || 'Start location'}
                            className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {/* Display location suggestions */}
                        <ul>
                            {fromSug && locationSuggestions.map((suggestion) => (
                                <li key={suggestion.id}>
                                    {/* Assuming you want to display the place name as a suggestion */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFromSug(false)
                                            setFrom(suggestion.place_name); // Update the input field with the selected suggestion
                                            setLocationSuggestions([]); // Clear the suggestions list
                                            // Now you can also get the longitude and latitude from suggestion.geometry.coordinates
                                            const [long, lat] = suggestion?.geometry.coordinates;
                                            setFromLatitude(lat)
                                            setFromLongitude(long)
                                        }}
                                    >
                                        {suggestion.place_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Destination</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            onChange={(e) => {
                                setToSug(true)
                                setDestination(e.target.value);
                                handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
                            }}
                            value={destination}
                            placeholder={destination || 'destination'}
                            className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ul>
                            {toSug && locationSuggestions.map((suggestion) => (
                                <li key={suggestion.id}>
                                    {/* Assuming you want to display the place name as a suggestion */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToSug(false)
                                            console.log(suggestion, '][][]][][][][[][][');
                                            setDestination(suggestion.place_name); // Update the input field with the selected suggestion
                                            setLocationSuggestions([]); // Clear the suggestions list
                                            // Now you can also get the longitude and latitude from suggestion.geometry.coordinates
                                            const [long, lat] = suggestion?.geometry.coordinates;
                                            setToLatitude(lat)
                                            setToLongitude(long)
                                        }}
                                    >
                                        {suggestion.place_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 p-1 text-gray-900">Description</label>
                    <div className="mt-2">
                        <textarea
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description about basic requirements'
                            className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Max Count of rides</label>
                    <div className="mt-2">
                        <input
                            type="number"
                            onChange={(e) => setRidersCound(e.target.value)}
                            placeholder='max riders'
                            className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Location image</label>
                    <img src={image} alt="" />
                    <div className="mt-2">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            placeholder='max riders'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

            </div>
            <div className="modal-action">
                <button className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4">
                    Close
                </button>
                <button
                    onClick={() => handeSubmit()}
                    className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4"
                >
                    Confirm
                </button>
            </div>
        </form>
    )
}

export default CreateRideFrom