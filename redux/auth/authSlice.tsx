"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user : [],
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        addUser: (state, {payload}) => {
            state.user = payload
        },
        removeUser: (state) => {
            window.localStorage.removeItem('tenantInfo')
            window.localStorage.removeItem('ownerInfo')
            window.localStorage.removeItem('maintainerInfo')
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('role')
            state.user = []
        }
    },
    // extraReducers : {}
})

export const {addUser,removeUser} = userSlice.actions
export const getAllUsers = (state : any) =>state.user.user
export default userSlice.reducer