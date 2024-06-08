
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
            if (typeof window !== 'undefined') {
            localStorage.removeItem("owners")
            localStorage.setItem("owners", JSON.stringify(state.owners))
            }
        },
        updateOwnerStatus : (state, {payload}) => {
            const temp = state.owners.filter((item : OwnerProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.owners = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("owners")
            localStorage.setItem("owners", JSON.stringify(state.owners))
            }
        },
        updateOwner : (state, {payload}) => {
            const index = state.owners.findIndex((item : OwnerProps) => item._id === payload._id)
            state.owners[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("owners")
                localStorage.setItem("owners", JSON.stringify(state.owners))
            }
        },
    }
})

export const {getOwners,updateOwnerStatus,updateOwner} = ownersSlice.actions
export default ownersSlice.reducer