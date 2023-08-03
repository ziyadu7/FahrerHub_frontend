import React, { useEffect, useState } from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import ClubAdminHome from '../pages/clubAdmins/clubAdminHome'

function ClubAdminRoute() {
    const {clubId} = useSelector((store)=>store.ClubMember)
    const {clubToken} = useSelector((store)=>store.ClubMember)
    const [club,setClub] = useState()
    useEffect(()=>{
        axiosInstance.get(`/clubAdmin/getClub`,{ headers: { authorization: `Bearer ${clubToken}` } }).then((res)=>{
            setClub(res.data.club)
        }).catch((err)=>{
            if(err.respone.data.errMsg){
                toast.error(err.respone.data.errMsg)
            }
        })
    },[])
  return (
    <div>
        <Toaster toastOptions={3000}/>
        <Routes>
            <Route path='/' element = {club?<ClubAdminHome club = {club}/>:''}/>
        </Routes>
    </div>
  )
}

export default ClubAdminRoute