import { PackageProps } from "@/types"
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
            localStorage.removeItem("packages")
            localStorage.setItem("packages", JSON.stringify(state.packages))
        },
        removePackage : (state, {payload}) => {
            const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
            state.packages = temp
            localStorage.removeItem("packages")
            localStorage.setItem("packages", JSON.stringify(state.packages))
        },
    }
})

export const {getPackages,removePackage} = packageSlice.actions
export default packageSlice.reducer