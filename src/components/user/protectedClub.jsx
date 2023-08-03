import React, { useEffect, useState } from 'react'
import ClubCard from './clubCard'
import { useNavigate } from 'react-router-dom'
import SearchBox from './search'

function ProtectedClub(props) {
    const [search, setSearch] = useState('')
    const clubs = props?.clubs
    const navigate = useNavigate()
    return (
        <div className='bg-[url(https://wallpapercave.com/wp/wp7610092.jpg)] bg-cover bg-center w-full h-screen bg-fixed'>
            <>
                <div className={`justify-end pt-4 px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8`}>
                    <SearchBox search={search} setSearch={setSearch} />

                </div>
                <div className={`justify-between px-4 grid grid-cols-1 md:grid-cols-2 gap-2 mt-3  mx-auto lg:max-w-7xl md:items-center md:px-8`}>

                    {/* <div className=""> */}
                    {clubs ? clubs.filter((club) => club.clubName.toLowerCase().includes(search) || club.city.toLowerCase().includes(search)).map((club) => {
                        return (
                            <>
                                <ClubCard isJoined={false} club={club} navigate={navigate} />
                            </>
                        )
                    }) : <div className="flex mb- w-full h-full bg-stone-400 p-2 ">
                        <div className="w-4/12 rounded me-1">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" className="rounded-full" alt="..." />
                        </div>
                        <div className="md:w-8/12">
                            <div className='flex justify-center '>
                                <div className="">
                                    <h5 className="font-medium">Card title</h5>
                                    <p className="">
                                        city:Calicut
                                    </p>
                                    <p className="">
                                        Total Members:218
                                    </p>
                                    <p className="">
                                        Started Year:2017
                                    </p>
                                    <p className="">
                                        Admin:king
                                    </p>
                                </div>
                            </div>
                            <div className='flex justify-center sm:justify-end'>
                                <button className='bg-slate-600 px-3 rounded hover:bg-black hover:text-white py-1'>Join</button>
                            </div>

                        </div>
                    </div>}

                </div>
            </>
        </div>
    )
}

export default ProtectedClub