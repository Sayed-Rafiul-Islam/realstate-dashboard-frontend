"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerExpensesJson = typeof window !== "undefined" && localStorage.getItem("ownerExpenses")

const initialState = {
    ownerExpenses : ownerExpensesJson ? JSON.parse(ownerExpensesJson) : [],
}



const ownerExpensesSlice = createSlice({
    name : "ownerExpenses",
    initialState,
    reducers : {
        getOwnerExpenses : (state, {payload}) => {
            state.ownerExpenses = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerExpenses")
                localStorage.setItem("ownerExpenses", JSON.stringify(state.ownerExpenses))
            }
        },
        removeOwnerExpense : (state, {payload}) => {
            const temp = state.ownerExpenses.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.ownerExpenses = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerExpenses")
                localStorage.setItem("ownerExpenses", JSON.stringify(state.ownerExpenses))
            }
        },
    }
})

export const {getOwnerExpenses,removeOwnerExpense} = ownerExpensesSlice.actions
export default ownerExpensesSlice.reducer