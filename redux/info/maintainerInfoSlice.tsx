import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainerInfoJson = typeof window !== "undefined" && localStorage.getItem("maintainerInfo")

const initialState = {
    maintainerInfo : maintainerInfoJson ? JSON.parse(maintainerInfoJson) : [],
}



const maintainerInfoSlice = createSlice({
    name : "maintainerInfo",
    initialState,
    reducers : {
        getMaintainerInfo : (state, {payload}) => {
            state.maintainerInfo = payload
            localStorage.removeItem("maintainerInfo")
            localStorage.setItem("maintainerInfo", JSON.stringify(state.maintainerInfo))
        },
        removeMaintainerInfo : (state, {payload}) => {
            const temp = state.maintainerInfo.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.maintainerInfo = temp
            localStorage.removeItem("maintainerInfo")
            localStorage.setItem("maintainerInfo", JSON.stringify(state.maintainerInfo))
        },
    }
})

export const {getMaintainerInfo,removeMaintainerInfo} = maintainerInfoSlice.actions
export default maintainerInfoSlice.reducer