
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
            localStorage.removeItem("ownerPackages")
            localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
        },
        addOwnerPackage : (state, {payload}) => {
            state.ownerPackages.push(payload)
            console.log(state.ownerPackages)
            // localStorage.removeItem("ownerPackages")
            // localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
        },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     localStorage.removeItem("packages")
        //     localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getOwnerPackages,addOwnerPackage} = ownerPackageSlice.actions
export default ownerPackageSlice.reducer