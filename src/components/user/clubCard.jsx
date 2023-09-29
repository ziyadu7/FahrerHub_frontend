import React from 'react'

function ClubCard(props) {
    const club = props?.club
    const joinClub = props?.joinClub
    const isJoined = props?.isJoined
    const navigate = props?.navigate
    const reqClubs = props?.reqClubs
    const removeRequest = props?.removeRequest



    return (
        <div
            className="flex m-3 w-full col-span-1 h-full bg-black text-white p-2 rounded-lg hover:shadow-lg"
        >
            <div className="w-4/12 rounded me-1">
                <img
                    src={
                        club.logo
                            ? club.logo
                            : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    }
                    className="w-40 h-24"
                    alt="..."
                />
            </div>
            <div className="md:w-full">
                <div className="flex justify-between capitalize">
                    <div className="ms-5">
                        <h5 className="font-medium">{club.clubName}</h5>
                        <p className="">City : {club.city}</p>
                        <p className="">
                            Total Members : {club.members.length}
                        </p>
                        <p className="">
                            Started Year : {new Date(club.startedYear).toLocaleDateString()}
                        </p>
                        <p className="">Admin : {club.admins[0].admin.name}</p>
                    </div>
                    <div className='flex justify-end h-1/2'>
                        {reqClubs ? <button onClick={() => removeRequest(club._id)}
                            className="bg-green-900 px-3 h-1/3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                        >Requested</button> : isJoined ? <button onClick={() => navigate(`/club/home/${club._id}`)}
                            className="bg-green-900 px-3 h-1/3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                        >View</button> : <button
                            onClick={() => joinClub(club._id)}
                            className="bg-green-900 px-3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                        >
                            Join
                        </button>}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ClubCard