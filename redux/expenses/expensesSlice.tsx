"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const expensesJson = typeof window !== "undefined" && localStorage.getItem("expenses")

const initialState = {
    expenses : expensesJson ? JSON.parse(expensesJson) : [],
}



const expensesSlice = createSlice({
    name : "expenses",
    initialState,
    reducers : {
        getExpenses : (state, {payload}) => {
            state.expenses = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("expenses")
            localStorage.setItem("expenses", JSON.stringify(state.expenses))
            }
        },
        removeExpense : (state, {payload}) => {
            const temp = state.expenses.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.expenses = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("expenses")
            localStorage.setItem("expenses", JSON.stringify(state.expenses))
            }
        },
    }
})

export const {getExpenses,removeExpense} = expensesSlice.actions
export default expensesSlice.reducer