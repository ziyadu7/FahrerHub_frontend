import React, { useContext } from 'react'
import EditBikePage from '../../components/superAdmin/editBikePage'
import SideBar from '../../components/superAdmin/sideBar'

function EditBike({editBike,setEditBike}) {
  return (
    <div className='flex '>
        <SideBar/><EditBikePage editBike = {editBike} setEditBike = {setEditBike}/>
    </div>
  )
}

export default EditBike