import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    name:null,
    role:null,
    token:null
}

export const superAdmin = createSlice({
    name:'superAdminAuth',
    initialState,
    reducers:{
        superAdminLogin:(state,action)=>{
            state.name= action.payload.name,
            state.token = action.payload.token,
            state.role = action.payload.role
        },
        superAdminLogout:(state,action)=>{
            state.name = null,
            state.token = null,
            state.role = null
        }
    }
})

export const { superAdminLogout,superAdminLogin } = superAdmin.actions;
export default superAdmin.reducer;