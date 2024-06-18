"use client"

import { DocumentProps, InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const documentsJson = typeof window !== "undefined" && localStorage.getItem("documents")

const initialState = {
    documents : documentsJson ? JSON.parse(documentsJson) : [],
}



const documentsSlice = createSlice({
    name : "documents",
    initialState,
    reducers : {
        getDocuments : (state, {payload}) => {
            state.documents = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documents")
                localStorage.setItem("documents", JSON.stringify(state.documents))
            }
        },
        addDocoument : (state, {payload}) => {
            state.documents.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documents")
                localStorage.setItem("documents", JSON.stringify(state.documents))
            }
        },
        updateDocoument : (state, {payload}) => {
            const index = state.documents.findIndex((item : DocumentProps) => item._id === payload._id)
            state.documents[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documents")
                localStorage.setItem("documents", JSON.stringify(state.documents))
            }
        },
        removeDocument : (state, {payload}) => {
            const temp = state.documents.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.documents = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documents")
                localStorage.setItem("documents", JSON.stringify(state.documents))
            }
        },
    }
})

export const {getDocuments,addDocoument,updateDocoument,removeDocument} = documentsSlice.actions
export default documentsSlice.reducer