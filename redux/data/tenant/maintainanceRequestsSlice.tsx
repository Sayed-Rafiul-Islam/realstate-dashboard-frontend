"use client"
import { MaintainanceRequestProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantMaintainanceRequestsJson = typeof window !== "undefined" && localStorage.getItem("tenantMaintainanceRequests")

const initialState = {
    tenantMaintainanceRequests : tenantMaintainanceRequestsJson ? JSON.parse(tenantMaintainanceRequestsJson) : [],
}



const tenantMaintainanceRequestsSlice = createSlice({
    name : "tenantMaintainanceRequests",
    initialState,
    reducers : {
        getTenantMaintainanceRequests : (state, {payload}) => {
            state.tenantMaintainanceRequests = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMaintainanceRequests")
                localStorage.setItem("tenantMaintainanceRequests", JSON.stringify(state.tenantMaintainanceRequests))
            }
        },
        updateTenantMaintainanceRequest : (state, {payload}) => {
            const index = state.tenantMaintainanceRequests.findIndex((item : MaintainanceRequestProps) => item._id === payload._id)
            state.tenantMaintainanceRequests[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMaintainanceRequests")
                localStorage.setItem("tenantMaintainanceRequests", JSON.stringify(state.tenantMaintainanceRequests))
            }
        },

        addTenantMaintainanceRequest : (state, {payload}) => {
            state.tenantMaintainanceRequests.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMaintainanceRequests")
                localStorage.setItem("tenantMaintainanceRequests", JSON.stringify(state.tenantMaintainanceRequests))
            }
        },
        removeRenantMaintainanceRequests : (state, {payload}) => {
            const temp = state.tenantMaintainanceRequests.filter(({_id} : MaintainanceRequestProps) => _id !== payload._id)
            state.tenantMaintainanceRequests = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMaintainanceRequests")
                localStorage.setItem("tenantMaintainanceRequests", JSON.stringify(state.tenantMaintainanceRequests))
            }
        },
    }
})

export const {
    getTenantMaintainanceRequests,
    addTenantMaintainanceRequest,
    updateTenantMaintainanceRequest,
    removeRenantMaintainanceRequests} = tenantMaintainanceRequestsSlice.actions
export default tenantMaintainanceRequestsSlice.reducer