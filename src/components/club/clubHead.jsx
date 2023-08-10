import React from 'react'
import { RiFileHistoryFill, RiUserStarFill } from 'react-icons/ri'
import { BiTrip } from 'react-icons/bi'
import { IoIosImages } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { clubMemberLogout } from '../../store/slice/clubMembers'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import '../../assets/css/club/upcomingRides.css'


function ClubHead(props) {
    const { role, clubToken } = useSelector((store) => store.ClubMember)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const club = props.club
    const setPage = props.setPage
    const page = props.page

    const logOutClub = async () => {
        dispatch(clubMemberLogout())
        navigate('/')
    }

    const exitClub = async (id) => {
        axiosInstance.patch('/club/exitClub', { id }, { headers: { authorization: `Bearer ${clubToken}` } }).then((res) => {
            toast.success(res.data.message)
            navigate('/')
        }).catch((err) => {
            if (err.response.status === 404) {
                navigate('/serverError')
            } else if (err.response.status == 403) {
                navigate('/accessDenied')
            } else if (err.response.status == 500) {
                navigate('/serverError')
            } else if (err.response.data.errMsg) {
                toast.error(err.response.data.errMsg)
            }
        })
    }

    return (<><Toaster toastOptions={3000} />
        <div style={{
            backgroundImage: `url(${club.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }} className='w-full min-h-screen capitalize disableBar overflow-y-scroll overflow-hidden'>
            <div className='backdrop-blur-sm w-full bg-gradient-to-tr min-h-screen from-cyan-950  bg-opacity-30 items-center'>
                {role == 'admin' ? <div className='w-full flex justify-end'>
                    <button onClick={() => navigate('/clubAdmin')} className='bg-yellow-500 rounded-md px-3 font-semibold mt-2 me-2 sm:mt-4 sm:me-4 py-1 text-white'>Admin</button>
                </div> : <div className='w-full flex justify-end'>
                    <button onClick={() => exitClub(club._id)} className='bg-yellow-500 rounded-md px-3 font-semibold mt-2 me-2 sm:mt-4 sm:me-4 py-1 text-white'>Exit Club</button>
                    <button onClick={() => logOutClub()} className='bg-yellow-500 rounded-md px-3 font-semibold mt-2 me-2 sm:mt-4 sm:me-4 py-1 text-white'>Logout</button>
                </div>}

                <div className='pt-5'>
                    <h1 className='text-3xl sm:text-6xl uppercase font-bold text-center text-white'>{club.clubName}</h1>
                    <h1 className='text-3xl sm:text-6xl text-center uppercase font-extrabold text-white'>Club Theme</h1>
                </div>
                <div className='grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 md:mt-28'>
                    <div onClick={() => setPage('history')} className={`m-3 h-full ${page == 'history' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
                        <div className=''>
                            <div className='flex justify-center'>
                                <RiFileHistoryFill className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                            </div>
                            <h1 className='text-center text-white font-bold'>Club History</h1>
                            <p className='text-center text-yellow-400'> see club's previous trips</p>
                        </div>
                    </div>
                    <div onClick={() => setPage('riders')} className={`m-3 h-full ${page == 'riders' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
                        <div className=''>
                            <div className='flex justify-center'>
                                <RiUserStarFill className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                            </div>
                            <h1 className='text-center text-white font-bold'>Club Riders</h1>
                            <p className='text-center text-yellow-400'> see club's Riders</p>
                        </div>
                    </div>
                    <div onClick={() => setPage('trips')} className={`m-3 h-full ${page == 'trips' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
                        <div className=''>
                            <div className='flex justify-center'>
                                <BiTrip className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                            </div>
                            <h1 className='text-center text-white font-bold'>Current trip</h1>
                            <p className='text-center text-yellow-400'> see Current trips</p>
                        </div>
                    </div>
                    <div onClick={() => setPage('images')} className={`m-3 h-full ${page == 'images' ? "bg-cyan-950" : 'hover:scale-75 transition-transform bg-gradient-to-tr  from-cyan-950 ... bg-opacity-75 '}  flex justify-center`}>
                        <div className=''>
                            <div className='flex justify-center'>
                                <IoIosImages className='w-24 h-28 sm:w-32 sm:h-36 text-yellow-500' />
                            </div>
                            <h1 className='text-center text-white font-bold'>Images</h1>
                            <p className='text-center text-yellow-400'> see previous trip Images</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ClubHead