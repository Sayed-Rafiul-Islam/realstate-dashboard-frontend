import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerInfoJson = typeof window !== "undefined" && localStorage.getItem("ownerInfo")

const initialState = {
    ownerInfo : ownerInfoJson ? JSON.parse(ownerInfoJson) : [],
}



const ownerInfoSlice = createSlice({
    name : "ownerInfo",
    initialState,
    reducers : {
        getOwnerInfo : (state, {payload}) => {
            state.ownerInfo = payload
            localStorage.removeItem("ownerInfo")
            localStorage.setItem("ownerInfo", JSON.stringify(state.ownerInfo))
        },
        removeOwnerInfo : (state, {payload}) => {
            const temp = state.ownerInfo.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.ownerInfo = temp
            localStorage.removeItem("ownerInfo")
            localStorage.setItem("ownerInfo", JSON.stringify(state.ownerInfo))
        },
    }
})

export const {getOwnerInfo,removeOwnerInfo} = ownerInfoSlice.actions
export default ownerInfoSlice.reducer