"use client"
import {createSlice } from "@reduxjs/toolkit"

const tenantInfoJson = typeof window !== "undefined" && localStorage.getItem("tenantInfo")

const initialState = {
    tenantInfo : (tenantInfoJson) ? JSON.parse(tenantInfoJson) : [],
}



const tenantInfoSlice = createSlice({
    name : "tenantInfo",
    initialState,
    reducers : {
        getTenantInfo : (state, {payload}) => {
            state.tenantInfo = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("user")
                localStorage.removeItem("tenantInfo")
                localStorage.setItem("tenantInfo", JSON.stringify(state.tenantInfo))
            }
        }
    }
})

export const {getTenantInfo} = tenantInfoSlice.actions
export default tenantInfoSlice.reducer