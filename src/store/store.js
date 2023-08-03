import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { superAdmin } from "./slice/superAdmin";
import { clubMember } from "./slice/clubMembers";
import {user} from './slice/user'

const userPersistConfig = {key:"userAuth",storage,version:1}
const superAdminPersistConfig = {key:"superAdminAuth",storage,version:1}
const clubMemberPersistConfig = {key:"clubMemberAuth",storage,version:1}

const userPersistReducer = persistReducer(userPersistConfig,user.reducer)
const clubMemberPersistReducer = persistReducer(clubMemberPersistConfig,clubMember.reducer)
const superAdminPersistReducer = persistReducer(superAdminPersistConfig,superAdmin.reducer)

export const Store = configureStore({
    reducer: {
        User: userPersistReducer,
        SuperAdmin: superAdminPersistReducer,
        ClubMember: clubMemberPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);