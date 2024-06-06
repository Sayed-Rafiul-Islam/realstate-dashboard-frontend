"use client"
import {createSlice } from "@reduxjs/toolkit"

const ownerInfoJson = typeof window !== "undefined" && localStorage.getItem("ownerInfo")

const initialState = {
    ownerInfo : (ownerInfoJson) ? JSON.parse(ownerInfoJson) : [],
}



const ownerInfoSlice = createSlice({
    name : "ownerInfo",
    initialState,
    reducers : {
        getOwnerInfo : (state, {payload}) => {
            state.ownerInfo = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("ownerInfo")
            localStorage.setItem("ownerInfo", JSON.stringify(state.ownerInfo))
            }
        }
    }
})

export const {getOwnerInfo} = ownerInfoSlice.actions
export default ownerInfoSlice.reducer