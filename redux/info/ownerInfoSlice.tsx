"use client"
import {createSlice } from "@reduxjs/toolkit"

const ownerInfoJson = typeof window !== "undefined" && localStorage.getItem("ownerInfo")

// console.log(ownerInfoJson)

// const exists = Boolean(ownerInfoJson)

const initialState = {
    ownerInfo : ownerInfoJson ? JSON.parse(ownerInfoJson) : [],
}



const ownerInfoSlice = createSlice({
    name : "ownerInfo",
    initialState,
    reducers : {
        getOwnerInfo : (state, {payload}) => {
            state.ownerInfo = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("user")
                localStorage.removeItem("ownerInfo")
                localStorage.setItem("ownerInfo", JSON.stringify(state.ownerInfo))
            }
        },
        updateOwnerInfo : (state, {payload}) => {
            state.ownerInfo.propertyCount = payload.propertyCount
            state.ownerInfo.unitCount = payload.unitCount
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInfo")
                localStorage.setItem("ownerInfo", JSON.stringify(state.ownerInfo))
            }
        },
        updateOwnerPackageInfo : (state, {payload}) => {
            state.ownerInfo = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerInvoices")
                localStorage.removeItem("ownerProperties")
                localStorage.removeItem("ownerUnits")
                localStorage.removeItem("ownerTenants")
                localStorage.removeItem("ownerMaintainers")
                localStorage.removeItem("ownerInfo")
                localStorage.setItem("ownerInfo", JSON.stringify(state.ownerInfo))
            }
        },
    }
})

export const {getOwnerInfo,updateOwnerInfo,updateOwnerPackageInfo} = ownerInfoSlice.actions
export default ownerInfoSlice.reducer