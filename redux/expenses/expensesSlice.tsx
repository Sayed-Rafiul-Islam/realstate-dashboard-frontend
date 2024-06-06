"use client"
import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const expensesJson = typeof window !== "undefined" && window.localStorage.getItem("expenses")

const initialState = {
    expenses : expensesJson ? JSON.parse(expensesJson) : [],
}



const expensesSlice = createSlice({
    name : "expenses",
    initialState,
    reducers : {
        getExpenses : (state, {payload}) => {
            state.expenses = payload
            window.localStorage.removeItem("expenses")
            window.localStorage.setItem("expenses", JSON.stringify(state.expenses))
        },
        // updateexpensestatus : (state, {payload}) => {
        //     const temp = state.expenses.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.expenses = temp
        //     window.localStorage.removeItem("expenses")
        //     window.localStorage.setItem("expenses", JSON.stringify(state.expenses))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.expenses.push(payload)
        //     console.log(state.expenses)
        //     window.localStorage.removeItem("expenses")
        //     window.localStorage.setItem("expenses", JSON.stringify(state.expenses))
        // },
        removeExpense : (state, {payload}) => {
            const temp = state.expenses.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.expenses = temp
            window.localStorage.removeItem("expenses")
            window.localStorage.setItem("expenses", JSON.stringify(state.expenses))
        },
    }
})

export const {getExpenses,removeExpense} = expensesSlice.actions
export default expensesSlice.reducer