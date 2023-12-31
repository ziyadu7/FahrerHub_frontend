import React, { useEffect, useState } from 'react'
import NavBar from '../../components/user/navBar'
import ShowClubsPage from '../../components/user/showClubsPage'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import '../../assets/css/club/upcomingRides.css'
import Loader from '../../components/user/loader'
import { useNavigate } from 'react-router-dom'
import errorFunction from '../../helpers/erroHandling'

function Clubs() {

  const { token, userId } = useSelector((state) => state.User)
  const [clubs, setClubs] = useState()
  const [isProtected,setProtected] = useState(false)
  const [change, setChange] = useState(false)
  const [protClubs,setProtClubs] = useState([])
  const [loader,setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
      axiosInstance.get('/user/clubs', {
          headers: {
              authorization: `Bearer ${token}`
          }
      }).then((res) => {
          setClubs(res.data.clubs)
          setProtClubs(res.data.protClubs)
          setLoader(false)
      }).catch((err) => {
        errorFunction(err,navigate)
      })
  }, [change])
  return (
    <div>
        <NavBar/><Toaster toastOptions={3000}/>
        {loader?<Loader bg={'white'} colour={'black'} />:isProtected?<ShowClubsPage isProtected={isProtected} setProtected={setProtected} change={change} setChange={setChange} token={token} clubs={protClubs} />:<ShowClubsPage isProtected={isProtected} setProtected={setProtected} change={change} setChange={setChange} token={token} clubs={clubs} />}
    </div>
  )
}

export default Clubs