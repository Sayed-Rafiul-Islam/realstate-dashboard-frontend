
import { UnitProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const unitsJson = typeof window !== "undefined" && localStorage.getItem("units")

const initialState = {
    units : unitsJson ? JSON.parse(unitsJson) : [],
}



const unitsSlice = createSlice({
    name : "units",
    initialState,
    reducers : {
        getUnits : (state, {payload}) => {
            state.units = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("units")
                localStorage.setItem("units", JSON.stringify(state.units))
            }
        },
        removeUnit : (state, {payload}) => {
            const temp = state.units.filter(({_id} : UnitProps) => _id !== payload)
            state.units = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("units")
                localStorage.setItem("units", JSON.stringify(state.units))
            }
        },
        updateUnit : (state, {payload}) => {
            const index = state.units.findIndex((item : UnitProps) => item._id === payload._id)
            state.units[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("units")
                localStorage.setItem("units", JSON.stringify(state.units))
            }
        },
        
        addUnit : (state, {payload}) => {
            state.units.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("units")
                localStorage.setItem("units", JSON.stringify(state.units))
            }
        },
    }
})

export const {getUnits,removeUnit,addUnit,updateUnit} = unitsSlice.actions
export default unitsSlice.reducer