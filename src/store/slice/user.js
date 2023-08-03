import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    name:null,
    role:null,
    token:null,
    userId:null
}

export const user = createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        userLogin:(state,action)=>{
            state.name = action.payload.name,
            state.token = action.payload.token,
            state.role = action.payload.role
            state.userId = action.payload.userId
        },
        userLogout:(state,action)=>{
            state.name = null,
            state.token = null,
            state.role = null,
            state.userId = null
        }
    }
})

export const { userLogin,userLogout } = user.actions;
export default user.reducer;