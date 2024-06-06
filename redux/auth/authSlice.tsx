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
            // localStorage.removeItem('tenantInfo')
            // localStorage.removeItem('ownerInfo')
            // localStorage.removeItem('maintainerInfo')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('role')
            state.user = []
        }
    },
    // extraReducers : {}
})

export const {addUser,removeUser} = userSlice.actions
export const getAllUsers = (state : any) =>state.user.user
export default userSlice.reducer