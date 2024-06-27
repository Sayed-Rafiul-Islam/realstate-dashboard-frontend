
import { UnitProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const redJson = typeof window !== "undefined" && localStorage.getItem("red")

const initialState = {
    red : redJson ? JSON.parse(redJson) : [],
}



const unitsSlice = createSlice({
    name : "red",
    initialState,
    reducers : {
        setRed : (state, {payload}) => {
            state.red = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("red")
                localStorage.setItem("red", JSON.stringify(state.red))
            }
        }
    }
})

export const {setRed} = unitsSlice.actions
export default unitsSlice.reducer