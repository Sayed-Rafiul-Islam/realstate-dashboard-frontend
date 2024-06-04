import { InvoiceProps, MaintainanceRequestProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainanceRequestsJson = typeof window !== "undefined" && localStorage.getItem("maintainanceRequests")

const initialState = {
    maintainanceRequests : maintainanceRequestsJson ? JSON.parse(maintainanceRequestsJson) : [],
}



const maintainanceRequestsSlice = createSlice({
    name : "maintainanceRequests",
    initialState,
    reducers : {
        getMaintainanceRequests : (state, {payload}) => {
            state.maintainanceRequests = payload
            localStorage.removeItem("maintainanceRequests")
            localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        },
        updateMaintainanceRequest : (state, {payload}) => {
            const index = state.maintainanceRequests.findIndex((item : MaintainanceRequestProps) => item._id === payload._id)
            state.maintainanceRequests[index] = payload
            localStorage.removeItem("maintainanceRequests")
            localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        },

        addMaintainanceRequest : (state, {payload}) => {
            state.maintainanceRequests.push(payload)
            localStorage.removeItem("maintainanceRequests")
            localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        },
        removeMaintainanceRequests : (state, {payload}) => {
            const temp = state.maintainanceRequests.filter(({_id} : MaintainanceRequestProps) => _id !== payload._id)
            state.maintainanceRequests = temp
            localStorage.removeItem("maintainanceRequests")
            localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        },
    }
})

export const {
    getMaintainanceRequests,
    addMaintainanceRequest,
    updateMaintainanceRequest,
    removeMaintainanceRequests} = maintainanceRequestsSlice.actions
export default maintainanceRequestsSlice.reducer