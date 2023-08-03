import React, { useEffect, useState } from 'react'
import MessagePage from '../../components/club/messagePage'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'


function Message() {
    const {rideId} = useParams()
    const [users,setUsers] = useState([])
    const [head,setHead] = useState()
    const {clubToken,clubId} = useSelector((state) => state.ClubMember)

    
    useEffect(()=>{
        axiosInstance.get(`chat/getUsers/${rideId}`,{ headers: {
            authorization: `Bearer ${clubToken}`
        }}).then((res)=>{
            setUsers(res.data.users)
            setHead(res.data.head)
        }).catch(()=>{
            if(err.response.data.errMsg){
                toast.error(err.response.data.errMsg)
            }
        })
    },[])

  return (
    <div><MessagePage users={users} clubId={clubId} clubToken={clubToken} rideId={rideId} head={head}/></div>
  )
}

export default Message