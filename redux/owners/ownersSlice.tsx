
import { OwnerProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownersJson = typeof window !== "undefined" && localStorage.getItem("owners")

const initialState = {
    owners : ownersJson ? JSON.parse(ownersJson) : [],
}



const ownersSlice = createSlice({
    name : "owners",
    initialState,
    reducers : {
        getOwners : (state, {payload}) => {
            state.owners = payload
            localStorage.removeItem("owners")
            localStorage.setItem("owners", JSON.stringify(state.owners))
        },
        updateOwnerStatus : (state, {payload}) => {
            const temp = state.owners.filter((item : OwnerProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.owners = temp
            localStorage.removeItem("owners")
            localStorage.setItem("owners", JSON.stringify(state.owners))
        },

        // addOwnerPackage : (state, {payload}) => {
        //     state.owners.push(payload)
        //     console.log(state.owners)
        //     localStorage.removeItem("owners")
        //     localStorage.setItem("owners", JSON.stringify(state.owners))
        // },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     localStorage.removeItem("packages")
        //     localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getOwners,updateOwnerStatus} = ownersSlice.actions
export default ownersSlice.reducer