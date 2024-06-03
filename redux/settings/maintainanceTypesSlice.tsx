import { MaintainanceTypeProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainanceTypesJson = typeof window !== "undefined" && localStorage.getItem("maintainanceTypes")

const initialState = {
    maintainanceTypes : maintainanceTypesJson ? JSON.parse(maintainanceTypesJson) : [],
}



const maintainanceTypesSlice = createSlice({
    name : "maintainanceTypes",
    initialState,
    reducers : {
        getMaintainanceTypes : (state, {payload}) => {
            state.maintainanceTypes = payload
            localStorage.removeItem("maintainanceTypes")
            localStorage.setItem("maintainanceTypes", JSON.stringify(state.maintainanceTypes))
        },
        removeMaintainanceType : (state, {payload}) => {
            const temp = state.maintainanceTypes.filter(({_id} : MaintainanceTypeProps) => _id !== payload._id)
            state.maintainanceTypes = temp
            localStorage.removeItem("maintainanceTypes")
            localStorage.setItem("maintainanceTypes", JSON.stringify(state.maintainanceTypes))
        },        
        updateMaintainanceType : (state, {payload}) => {
            const index = state.maintainanceTypes.findIndex((item : MaintainanceTypeProps) => item._id === payload._id)
            state.maintainanceTypes[index] = payload
            localStorage.removeItem("maintainanceTypes")
            localStorage.setItem("maintainanceTypes", JSON.stringify(state.maintainanceTypes))
        },

        addMaintainanceType : (state, {payload}) => {
            state.maintainanceTypes.push(payload)
            localStorage.removeItem("maintainanceTypes")
            localStorage.setItem("maintainanceTypes", JSON.stringify(state.maintainanceTypes))
        }

    }
})

export const {getMaintainanceTypes,removeMaintainanceType,addMaintainanceType,updateMaintainanceType} = maintainanceTypesSlice.actions
export default maintainanceTypesSlice.reducer