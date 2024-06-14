"use client"
import { MaintainanceRequestProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainerMaintainanceRequestsJson = typeof window !== "undefined" && localStorage.getItem("maintainerMaintainanceRequests")

const initialState = {
    maintainerMaintainanceRequests : maintainerMaintainanceRequestsJson ? JSON.parse(maintainerMaintainanceRequestsJson) : [],
}



const maintainerMaintainanceRequestsSlice = createSlice({
    name : "maintainerMaintainanceRequests",
    initialState,
    reducers : {
        getMaintainerMaintainanceRequests : (state, {payload}) => {
            state.maintainerMaintainanceRequests = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMaintainanceRequests")
                localStorage.setItem("maintainerMaintainanceRequests", JSON.stringify(state.maintainerMaintainanceRequests))
            }
        },
        updateMaintainerMaintainanceRequest : (state, {payload}) => {
            const index = state.maintainerMaintainanceRequests.findIndex((item : MaintainanceRequestProps) => item._id === payload._id)
            state.maintainerMaintainanceRequests[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMaintainanceRequests")
                localStorage.setItem("maintainerMaintainanceRequests", JSON.stringify(state.maintainerMaintainanceRequests))
            }
        },

        addMaintainerMaintainanceRequest : (state, {payload}) => {
            state.maintainerMaintainanceRequests.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMaintainanceRequests")
                localStorage.setItem("maintainerMaintainanceRequests", JSON.stringify(state.maintainerMaintainanceRequests))
            }
        },
        removeMaintainerMaintainanceRequests : (state, {payload}) => {
            const temp = state.maintainerMaintainanceRequests.filter(({_id} : MaintainanceRequestProps) => _id !== payload._id)
            state.maintainerMaintainanceRequests = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMaintainanceRequests")
                localStorage.setItem("maintainerMaintainanceRequests", JSON.stringify(state.maintainerMaintainanceRequests))
            }
        },
    }
})

export const {
    getMaintainerMaintainanceRequests,
    addMaintainerMaintainanceRequest,
    updateMaintainerMaintainanceRequest,
    removeMaintainerMaintainanceRequests} = maintainerMaintainanceRequestsSlice.actions
export default maintainerMaintainanceRequestsSlice.reducer