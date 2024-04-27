import {createSlice } from "@reduxjs/toolkit"

const packageJson = typeof window !== "undefined" && localStorage.getItem("packages")

const initialState = {
    packages : packageJson ? JSON.parse(packageJson) : [],
}



const packageSlice = createSlice({
    name : "packages",
    initialState,
    reducers : {
        getPackages : (state, {payload}) => {
            state.packages = payload
        }
    }
})

export const {getPackages} = packageSlice.actions
export default packageSlice.reducer