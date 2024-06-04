import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantInfoJson = typeof window !== "undefined" && localStorage.getItem("tenantInfo")

const initialState = {
    tenantInfo : tenantInfoJson ? JSON.parse(tenantInfoJson) : [],
}



const tenantInfoSlice = createSlice({
    name : "tenantInfo",
    initialState,
    reducers : {
        getTenantInfo : (state, {payload}) => {
            console.log(payload)
            state.tenantInfo = payload
            localStorage.removeItem("tenantInfo")
            localStorage.setItem("tenantInfo", JSON.stringify(state.tenantInfo))
        },
        removeTenantInfo : (state, {payload}) => {
            const temp = state.tenantInfo.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.tenantInfo = temp
            localStorage.removeItem("tenantInfo")
            localStorage.setItem("tenantInfo", JSON.stringify(state.tenantInfo))
        },
    }
})

export const {getTenantInfo,removeTenantInfo} = tenantInfoSlice.actions
export default tenantInfoSlice.reducer