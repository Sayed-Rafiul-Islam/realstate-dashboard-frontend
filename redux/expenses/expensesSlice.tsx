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
            localStorage.removeItem("expenses")
            localStorage.setItem("expenses", JSON.stringify(state.expenses))
        },
        // updateexpensestatus : (state, {payload}) => {
        //     const temp = state.expenses.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.expenses = temp
        //     localStorage.removeItem("expenses")
        //     localStorage.setItem("expenses", JSON.stringify(state.expenses))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.expenses.push(payload)
        //     console.log(state.expenses)
        //     localStorage.removeItem("expenses")
        //     localStorage.setItem("expenses", JSON.stringify(state.expenses))
        // },
        removeExpense : (state, {payload}) => {
            const temp = state.expenses.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.expenses = temp
            localStorage.removeItem("expenses")
            localStorage.setItem("expenses", JSON.stringify(state.expenses))
        },
    }
})

export const {getExpenses,removeExpense} = expensesSlice.actions
export default expensesSlice.reducer