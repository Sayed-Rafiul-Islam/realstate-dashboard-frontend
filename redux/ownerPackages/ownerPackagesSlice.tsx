
import {createSlice } from "@reduxjs/toolkit"

const ownerPackagesJson = typeof window !== "undefined" && window.localStorage.getItem("ownerPackages")

const initialState = {
    ownerPackages : ownerPackagesJson ? JSON.parse(ownerPackagesJson) : [],
}



const ownerPackageSlice = createSlice({
    name : "ownerPackages",
    initialState,
    reducers : {
        getOwnerPackages : (state, {payload}) => {
            state.ownerPackages = payload
            window.localStorage.removeItem("ownerPackages")
            window.localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
        },
        addOwnerPackage : (state, {payload}) => {
            state.ownerPackages.push(payload)
            console.log(state.ownerPackages)
            // window.localStorage.removeItem("ownerPackages")
            // window.localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
        },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     window.localStorage.removeItem("packages")
        //     window.localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getOwnerPackages,addOwnerPackage} = ownerPackageSlice.actions
export default ownerPackageSlice.reducer