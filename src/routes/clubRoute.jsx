import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import ClubHome from '../pages/club/clubHome'
import SingleRide from '../components/club/singleRide'
import Message from '../pages/club/message'


function ClubRoute() {
  return (
    <div>
        <Routes>
            <Route path='/home/:id' element = {<ClubHome/>}/>
            <Route path='/singleRide/:rideId' element={<SingleRide/>}/>
            <Route path='/message/:rideId' element={<Message/>}/>
        </Routes>   
    </div>
  )
}

export default ClubRoute