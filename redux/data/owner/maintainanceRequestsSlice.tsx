"use client"
import { MaintainanceRequestProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerMaintainanceRequestsJson = typeof window !== "undefined" && localStorage.getItem("ownerMaintainanceRequests")

const initialState = {
    ownerMaintainanceRequests : ownerMaintainanceRequestsJson ? JSON.parse(ownerMaintainanceRequestsJson) : [],
}



const ownerMaintainanceRequestsSlice = createSlice({
    name : "ownerMaintainanceRequests",
    initialState,
    reducers : {
        getOwnerMaintainanceRequests : (state, {payload}) => {
            state.ownerMaintainanceRequests = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceRequests")
                localStorage.setItem("ownerMaintainanceRequests", JSON.stringify(state.ownerMaintainanceRequests))
            }
        },
        updateOwnerMaintainanceRequest : (state, {payload}) => {
            const index = state.ownerMaintainanceRequests.findIndex((item : MaintainanceRequestProps) => item._id === payload._id)
            state.ownerMaintainanceRequests[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceRequests")
                localStorage.setItem("ownerMaintainanceRequests", JSON.stringify(state.ownerMaintainanceRequests))
            }
        },

        addOwnerMaintainanceRequest : (state, {payload}) => {
            state.ownerMaintainanceRequests.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceRequests")
                localStorage.setItem("ownerMaintainanceRequests", JSON.stringify(state.ownerMaintainanceRequests))
            }
        },
        removeOwnerMaintainanceRequests : (state, {payload}) => {
            const temp = state.ownerMaintainanceRequests.filter(({_id} : MaintainanceRequestProps) => _id !== payload._id)
            state.ownerMaintainanceRequests = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceRequests")
                localStorage.setItem("ownerMaintainanceRequests", JSON.stringify(state.ownerMaintainanceRequests))
            }
        },
    }
})

export const {
    getOwnerMaintainanceRequests,
    addOwnerMaintainanceRequest,
    updateOwnerMaintainanceRequest,
    removeOwnerMaintainanceRequests} = ownerMaintainanceRequestsSlice.actions
export default ownerMaintainanceRequestsSlice.reducer