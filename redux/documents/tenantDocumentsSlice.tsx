"use client"

import { InvoiceProps, TenantDocumentProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantDocumentsJson = typeof window !== "undefined" && localStorage.getItem("tenantDocuments")

const initialState = {
    tenantDocuments : tenantDocumentsJson ? JSON.parse(tenantDocumentsJson) : [],
}



const tenantDocumentsSlice = createSlice({
    name : "tenantDocuments",
    initialState,
    reducers : {
        getTenantDocuments : (state, {payload}) => {
            state.tenantDocuments = payload
            localStorage.removeItem("tenantDocuments")
            localStorage.setItem("tenantDocuments", JSON.stringify(state.tenantDocuments))
        },
        updateTenantDocument : (state, {payload}) => {
            const index = state.tenantDocuments.findIndex((item : TenantDocumentProps) => item._id === payload._id)
            state.tenantDocuments[index] = payload
            localStorage.removeItem("tenantDocuments")
            localStorage.setItem("tenantDocuments", JSON.stringify(state.tenantDocuments))
        },

        addTenantDocument : (state, {payload}) => {
            state.tenantDocuments.push(payload)
            localStorage.removeItem("tenantDocuments")
            localStorage.setItem("tenantDocuments", JSON.stringify(state.tenantDocuments))
        },
        removeTenantDocument : (state, {payload}) => {
            const temp = state.tenantDocuments.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.tenantDocuments = temp
            localStorage.removeItem("tenantDocuments")
            localStorage.setItem("tenantDocuments", JSON.stringify(state.tenantDocuments))
        },
    }
})

export const {getTenantDocuments,removeTenantDocument,addTenantDocument,updateTenantDocument} = tenantDocumentsSlice.actions
export default tenantDocumentsSlice.reducer