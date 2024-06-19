
import { OwnerPackageProps } from "@/types"
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
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerPackages")
                localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
            }
        },
        removeOwnerPackage : (state, {payload}) => {
            const temp = state.ownerPackages.filter(({_id} : OwnerPackageProps) => _id !== payload._id)
            state.ownerPackages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerPackages")
                localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
            }
        },
        updateOwnerPackage : (state, {payload}) => {
            if (payload) {
                const index = state.ownerPackages.findIndex((item : OwnerPackageProps) => item._id === payload._id)
                state.ownerPackages[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("ownerPackages")
                    localStorage.setItem("ownerPackages", JSON.stringify(state.ownerPackages))
                }
            }
            
        },

    }
})

export const {getOwnerPackages,addOwnerPackage,removeOwnerPackage,updateOwnerPackage} = ownerPackageSlice.actions
export default ownerPackageSlice.reducer