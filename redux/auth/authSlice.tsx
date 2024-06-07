"use client"
import { createSlice } from "@reduxjs/toolkit"

const userJson = typeof window !== "undefined" && localStorage.getItem("user")

// const initialState = {
//     documents : documentsJson ? JSON.parse(documentsJson) : [],
// }

const initialState = {
    user : userJson ? JSON.parse(userJson) : [],
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        addUser: (state, {payload}) => {
            state.user = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("user")
                localStorage.setItem("user", JSON.stringify(state.user))
            }
        },
        removeUser: (state) => {
            if (typeof window !== 'undefined') {
            localStorage.removeItem('tenantInfo')
            localStorage.removeItem('ownerInfo')
            localStorage.removeItem('maintainerInfo')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('role')
            }
            state.user = []
        }
    },
    // extraReducers : {}
})

export const {addUser,removeUser} = userSlice.actions
// export const getAllUsers = (state : any) =>state.user.user
export default userSlice.reducer