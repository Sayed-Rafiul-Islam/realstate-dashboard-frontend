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
        }
    },
    // extraReducers : {}
})

export const {addUser} = userSlice.actions
export const getAllUsers = (state : any) =>state.user.user
export default userSlice.reducer