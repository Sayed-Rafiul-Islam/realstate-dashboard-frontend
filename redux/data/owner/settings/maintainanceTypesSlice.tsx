import { MaintainanceTypeProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerMaintainanceTypesJson = typeof window !== "undefined" && localStorage.getItem("ownerMaintainanceTypes")

const initialState = {
    ownerMaintainanceTypes : ownerMaintainanceTypesJson ? JSON.parse(ownerMaintainanceTypesJson) : [],
}



const ownerMaintainanceTypesSlice = createSlice({
    name : "ownerMaintainanceTypes",
    initialState,
    reducers : {
        getOwnerMaintainanceTypes : (state, {payload}) => {
            state.ownerMaintainanceTypes = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceTypes")
                localStorage.setItem("ownerMaintainanceTypes", JSON.stringify(state.ownerMaintainanceTypes))
            }
        },
        removeOwnerMaintainanceType : (state, {payload}) => {
            const temp = state.ownerMaintainanceTypes.filter(({_id} : MaintainanceTypeProps) => _id !== payload._id)
            state.ownerMaintainanceTypes = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceTypes")
                localStorage.setItem("ownerMaintainanceTypes", JSON.stringify(state.ownerMaintainanceTypes))
            }
        },        
        updateOwnerMaintainanceType : (state, {payload}) => {
            const index = state.ownerMaintainanceTypes.findIndex((item : MaintainanceTypeProps) => item._id === payload._id)
            state.ownerMaintainanceTypes[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceTypes")
                localStorage.setItem("ownerMaintainanceTypes", JSON.stringify(state.ownerMaintainanceTypes))
            }
        },

        addOwnerMaintainanceType : (state, {payload}) => {
            state.ownerMaintainanceTypes.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainanceTypes")
                localStorage.setItem("ownerMaintainanceTypes", JSON.stringify(state.ownerMaintainanceTypes))
            }
        }

    }
})

export const {getOwnerMaintainanceTypes,removeOwnerMaintainanceType,addOwnerMaintainanceType,updateOwnerMaintainanceType} = ownerMaintainanceTypesSlice.actions
export default ownerMaintainanceTypesSlice.reducer