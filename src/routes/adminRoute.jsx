import React ,{useState , useEffect}from 'react'
import { Routes ,Route,Navigate} from 'react-router-dom'
import SuperAdminHome from '../pages/superAdmin/superAdminHome'
import SuperAdminLogin from '../pages/superAdmin/login'
import RentBikes from '../pages/superAdmin/rentBikes'
import EditBike from '../pages/superAdmin/editBike'
import ClubList from '../pages/superAdmin/clubs'
import { useSelector } from 'react-redux'
import Rents from '../pages/superAdmin/rents'
import Users from '../pages/superAdmin/users'


function AdminRoute() {
  const [editBike,setEditBike] = useState()
  const admin = useSelector((state)=>state.SuperAdmin)

  return (
    <div>
        <Routes>
        <Route path='/' element = {admin.token!==null ? <SuperAdminHome/>:<Navigate to='/admin/login'/>}/>
        <Route path='/login' element = {admin.token!==null ? <Navigate to='/admin'/> :<SuperAdminLogin/>} />     
        <Route path='/rentBikes' element = {admin.token!==null ? <RentBikes setEditBike={setEditBike} /> :<Navigate to='/admin/login'/>}/>
        <Route path='/editBike' element = {admin.token!==null&&editBike!=undefined ? <EditBike editBike = {editBike} setEditBike = {setEditBike}/> :<Navigate to='/admin/rentBikes'/>}/>
        <Route path='/clubs' element = {admin.token!==null ? <ClubList/> :<Navigate to='/admin/login'/>}/>
        <Route path='/rents' element = {admin.token!==null ? <Rents/> :<Navigate to='/admin/login'/>}/>
        <Route path='/users' element = {admin.token!==null ? <Users/> :<Navigate to='/admin/login'/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoute