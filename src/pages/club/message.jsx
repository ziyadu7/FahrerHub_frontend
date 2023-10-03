import React, { useEffect, useState } from 'react'
import MessagePage from '../../components/club/messagePage'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import errorFunction from '../../helpers/erroHandling'


function Message() {
    const { rideId } = useParams()
    const [users, setUsers] = useState([])
    const [head, setHead] = useState()
    const { clubToken, clubId } = useSelector((state) => state.ClubMember)
    const navigate = useNavigate()


    useEffect(() => {
        axiosInstance.get(`chat/getUsers/${rideId}`, {
            headers: {
                authorization: `Bearer ${clubToken}`
            }
        }).then((res) => {
            setUsers(res.data.users)
            setHead(res.data.head)
        }).catch(() => {
            errorFunction(err,navigate)
        })
    }, [])

    return (
        <div><MessagePage users={users} clubId={clubId} clubToken={clubToken} rideId={rideId} head={head} /></div>
    )
}

export default Message