"use client"
import { createSlice } from "@reduxjs/toolkit"

const allUsersJson = typeof window !== "undefined" && localStorage.getItem("allUsers")

// const initialState = {
//     documents : documentsJson ? JSON.parse(documentsJson) : [],
// }

const initialState = {
    allUsers : allUsersJson ? JSON.parse(allUsersJson) : [],
}

const allUsersSlice = createSlice({
    name : "allUsers",
    initialState,
    reducers : {
        getAllUsers: (state, {payload}) => {
            state.allUsers = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("allUsers")
                localStorage.setItem("allUsers", JSON.stringify(state.allUsers))
            }
        },
        // removeallUsers: (state) => {
        //     if (typeof window !== 'undefined') {
        //     localStorage.removeItem('tenantInfo')
        //     localStorage.removeItem('ownerInfo')
        //     localStorage.removeItem('maintainerInfo')
        //     localStorage.removeItem('accessToken')
        //     localStorage.removeItem('role')
        //     }
        //     state.allUsers = []
        // }
    },
    // extraReducers : {}
})

export const {getAllUsers} = allUsersSlice.actions
export default allUsersSlice.reducer