"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantInvoicesJson = typeof window !== "undefined" && localStorage.getItem("tenantInvoices")

const initialState = {
    tenantInvoices : tenantInvoicesJson ? JSON.parse(tenantInvoicesJson) : [],
}



const tenantInvoicesSlice = createSlice({
    name : "tenantInvoices",
    initialState,
    reducers : {
        getTenantInvoices : (state, {payload}) => {

            state.tenantInvoices = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantInvoices")
                localStorage.setItem("tenantInvoices", JSON.stringify(state.tenantInvoices))
            }
        },
        updateTenantInvoice : (state, {payload}) => {
            const index = state.tenantInvoices.findIndex((item : InvoiceProps) => item._id === payload._id)
            state.tenantInvoices[index] = payload
            if (typeof window !== 'undefined') {
            // localStorage.removeItem("tenantInvoices")
            // localStorage.setItem("tenantInvoices", JSON.stringify(state.tenantInvoices))
            }
        },

        // addOwnerInvoice : (state, {payload}) => {
        //     state.tenantInvoices.push(payload)
        //     console.log(state.tenantInvoices)
        //     if (typeof window !== 'undefined') {
        //     localStorage.removeItem("tenantInvoices")
        //     localStorage.setItem("tenantInvoices", JSON.stringify(state.tenantInvoices))
        //     }
        // },
        // removeOwnerInvoice : (state, {payload}) => {
        //     const temp = state.tenantInvoices.filter(({_id} : InvoiceProps) => _id !== payload._id)
        //     state.tenantInvoices = temp
        //     if (typeof window !== 'undefined') {
        //     localStorage.removeItem("tenantInvoices")
        //     localStorage.setItem("tenantInvoices", JSON.stringify(state.tenantInvoices))
        //     }
        // },
    }
})

export const {getTenantInvoices,updateTenantInvoice} = tenantInvoicesSlice.actions
export default tenantInvoicesSlice.reducer