
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
            localStorage.removeItem("units")
            localStorage.setItem("units", JSON.stringify(state.units))
        },
        removeUnit : (state, {payload}) => {
            const temp = state.units.filter(({_id} : UnitProps) => _id !== payload)
            state.units = temp
            localStorage.removeItem("units")
            localStorage.setItem("units", JSON.stringify(state.units))
        },
        updateUnit : (state, {payload}) => {
            const index = state.units.findIndex((item : UnitProps) => item._id === payload._id)
            state.units[index] = payload
            localStorage.removeItem("units")
            localStorage.setItem("units", JSON.stringify(state.units))
        },
        
        addUnits : (state, {payload}) => {

            payload.map((item : UnitProps) => {
                state.units.push(item)
            })
            // localStorage.removeItem("properties")
            // localStorage.setItem("properties", JSON.stringify(state.properties))
        },
    }
})

export const {getUnits,removeUnit,addUnits,updateUnit} = unitsSlice.actions
export default unitsSlice.reducer