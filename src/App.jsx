import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import Register from './pages/users/register'
import Home from './pages/users/home'
import UserLogin from './pages/users/login'
import { useSelector } from 'react-redux'
import ShowBikes from './pages/users/showBikes'
import Profile from './pages/users/profile'
import Clubs from './pages/users/clubs'
import YourClubs from './pages/users/yourClubs'
import AdminRoute from './routes/adminRoute'
import ClubRoute from './routes/clubRoute'
import ClubAdminRoute from './routes/clubAdminRoute'
import PaySuccess from './components/user/paySuccess'
import NotFound from './components/notFound.jsx/notFound'
import PayFail from './components/user/payFail'
import Questions from './pages/users/Questions'
import EmailVerify from './components/user/emailVerify'
import ResetPassword from './components/user/resetPassword'
import OtpLogin from './components/user/otpLogin'

function App() {
  const user = useSelector((state)=>state.User)
  const {role} = useSelector((store)=>store.ClubMember)
  const admin = useSelector((state)=>state.SuperAdmin)
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/register' element = {user.token!==null ?<Navigate to='/'/> :<Register/>} />
        <Route path='/login' element = {user.token!==null ?<Navigate to='/'/> :<UserLogin/>} />
        <Route path='/showBikes' element = {user.token!==null ?<ShowBikes/> :<Navigate to='/login'/>}/>
        <Route path='/profile' element = {user.token!==null ?<Profile/> :<Navigate to='/login'/>}/>
        <Route path='/clubs' element = {user.token!==null ?<Clubs/> :<Navigate to='/login'/>}/>
        <Route path='/yourClubs' element = {user.token!==null ?<YourClubs/> :<Navigate to='/login'/>}/>
        <Route path='/createClub' element = {user.token!==null ?<Clubs/> :<Navigate to='/login'/>}/>
        <Route path='/paymentSuccess/:load' element = {user.token!==null ?<PaySuccess/> :<Navigate to='/login'/>}/>
        <Route path='/paymentFail' element = {user.token!==null ?<PayFail/> :<Navigate to='/login'/>}/>
        <Route path='/questions'  element = {user.token!==null ?<Questions/> :<Navigate to='/login'/>}/>
        <Route path="/emailVerify/:userId" element={<EmailVerify/>}/>
        <Route path="/resetPassword/:userId" element={<ResetPassword/>}/>
        <Route path='/otpLogin' element={<OtpLogin/>}/>

        {/* ADMIN */}

        <Route path='/admin/*' element ={ <AdminRoute/>}/>
        

        {/* CLUB */}

        <Route path='/club/*' element = {user.token!==null ? <ClubRoute/>:<Navigate to='/'/>}/>

        {/* CLUB ADMIN */}

        <Route path='/clubAdmin/*' element = {user.token!==null&&role=='admin'? <ClubAdminRoute/>:<Navigate to='/'/>}/>

        {/* NOT FOUND PAGE */}

        <Route path='*' element ={<NotFound/>}/>


      </Routes>
    </Router>
  )
}

export default App
