"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const invoicesJson = typeof window !== "undefined" && localStorage.getItem("invoices")

const initialState = {
    invoices : invoicesJson ? JSON.parse(invoicesJson) : [],
}



const invoicesSlice = createSlice({
    name : "invoices",
    initialState,
    reducers : {
        getInvoices : (state, {payload}) => {
            state.invoices = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("invoices")
            localStorage.setItem("invoices", JSON.stringify(state.invoices))
            }
        },
        updateInvoice : (state, {payload}) => {
            const index = state.invoices.findIndex((item : InvoiceProps) => item._id === payload._id)
            state.invoices[index] = payload
            if (typeof window !== 'undefined') {
            // localStorage.removeItem("invoices")
            // localStorage.setItem("invoices", JSON.stringify(state.invoices))
            }
        },

        addInvoice : (state, {payload}) => {
            state.invoices.push(payload)
            console.log(state.invoices)
            if (typeof window !== 'undefined') {
            localStorage.removeItem("invoices")
            localStorage.setItem("invoices", JSON.stringify(state.invoices))
            }
        },
        removeInvoice : (state, {payload}) => {
            const temp = state.invoices.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.invoices = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("invoices")
            localStorage.setItem("invoices", JSON.stringify(state.invoices))
            }
        },
    }
})

export const {getInvoices,removeInvoice,addInvoice,updateInvoice} = invoicesSlice.actions
export default invoicesSlice.reducer