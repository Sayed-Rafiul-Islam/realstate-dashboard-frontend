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
            if (typeof window !== 'undefined') {
                localStorage.removeItem("packages")
                localStorage.setItem("packages", JSON.stringify(state.packages))
            }
        },
        updatePackage : (state, {payload}) => {
            const index = state.packages.findIndex((item : PackageProps) => item._id === payload._id)
            state.packages[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("packages")
                localStorage.setItem("packages", JSON.stringify(state.packages))
            }
        },

        addPackage : (state, {payload}) => {
            state.packages.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("packages")
                localStorage.setItem("packages", JSON.stringify(state.packages))
            }
        },
        removePackage : (state, {payload}) => {
            const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
            state.packages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("packages")
                localStorage.setItem("packages", JSON.stringify(state.packages))
            }
        },
    }
})

export const {getPackages,removePackage,addPackage,updatePackage} = packageSlice.actions
export default packageSlice.reducer