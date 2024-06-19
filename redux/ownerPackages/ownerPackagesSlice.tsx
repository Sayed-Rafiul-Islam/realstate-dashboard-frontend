
import { OwnerPackageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const allOwnerPackagesJson = typeof window !== "undefined" && localStorage.getItem("allOwnerPackages")

const initialState = {
    allOwnerPackages : allOwnerPackagesJson ? JSON.parse(allOwnerPackagesJson) : [],
}



const allOwnerPackageSlice = createSlice({
    name : "allOwnerPackages",
    initialState,
    reducers : {
        getAllOwnerPackages : (state, {payload}) => {
            state.allOwnerPackages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("allOwnerPackages")
                localStorage.setItem("allOwnerPackages", JSON.stringify(state.allOwnerPackages))
            }
        },
        addAllOwnerPackage : (state, {payload}) => {
            state.allOwnerPackages.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("allOwnerPackages")
                localStorage.setItem("allOwnerPackages", JSON.stringify(state.allOwnerPackages))
            }
        },
        removeAllOwnerPackage : (state, {payload}) => {
            const temp = state.allOwnerPackages.filter(({_id} : OwnerPackageProps) => _id !== payload._id)
            state.allOwnerPackages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("allOwnerPackages")
                localStorage.setItem("allOwnerPackages", JSON.stringify(state.allOwnerPackages))
            }
        },

    }
})

export const {getAllOwnerPackages,addAllOwnerPackage,removeAllOwnerPackage} = allOwnerPackageSlice.actions
export default allOwnerPackageSlice.reducer