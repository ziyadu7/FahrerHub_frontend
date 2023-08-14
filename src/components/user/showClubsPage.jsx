import React, {  useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import ClubCard from './clubCard'
import '../../assets/css/club/upcomingRides.css'
import CreateClub from './createClub'
import SearchBox from './search'
import { useNavigate } from 'react-router-dom'
import { AlertIcon } from './warning'

function ShowClubsPage(props) {

    const [modal, setModal] = useState(false)

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const change = props?.change
    const setChange = props?.setChange
    const token = props?.token
    const clubs = props?.clubs
    const isProtected = props?.isProtected
    const setProtected = props?.setProtected

    const joinClub = async (id) => {
        axiosInstance.patch('/user/joinClub', { id }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success(res.data.message)
            setChange(!change)
        }).catch((err) => {
            if(err.response.status === 404){
                navigate('/serverError')
            }else if(err.response.status==403){
                navigate('/accessDenied')
            }else if(err.response.status==500){
                navigate('/serverError')
            }else if(err?.response?.data){
                toast.error(err?.response?.data?.errMsg)
            }
        })
    }

    return (
        <div className='bg-[url(https://wallpapercave.com/wp/wp7610092.jpg)] bg-cover bg-center w-full min-h-screen bg-fixed'>
            <Toaster toastOptions={{ duration: 3000 }} />
            {modal ? <>
                <CreateClub token={token} change={change} setChange={setChange} setModal={setModal} />
            </> : <>
                <div className={`justify-between sm:text-sm text-xs px-4 mx-auto lg:max-w-7xl pt-4 md:items-center md:flex md:px-8`}>
                    <div className=' flex justify-between sm:block'>
                        <button onClick={() => { setProtected(false) }} className={`p-2 ${isProtected?'bg-blue-600':'bg-blue-950'} rounded-md border-white text-white hover:text-black hover:border-black me-2 mt-2`} >Public Club</button> 
                        <button onClick={() => { setProtected(true) }} className={`p-2 ${isProtected?'bg-blue-900':'bg-blue-600'} rounded-md border-white text-white hover:text-black hover:border-black me-2 mt-2`} >PrivateClub</button>
                    </div>
                <div className='flex justify-between mt-3'>
                <button onClick={() => setModal(true)} className='p-2 bg-blue-600 rounded-md border-white text-white hover:bg-white hover:text-black hover:border-black me-2' >Create Club</button>

                    <SearchBox search={search} setSearch={setSearch} />
                </div>

                </div>
                {clubs?.length==0?<div className={`justify-between px-4 grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 mx-auto lg:max-w-7xl md:items-center md:px-8`}>
                    {clubs
                        ? clubs
                            .filter(
                                (club) =>
                                    club.clubName.toLowerCase().includes(search) ||
                                    club.city.toLowerCase().includes(search)
                            )
                            .map((club) => {
                                return (
                                    <ClubCard key={club._id} reqClubs={false} isProtected={false} isJoined={false} club={club} joinClub={joinClub} />
                                );
                            })
                        : null}
                </div>:<div className='p-4'><AlertIcon message={'No clubs to show'}/></div>}

            </>}

        </div>
    )
}

export default ShowClubsPage