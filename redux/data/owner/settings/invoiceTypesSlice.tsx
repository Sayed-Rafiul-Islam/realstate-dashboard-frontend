import { InvoiceTypeProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerInvoiceTypesJson = typeof window !== "undefined" && localStorage.getItem("ownerInvoiceTypes")

const initialState = {
    ownerInvoiceTypes : ownerInvoiceTypesJson ? JSON.parse(ownerInvoiceTypesJson) : [],
}



const ownerInvoiceTypesSlice = createSlice({
    name : "ownerInvoiceTypes",
    initialState,
    reducers : {
        getOwnerInvoiceTypes : (state, {payload}) => {
            state.ownerInvoiceTypes = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInvoiceTypes")
                localStorage.setItem("ownerInvoiceTypes", JSON.stringify(state.ownerInvoiceTypes))
            }
        },
        removeOwnerInvoiceType : (state, {payload}) => {
            const temp = state.ownerInvoiceTypes.filter(({_id} : InvoiceTypeProps) => _id !== payload._id)
            state.ownerInvoiceTypes = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInvoiceTypes")
                localStorage.setItem("ownerInvoiceTypes", JSON.stringify(state.ownerInvoiceTypes))
            }
        },
        updateOwnerInvoiceType : (state, {payload}) => {
            const index = state.ownerInvoiceTypes.findIndex((item : InvoiceTypeProps) => item._id === payload._id)
            state.ownerInvoiceTypes[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInvoiceTypes")
                localStorage.setItem("ownerInvoiceTypes", JSON.stringify(state.ownerInvoiceTypes))
            }
        },

        addOwnerInvoiceType : (state, {payload}) => {
            state.ownerInvoiceTypes.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInvoiceTypes")
                localStorage.setItem("ownerInvoiceTypes", JSON.stringify(state.ownerInvoiceTypes))
            }
        }
    }
})

export const {getOwnerInvoiceTypes,removeOwnerInvoiceType,addOwnerInvoiceType,updateOwnerInvoiceType} = ownerInvoiceTypesSlice.actions
export default ownerInvoiceTypesSlice.reducer