"use client"

import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const documentsJson = typeof window !== "undefined" && window.localStorage.getItem("documents")

const initialState = {
    documents : documentsJson ? JSON.parse(documentsJson) : [],
}



const documentsSlice = createSlice({
    name : "documents",
    initialState,
    reducers : {
        getDocuments : (state, {payload}) => {
            state.documents = payload
            window.localStorage.removeItem("documents")
            window.localStorage.setItem("documents", JSON.stringify(state.documents))
        },
        // updatedocumentstatus : (state, {payload}) => {
        //     const temp = state.documents.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.documents = temp
        //     window.localStorage.removeItem("documents")
        //     window.localStorage.setItem("documents", JSON.stringify(state.documents))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.documents.push(payload)
        //     console.log(state.documents)
        //     window.localStorage.removeItem("documents")
        //     window.localStorage.setItem("documents", JSON.stringify(state.documents))
        // },
        removeDocument : (state, {payload}) => {
            const temp = state.documents.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.documents = temp
            window.localStorage.removeItem("documents")
            window.localStorage.setItem("documents", JSON.stringify(state.documents))
        },
    }
})

export const {getDocuments,removeDocument} = documentsSlice.actions
export default documentsSlice.reducer