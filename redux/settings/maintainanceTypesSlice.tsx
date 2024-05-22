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
    }
})

export const {getMaintainanceTypes,removeMaintainanceType} = maintainanceTypesSlice.actions
export default maintainanceTypesSlice.reducer