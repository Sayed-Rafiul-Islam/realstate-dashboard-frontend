"use client"
import { ExpenseTypeProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const expenseTypesJson = typeof window !== "undefined" && window.window.localStorage.getItem("expenseTypes")

const initialState = {
    expenseTypes : expenseTypesJson ? JSON.parse(expenseTypesJson) : [],
}



const expenseTypesSlice = createSlice({
    name : "expenseTypes",
    initialState,
    reducers : {
        getExpenseTypes : (state, {payload}) => {
            state.expenseTypes = payload
            window.localStorage.removeItem("expenseTypes")
            window.localStorage.setItem("expenseTypes", JSON.stringify(state.expenseTypes))
        },
        removeExpenseType : (state, {payload}) => {
            const temp = state.expenseTypes.filter(({_id} : ExpenseTypeProps) => _id !== payload._id)
            state.expenseTypes = temp
            window.localStorage.removeItem("expenseTypes")
            window.localStorage.setItem("expenseTypes", JSON.stringify(state.expenseTypes))
        },
        updateExpenseType : (state, {payload}) => {
            const index = state.expenseTypes.findIndex((item : ExpenseTypeProps) => item._id === payload._id)
            state.expenseTypes[index] = payload
            window.localStorage.removeItem("expenseTypes")
            window.localStorage.setItem("expenseTypes", JSON.stringify(state.expenseTypes))
        },

        addExpenseType : (state, {payload}) => {
            state.expenseTypes.push(payload)
            window.localStorage.removeItem("expenseTypes")
            window.localStorage.setItem("expenseTypes", JSON.stringify(state.expenseTypes))
        },
    }
})

export const {getExpenseTypes,removeExpenseType,addExpenseType,updateExpenseType} = expenseTypesSlice.actions
export default expenseTypesSlice.reducer