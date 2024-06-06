import { PackageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const packageJson = typeof window !== "undefined" && window.localStorage.getItem("packages")

const initialState = {
    packages : packageJson ? JSON.parse(packageJson) : [],
}



const packageSlice = createSlice({
    name : "packages",
    initialState,
    reducers : {
        getPackages : (state, {payload}) => {
            state.packages = payload
            window.localStorage.removeItem("packages")
            window.localStorage.setItem("packages", JSON.stringify(state.packages))
        },
        removePackage : (state, {payload}) => {
            const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
            state.packages = temp
            window.localStorage.removeItem("packages")
            window.localStorage.setItem("packages", JSON.stringify(state.packages))
        },
    }
})

export const {getPackages,removePackage} = packageSlice.actions
export default packageSlice.reducer