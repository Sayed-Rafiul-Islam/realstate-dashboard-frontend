import { InvoiceTypeProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const invoiceTypesJson = typeof window !== "undefined" && localStorage.getItem("invoiceTypes")

const initialState = {
    invoiceTypes : invoiceTypesJson ? JSON.parse(invoiceTypesJson) : [],
}



const invoiceTypesSlice = createSlice({
    name : "invoiceTypes",
    initialState,
    reducers : {
        getInvoiceTypes : (state, {payload}) => {
            state.invoiceTypes = payload
            localStorage.removeItem("invoiceTypes")
            localStorage.setItem("invoiceTypes", JSON.stringify(state.invoiceTypes))
        },
        removeInvoiceType : (state, {payload}) => {
            const temp = state.invoiceTypes.filter(({_id} : InvoiceTypeProps) => _id !== payload._id)
            state.invoiceTypes = temp
            localStorage.removeItem("invoiceTypes")
            localStorage.setItem("invoiceTypes", JSON.stringify(state.invoiceTypes))
        },
    }
})

export const {getInvoiceTypes,removeInvoiceType} = invoiceTypesSlice.actions
export default invoiceTypesSlice.reducer