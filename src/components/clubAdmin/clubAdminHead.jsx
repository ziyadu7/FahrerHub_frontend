import React, { useState } from 'react'
import { BiTrip } from 'react-icons/bi'
import { IoIosImages } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import { Toaster, toast } from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'


function ClubAdminHead(props) {
  const navigate = useNavigate()
  const setPage = props.setPage
  const club = props.club
  const page = props.page

  const [clubName, setNewClubName] = useState(club.clubName)
  const [city, setNewClity] = useState(club.city)
  const [startedYear, setStartedYear] = useState(club.startedYear)
  const [logo, setNewLogo] = useState(club.logo)
  const [err, setErr] = useState('')
  const { clubToken } = useSelector((store) => store.ClubMember)




  const handleSubmit = async () => {
    if (clubName.trim().length == 0 || city.trim().length == 0 || logo == '' || startedYear == '') {
      setErr("Fill all the fields")
    } else {
      axiosInstance.patch('/clubAdmin/editClub', { clubName, city, startedYear, logo }, {
        headers: {
          authorization: `Bearer ${clubToken}`
        }
      }).then((res) => {
        if (res.status == 200) {
          toast.success(res.data.message)
        }
      }).catch((err) => {
        if (err.response.data.errMsg) {
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
    if (isValidImage(img.target.files[0].name)) {
      let reader = new FileReader()
      reader.readAsDataURL(img.target.files[0])
      reader.onload = () => {
        setNewLogo(reader.result)
      }
      reader.onerror = (err) => {
        console.log(err);
      }
    } else {
      setErr('Add valid image')
    }
  };
  return (
    <>
      <Toaster toastOptions={3000} />
      <dialog id="my_modal_5" className="modal capitalize modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-center">Edit Club Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">startedYear</label>
              <div className="mt-2">
                <input
                  value={startedYear}
                  type="date"
                  onChange={(e) => setStartedYear(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Club Name</label>
              <div className="mt-2">
                <input
                  value={clubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  type="text"
                  placeholder='Start location'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div className="mt-2">
                <input
                  value={city}
                  onChange={(e) => setNewClity(e.target.value)}
                  type="text"
                  placeholder='destination'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Logo Image</label>
              <img src={logo} alt="" />
              <div className="mt-2">
                <input
                  type="file"
                  onChange={handleImageChange}
                  placeholder='max riders'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <span className='text-center text-red-500'>{err && err}</span>
          </div>
          <div className="modal-action">
            <button className="hover:bg-white py-2 px-4 border border-black-500 hover:border-black rounded mb-4">
              Close
            </button>
            <button
              onClick={() => handleSubmit()}
              className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-4"
            >
              Confirm
            </button>
          </div>
        </form>
      </dialog>
      <div style={{
        backgroundImage: `url(${club.logo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }} className='w-full min-h-screen capitalize disableBar overflow-y-scroll overflow-hidden'>
        <div className='backdrop-blur-sm w-full bg-gradient-to-tr from-cyan-950  bg-opacity-30 items-center min-h-screen '>
          <div className='w-full flex justify-end'>
            <button onClick={() => navigate(`/club/home/${club._id}`)} className='bg-yellow-500 rounded-md px-3 font-semibold mt-2 me-2 sm:mt-4 sm:me-4 py-1 text-white'>Admin Logout</button>
            <button onClick={() => window.my_modal_5.showModal()} className='bg-yellow-500 rounded-md px-3 font-semibold mt-2 me-2 sm:mt-4 sm:me-4 py-1 text-white'>Edit Club</button>
          </div>

          <div className='pt-5'>
            <h1 className='text-3xl sm:text-6xl uppercase font-bold text-center text-white'>{club.clubName}</h1>
            <h1 className='text-3xl sm:text-6xl text-center uppercase font-extrabold text-white'>Hello Admin</h1>
          </div>
          <div className='grid sm:grid-cols-3  grid-cols-1 md:mt-28'>
            <div onClick={() => setPage('trips')} className={`m-3 h-full ${page == 'trips' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
              <div className=''>
                <div className='flex justify-center'>
                  <BiTrip className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                </div>
                <h1 className='text-center text-white font-bold'>Current trip</h1>
                <p className='text-center text-yellow-400'>You can see Current trips</p>
              </div>
            </div>
            <div onClick={() => setPage('addImage')} className={`m-3 h-full ${page == 'addImage' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
              <div className=''>
                <div className='flex justify-center'>
                  <IoIosImages className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                </div>
                <h1 className='text-center text-white font-bold'>Add Images</h1>
                <p className='text-center text-yellow-400'>Add Trip Images</p>
              </div>
            </div>
            <div onClick={() => setPage('members')} className={`m-3 h-full ${page == 'members' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
              <div className=''>
                <div className='flex justify-center'>
                  <FaUsers className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                </div>
                <h1 className='text-center text-white font-bold'>Members</h1>
                <p className='text-center text-yellow-400'>Club members management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClubAdminHead