import React, { useState } from 'react'
import axiosInstance from '../../api/axios'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import isValidImage from '../../helpers/isValidImage'
import ImageSlider from '../custom/imageSlider'
import errorFunction from '../../helpers/erroHandling'
import '../../assets/css/club/upcomingRides.css'
import { CSSTransition } from 'react-transition-group';
import '../../assets/css/club/transform.css'


function CreateRideFrom(props) {

    const setRefresh = props?.setRefresh
    const refresh = props?.refresh
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [from, setFrom] = useState('')
    const [image, setImage] = useState('https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg')
    const [fromLongitude, setFromLongitude] = useState('')
    const [fromLatitude, setFromLatitude] = useState('')
    const [toLongitude, setToLongitude] = useState('')
    const [toLatitude, setToLatitude] = useState('')
    const [stop1Longitude, setStop1Longitude] = useState('')
    const [stop2Longitude, setStop2Longitude] = useState('')
    const [stop1Latitude, setStop1Latitude] = useState('')
    const [stop2Latitude, setStop2Latitude] = useState('')
    const [stop1, setStop1] = useState('')
    const [stop2, setStop2] = useState('')
    const [currentIndex, manageIndex] = useState(0)

    const [err,setErr] = useState('')

    const [fromSug, setFromSug] = useState(false)
    const [toSug, setToSug] = useState(false)
    const [stop1Sug, setStop1Sug] = useState(false)
    const [stop2Sug, setStop2Sug] = useState(false)

    const [step, setStep] = useState(1)


    const handleNext = () => {
        if (step === 1) {
          if (
            from.trim() === '' ||
            destination.trim() === '' ||
            fromLongitude === '' ||
            toLongitude === '' ||
            fromLatitude === '' ||
            toLatitude === '' ||
            startDate === undefined ||
            endDate === undefined
          ) {
            setErr('Fill all the fields')
          } else if (new Date() >= new Date(startDate) || startDate === endDate || new Date() >= new Date(endDate)) {
            setErr('Enter correct dates')
          } else {
            setErr('')
            setStep(step + 1);
          }
        } else if (step === 2) {
          if (stop1.trim() === '' || stop2.trim() === '' || stop1Longitude === '' || stop1Latitude === '' || stop2Longitude === '' || stop2Latitude === ''||   description.trim() === '' ||
          maxRiders === 0 ) {
            setErr('Fill all the fields')
          } else {
            setErr('')
            setStep(step + 1);
          }
        }
      };
    
      const handlePrev = () => {
        if (step > 1) {
          setStep(step - 1);
        }
      };
    

    const clearForm = () => {
        setErr('')
        setStartDate('')
        setEndDate('')
        setFromSug(false)
        setFrom('');
        setFromLatitude('')
        setFromLongitude('')
        setToSug(false)
        setDestination('');
        setToLatitude('')
        setToLongitude('')
        setDescription('')
        setRidersCound('')
        setStop1Sug(false)
        setStop1('');
        setStop1('')
        setStop1Latitude('')
        setStop1Longitude('')
        setStop2Sug(false)
        setStop2('');
        setStop2('')
        setStop2Latitude('')
        setStop2Longitude('')
        setImage('')

    }

    const navigate = useNavigate()


    const { clubToken } = useSelector((store) => store.ClubMember)
    const [destination, setDestination] = useState('')
    const [description, setDescription] = useState('')
    const [maxRiders, setRidersCound] = useState(0)

    const handleSubmit = async () => {
        if (from.trim().length == 0 || destination.trim().length == 0 || stop1.trim().length == 0 || stop2.trim().length == 0 || stop1Latitude == '' || stop1Longitude == '' || stop2Latitude == '' || stop2Longitude == '' || image == 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'|| fromLongitude == '' || toLongitude == '' || fromLatitude == '' || toLatitude == '' || description.trim().length == 0 || maxRiders == 0 || startDate == undefined || endDate == undefined) {
            toast.error('Fill all the fiels')
        } else if (new Date() >= new Date(startDate) || startDate == endDate || new Date() >= new Date(endDate)) {
            toast.error('Enter correct dates')
        } else {
            if (!isValidImage(image)) {
                toast.error('Add valid image')
                return
            }
            const formData = new FormData();
            formData.append('startDate', startDate)
            formData.append('endDate', endDate)
            formData.append('from', from)
            formData.append('image', image)
            formData.append('destination', destination)
            formData.append('maxRiders', maxRiders)
            formData.append('description', description)
            formData.append('fromLatitude', fromLatitude)
            formData.append('fromLongitude', fromLongitude)
            formData.append('toLatitude', toLatitude)
            formData.append('toLongitude', toLongitude)
            formData.append('stop1', stop1)
            formData.append('stop2', stop2)
            formData.append('stop1Latitude', stop1Latitude)
            formData.append('stop1Longitude', stop1Longitude)
            formData.append('stop2Latitude', stop2Latitude)
            formData.append('stop2Longitude', stop2Longitude)

            axiosInstance.post('/club/createRide', formData, {
                headers: {
                    authorization: `Bearer ${clubToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                toast.success(res?.data?.message)
                setRefresh(!refresh)
            }).catch((err) => {
                errorFunction(err, navigate)
            })
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        const imageFile = isValidImage(file)
        if(!file){
            setErr('Add image')
        }else{
            if (imageFile) {
                setErr('')
                setImage(file)
                manageIndex(0)
            } else {
                setErr('Add valid image')
            }
        }
    }

    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const getLocationSuggestions = async (query) => {
        const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOXTOKEN
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
        const params = {
            access_token: MAPBOX_API_KEY,
            types: 'place',
            limit: 5,
            country: "IN"
        };

        try {
            const response = await axios.get(endpoint, { params });
            return response.data.features;
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
            return [];
        }
    }

    const handleLocationSuggestion = async (query) => {
        const suggestions = await getLocationSuggestions(query);
        setLocationSuggestions(suggestions);
    };

    return (<>
        <form method="dialog" className={`modal-box disableBar min-h-full overflow-x-hidden overflow-y-auto bg-slate-300`}>
         <div className='max-h-9 overflow-hidden'>
         <CSSTransition
                in={step === 1}
                timeout={300}
                classNames="step-transition"
                unmountOnExit
            >
                 <div className="step-content">
      <h3 className="font-bold text-lg text-center">Step 1</h3>
    </div>
            </CSSTransition>

            <CSSTransition
                in={step === 2}
                timeout={300}
                classNames="step-transition"
                unmountOnExit
            >
                <div className="step-content">
      <h3 className="font-bold text-lg text-center">Step 2</h3>
    </div>
            </CSSTransition>
         </div>
            {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Start date</label>
                        <div className="mt-2">
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
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
                                min={new Date().toISOString().split('T')[0]}
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
                                    handleLocationSuggestion(e.target.value)
                                }}
                                value={from}
                                placeholder={from || 'Start location'}
                                className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            <ul>
                                {fromSug && locationSuggestions.map((suggestion) => (
                                    <li key={suggestion.id}>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFromSug(false)
                                                setFrom(suggestion.place_name)
                                                setLocationSuggestions([])

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
                                    handleLocationSuggestion(e.target.value)
                                }}
                                value={destination}
                                placeholder={destination || 'destination'}
                                className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ul>
                                {toSug && locationSuggestions.map((suggestion) => (
                                    <li key={suggestion.id}>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setToSug(false)
                                                setDestination(suggestion.place_name)
                                                setLocationSuggestions([])
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
                    <p className='text-red-600'>{err}</p>
                </div>
            )}
            {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <label className="block text-sm font-medium leading-6 text-gray-900">Max Count of riders</label>
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
                        <label className="block text-sm font-medium leading-6 text-gray-900">Stop Location 1</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                onChange={(e) => {
                                    setStop1Sug(true)
                                    setStop1(e.target.value);
                                    handleLocationSuggestion(e.target.value)
                                }}
                                value={stop1}
                                placeholder={stop1 || 'Stop Location 1'}
                                className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            <ul>
                                {stop1Sug && locationSuggestions.map((suggestion) => (
                                    <li key={suggestion.id}>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStop1Sug(false)
                                                setStop1(suggestion.place_name)
                                                setLocationSuggestions([])

                                                const [long, lat] = suggestion?.geometry.coordinates;
                                                setStop1Latitude(lat)
                                                setStop1Longitude(long)
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
                        <label className="block text-sm font-medium leading-6 text-gray-900">Stop Location 2</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                onChange={(e) => {
                                    setStop2Sug(true)
                                    setStop2(e.target.value);
                                    handleLocationSuggestion(e.target.value)
                                }}
                                value={stop2}
                                placeholder={stop2 || 'Stop Location 2'}
                                className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ul>
                                {stop2Sug && locationSuggestions.map((suggestion) => (
                                    <li key={suggestion.id}>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStop2Sug(false)
                                                setStop2(suggestion.place_name)
                                                setLocationSuggestions([])
                                                const [long, lat] = suggestion?.geometry.coordinates;
                                                setStop2Latitude(lat)
                                                setStop2Longitude(long)
                                            }}
                                        >
                                            {suggestion.place_name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className='text-red-600'>{err}</p>
                </div>

            )}
            {step === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Location image</label>
                        <ImageSlider images={[image]} height={'h-26'} currentIndex={currentIndex} manageIndex={manageIndex} width={'w-42'} />
                        <div className="mt-2">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                placeholder='max riders'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <p className='text-red-600'>{err}</p>
                </div>
            )}

            <div className="modal-action">
                <button className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4" onClick={clearForm}>
                    Close
                </button>
                {step > 1 && (
                    <button type="button" className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4" onClick={handlePrev}>
                        Previous
                    </button>
                )}
                {step < 3 ? (
                    <button type="button" className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4" onClick={handleNext}>
                        Next
                    </button>
                ) : (
                    <div>
                        <button type="" className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4" onClick={handleSubmit}>
                            Confirm
                        </button>
                    </div>
                )}
            </div>
        </form>
    </>

    )
}

export default CreateRideFrom