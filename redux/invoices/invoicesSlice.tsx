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
            localStorage.removeItem("invoices")
            localStorage.setItem("invoices", JSON.stringify(state.invoices))
        },
        // updateinvoicestatus : (state, {payload}) => {
        //     const temp = state.invoices.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.invoices = temp
        //     localStorage.removeItem("invoices")
        //     localStorage.setItem("invoices", JSON.stringify(state.invoices))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.invoices.push(payload)
        //     console.log(state.invoices)
        //     localStorage.removeItem("invoices")
        //     localStorage.setItem("invoices", JSON.stringify(state.invoices))
        // },
        // removeinvoice : (state, {payload}) => {
        //     const temp = state.invoices.filter(({_id} : invoiceProps) => _id !== payload._id)
        //     state.invoices = temp
        //     localStorage.removeItem("invoices")
        //     localStorage.setItem("invoices", JSON.stringify(state.invoices))
        // },
    }
})

export const {getInvoices} = invoicesSlice.actions
export default invoicesSlice.reducer