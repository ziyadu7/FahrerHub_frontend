import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import ClubCard from './clubCard'
import { toast } from 'react-hot-toast'
import SearchBox from './search'
import Loader from './loader'
import '../../assets/css/club/upcomingRides.css'

function YourClubPage() {

    const [clubs, setClubs] = useState()
    const [reqClubs, setReqClubs] = useState()
    const [loader, setLoader] = useState(true)

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const { token, userId } = useSelector((state) => state.User)
    const [reload, setReload] = useState(false)
    useEffect(() => {
        axiosInstance.get('/user/yourClubs', {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setReqClubs(res.data.reqClubs)
            setClubs(res.data.clubs)
            setLoader(false)
        }).catch((err) => {
            if (err.response.data.errMsg) {
                toast.error(err.response.data.errMsg)
            }
        })
    }, [reload])

    const removeRequest = (clubId) => {
        axiosInstance.patch('/user/removeRequest', { clubId }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success(res.data.message)
            setReload(!reload)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            {loader ? <Loader  bg={'white'} colour={'black'}/> :
                <div className='bg-[url(https://wallpapercave.com/wp/wp7610092.jpg)] bg-cover bg-center w-full min-h-screen  bg-fixed'>
                    <>
                        <div className={`justify-end pt-4 px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8`}>
                            <SearchBox search={search} setSearch={setSearch} />
                        </div>
                        <div className={`justify-between px-4 grid grid-cols-1 md:grid-cols-2 gap-2 mt-3  mx-auto lg:max-w-7xl md:items-center md:px-8`}>

                            {reqClubs ? reqClubs.filter((club) => club.clubName.toLowerCase().includes(search) || club.city.toLowerCase().includes(search)).map((club) => {
                                return (

                                    club.admins[0].admin._id == userId ? '' : <ClubCard key={club._id} removeRequest={removeRequest} reqClubs={true} isJoined={true} club={club} navigate={navigate} />


                                )
                            }) : ''}
                            {clubs ? clubs.filter((club) => club.clubName.toLowerCase().includes(search) || club.city.toLowerCase().includes(search)).map((club) => {
                                return (

                                    <ClubCard key={club._id} reqClubs={false} isJoined={true} club={club} navigate={navigate} />

                                )
                            }) : <div className='flex justify-center md:ms-16'> <Loader /></div>}

                        </div>
                    </>
                </div>
            }
        </>
    )
}

export default YourClubPage