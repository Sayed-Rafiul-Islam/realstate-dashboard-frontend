import { ExpenseTypeProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerExpenseTypesJson = typeof window !== "undefined" && localStorage.getItem("ownerExpenseTypes")

const initialState = {
    ownerExpenseTypes : ownerExpenseTypesJson ? JSON.parse(ownerExpenseTypesJson) : [],
}



const ownerExpenseTypesSlice = createSlice({
    name : "ownerExpenseTypes",
    initialState,
    reducers : {
        getOwnerExpenseTypes : (state, {payload}) => {

            state.ownerExpenseTypes = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerExpenseTypes")
                localStorage.setItem("ownerExpenseTypes", JSON.stringify(state.ownerExpenseTypes))
            }
        },
        removeOwnerExpenseType : (state, {payload}) => {
            const temp = state.ownerExpenseTypes.filter(({_id} : ExpenseTypeProps) => _id !== payload._id)
            state.ownerExpenseTypes = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerExpenseTypes")
                localStorage.setItem("ownerExpenseTypes", JSON.stringify(state.ownerExpenseTypes))
            }
        },
        updateOwnerExpenseType : (state, {payload}) => {
            const index = state.ownerExpenseTypes.findIndex((item : ExpenseTypeProps) => item._id === payload._id)
            state.ownerExpenseTypes[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerExpenseTypes")
                localStorage.setItem("ownerExpenseTypes", JSON.stringify(state.ownerExpenseTypes))
            }
        },

        addOwnerExpenseType : (state, {payload}) => {
            state.ownerExpenseTypes.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerExpenseTypes")
                localStorage.setItem("ownerExpenseTypes", JSON.stringify(state.ownerExpenseTypes))
            }
        },
    }
})

export const {getOwnerExpenseTypes,removeOwnerExpenseType,addOwnerExpenseType,updateOwnerExpenseType} = ownerExpenseTypesSlice.actions
export default ownerExpenseTypesSlice.reducer