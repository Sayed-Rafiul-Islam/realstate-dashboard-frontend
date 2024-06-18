"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const documentSettingsJson = typeof window !== "undefined" && localStorage.getItem("documentSettings")

const initialState = {
    documentSettings : documentSettingsJson ? JSON.parse(documentSettingsJson) : [],
}



const documentSettingsSlice = createSlice({
    name : "documentSettings",
    initialState,
    reducers : {
        getDocumentSettings : (state, {payload}) => {

            state.documentSettings = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documentSettings")
                localStorage.setItem("documentSettings", JSON.stringify(state.documentSettings))
            }
        },
        updateDocumentSettings  : (state, {payload}) => {
            const index = state.documentSettings.findIndex((item : InvoiceProps) => item._id === payload._id)
            state.documentSettings[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documentSettings")
                localStorage.setItem("documentSettings", JSON.stringify(state.documentSettings))
            }
        },

        addDocumentSettings  : (state, {payload}) => {
            state.documentSettings.push(payload)
            console.log(state.documentSettings)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documentSettings")
                localStorage.setItem("documentSettings", JSON.stringify(state.documentSettings))
            }
        },
        removeDocumentSettings  : (state, {payload}) => {
            const temp = state.documentSettings.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.documentSettings = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("documentSettings")
                localStorage.setItem("documentSettings", JSON.stringify(state.documentSettings))
                }
        },
    }
})

export const {getDocumentSettings,removeDocumentSettings ,addDocumentSettings ,updateDocumentSettings } = documentSettingsSlice.actions
export default documentSettingsSlice.reducer