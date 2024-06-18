"use client"

import { DocumentProps, InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainerDocumentsJson = typeof window !== "undefined" && localStorage.getItem("maintainerDocuments")

const initialState = {
    maintainerDocuments : maintainerDocumentsJson ? JSON.parse(maintainerDocumentsJson) : [],
}



const maintainerDocumentsSlice = createSlice({
    name : "maintainerDocuments",
    initialState,
    reducers : {
        getMaintainerDocuments : (state, {payload}) => {
            state.maintainerDocuments = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerDocuments")
                localStorage.setItem("maintainerDocuments", JSON.stringify(state.maintainerDocuments))
            } 
        },
        updateMaintainerDocument : (state, {payload}) => {
            const index = state.maintainerDocuments.findIndex((item : DocumentProps) => item._id === payload._id)
            state.maintainerDocuments[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerDocuments")
                localStorage.setItem("maintainerDocuments", JSON.stringify(state.maintainerDocuments))
            }

        },

        addMaintainerDocument : (state, {payload}) => {
            state.maintainerDocuments.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerDocuments")
                localStorage.setItem("maintainerDocuments", JSON.stringify(state.maintainerDocuments))
            }

        },
        removeMaintainerDocument : (state, {payload}) => {
            const temp = state.maintainerDocuments.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.maintainerDocuments = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerDocuments")
                localStorage.setItem("maintainerDocuments", JSON.stringify(state.maintainerDocuments))
            }

        },
    }
})

export const {getMaintainerDocuments,removeMaintainerDocument,addMaintainerDocument,updateMaintainerDocument} = maintainerDocumentsSlice.actions
export default maintainerDocumentsSlice.reducer