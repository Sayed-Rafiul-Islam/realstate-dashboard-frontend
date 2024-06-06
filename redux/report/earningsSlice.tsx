import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const earningsJson = typeof window !== "undefined" && window.localStorage.getItem("earnings")

const initialState = {
    earnings : earningsJson ? JSON.parse(earningsJson) : [],
}



const earningsSlice = createSlice({
    name : "earnings",
    initialState,
    reducers : {
        getEarnings : (state, {payload}) => {
            state.earnings = payload
            window.localStorage.removeItem("earnings")
            window.localStorage.setItem("earnings", JSON.stringify(state.earnings))
        },
        // updateearningstatus : (state, {payload}) => {
        //     const temp = state.earnings.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.earnings = temp
        //     window.localStorage.removeItem("earnings")
        //     window.localStorage.setItem("earnings", JSON.stringify(state.earnings))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.earnings.push(payload)
        //     console.log(state.earnings)
        //     window.localStorage.removeItem("earnings")
        //     window.localStorage.setItem("earnings", JSON.stringify(state.earnings))
        // },
        removeEarning : (state, {payload}) => {
            const temp = state.earnings.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.earnings = temp
            window.localStorage.removeItem("earnings")
            window.localStorage.setItem("earnings", JSON.stringify(state.earnings))
        },
    }
})

export const {getEarnings,removeEarning} = earningsSlice.actions
export default earningsSlice.reducer