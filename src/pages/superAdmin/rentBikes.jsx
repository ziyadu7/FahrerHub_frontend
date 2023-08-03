import SideBar from '../../components/superAdmin/sideBar'
import BikesPage from '../../components/superAdmin/bikesPage'

function RentBikes({setEditBike}) {
  return (
    <div className='flex '>
      <SideBar/><BikesPage setEditBike = {setEditBike}/>
    </div>
  )
}

export default RentBikes