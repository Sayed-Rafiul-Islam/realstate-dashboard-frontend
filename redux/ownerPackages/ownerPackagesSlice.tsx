
import {createSlice } from "@reduxjs/toolkit"

const ownerPackagesJson = typeof window !== "undefined" && localStorage.getItem("ownerPackages")

const initialState = {
    ownerPackages : ownerPackagesJson ? JSON.parse(ownerPackagesJson) : [],
}



const ownerPackageSlice = createSlice({
    name : "ownerPackages",
    initialState,
    reducers : {
        getOwnerPackages : (state, {payload}) => {
            state.ownerPackages = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("ownerPackages")
            localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
            }
        },
        addOwnerPackage : (state, {payload}) => {
            state.ownerPackages.push(payload)
            // localStorage.removeItem("ownerPackages")
            // localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
        },

    }
})

export const {getOwnerPackages,addOwnerPackage} = ownerPackageSlice.actions
export default ownerPackageSlice.reducer