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
        }
    }
})

export const {getMaintainerInfo} = maintainerInfoSlice.actions
export default maintainerInfoSlice.reducer