
import { UnitProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const unitsJson = typeof window !== "undefined" && window.localStorage.getItem("units")

const initialState = {
    units : unitsJson ? JSON.parse(unitsJson) : [],
}



const unitsSlice = createSlice({
    name : "units",
    initialState,
    reducers : {
        getUnits : (state, {payload}) => {
            state.units = payload
            window.localStorage.removeItem("units")
            window.localStorage.setItem("units", JSON.stringify(state.units))
        },
        removeUnit : (state, {payload}) => {
            const temp = state.units.filter(({_id} : UnitProps) => _id !== payload)
            state.units = temp
            window.localStorage.removeItem("units")
            window.localStorage.setItem("units", JSON.stringify(state.units))
        },
        updateUnit : (state, {payload}) => {
            const index = state.units.findIndex((item : UnitProps) => item._id === payload._id)
            state.units[index] = payload
            window.localStorage.removeItem("units")
            window.localStorage.setItem("units", JSON.stringify(state.units))
        },
        
        addUnits : (state, {payload}) => {

            payload.map((item : UnitProps) => {
                state.units.push(item)
            })
            // window.localStorage.removeItem("properties")
            // window.localStorage.setItem("properties", JSON.stringify(state.properties))
        },
    }
})

export const {getUnits,removeUnit,addUnits,updateUnit} = unitsSlice.actions
export default unitsSlice.reducer