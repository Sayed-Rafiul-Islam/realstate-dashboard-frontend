
import { UnitProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerUnitsJson = typeof window !== "undefined" && localStorage.getItem("ownerUnits")

const initialState = {
    ownerUnits : ownerUnitsJson ? JSON.parse(ownerUnitsJson) : [],
}



const ownerUnitsSlice = createSlice({
    name : "ownerUnits",
    initialState,
    reducers : {
        getOwnerUnits : (state, {payload}) => {
            state.ownerUnits = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerUnits")
                localStorage.setItem("ownerUnits", JSON.stringify(state.ownerUnits))
            }
        },
        removeOwnerUnit : (state, {payload}) => {
            const temp = state.ownerUnits.filter(({_id} : UnitProps) => _id !== payload)
            state.ownerUnits = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerUnits")
                localStorage.setItem("ownerUnits", JSON.stringify(state.ownerUnits))
            }
        },
        updateOwnerUnit : (state, {payload}) => {
            const index = state.ownerUnits.findIndex((item : UnitProps) => item._id === payload._id)
            state.ownerUnits[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerUnits")
                localStorage.setItem("ownerUnits", JSON.stringify(state.ownerUnits))
            }
        },
        
        addOwnerUnit : (state, {payload}) => {
            state.ownerUnits.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerUnits")
                localStorage.setItem("ownerUnits", JSON.stringify(state.ownerUnits))
            }
        },
    }
})

export const {getOwnerUnits,removeOwnerUnit,addOwnerUnit,updateOwnerUnit} = ownerUnitsSlice.actions
export default ownerUnitsSlice.reducer