import React, { useEffect, useState } from 'react'
import NavBar from '../../components/user/navBar'
import ShowClubsPage from '../../components/user/showClubsPage'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import Loader from '../../components/user/loader'

function Clubs() {

  const { token, userId } = useSelector((state) => state.User)
  const [clubs, setClubs] = useState()
  const [isProtected,setProtected] = useState(false)
  const [change, setChange] = useState(false)
  const [protClubs,setProtClubs] = useState([])
  const [loader,setLoader] = useState(true)

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
          if (err.response.data.errMsg) {
              toast.error(err.response.data.errMsg)
          }
      })
  }, [change])
  return (
    <div>
        <NavBar/><Toaster toastOptions={3000}/>
        {loader?<Loader/>:isProtected?<ShowClubsPage isProtected={isProtected} setProtected={setProtected} change={change} setChange={setChange} token={token} clubs={protClubs} />:<ShowClubsPage isProtected={isProtected} setProtected={setProtected} change={change} setChange={setChange} token={token} clubs={clubs} />}
    </div>
  )
}

export default Clubs