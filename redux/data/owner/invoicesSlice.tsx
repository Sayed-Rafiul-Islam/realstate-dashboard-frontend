"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerInvoicesJson = typeof window !== "undefined" && localStorage.getItem("ownerInvoices")

const initialState = {
    ownerInvoices : ownerInvoicesJson ? JSON.parse(ownerInvoicesJson) : [],
}



const ownerInvoicesSlice = createSlice({
    name : "ownerInvoices",
    initialState,
    reducers : {
        getOwnerInvoices : (state, {payload}) => {

            state.ownerInvoices = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInvoices")
                localStorage.setItem("ownerInvoices", JSON.stringify(state.ownerInvoices))
            }
        },
        updateOwnerInvoice : (state, {payload}) => {
            const index = state.ownerInvoices.findIndex((item : InvoiceProps) => item._id === payload._id)
            state.ownerInvoices[index] = payload
            if (typeof window !== 'undefined') {
            // localStorage.removeItem("ownerInvoices")
            // localStorage.setItem("ownerInvoices", JSON.stringify(state.ownerInvoices))
            }
        },

        addOwnerInvoice : (state, {payload}) => {
            state.ownerInvoices.push(payload)
            console.log(state.ownerInvoices)
            if (typeof window !== 'undefined') {
            localStorage.removeItem("ownerInvoices")
            localStorage.setItem("ownerInvoices", JSON.stringify(state.ownerInvoices))
            }
        },
        removeOwnerInvoice : (state, {payload}) => {
            const temp = state.ownerInvoices.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.ownerInvoices = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("ownerInvoices")
            localStorage.setItem("ownerInvoices", JSON.stringify(state.ownerInvoices))
            }
        },
    }
})

export const {getOwnerInvoices,removeOwnerInvoice,addOwnerInvoice,updateOwnerInvoice} = ownerInvoicesSlice.actions
export default ownerInvoicesSlice.reducer