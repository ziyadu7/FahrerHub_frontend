import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    role:null,
    clubToken:null,
    clubId:null
}

export const clubMember = createSlice({
    name:'clubMemberAuth',
    initialState,
    reducers:{
        clubMemberLogin:(state,action)=>{
            state.clubToken = action.payload.clubToken,
            state.role = action.payload.role
            state.clubId = action.payload.clubId
        },
        clubMemberLogout:(state,action)=>{
            state.clubToken = null,
            state.role = null,
            state.clubId = null
        }
    }
})

export const { clubMemberLogin,clubMemberLogout } = clubMember.actions;
export default clubMember.reducer;