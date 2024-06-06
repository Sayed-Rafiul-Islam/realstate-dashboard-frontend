import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const rentsJson = typeof window !== "undefined" && localStorage.getItem("rents")


const initialState = {
    rents : rentsJson ? JSON.parse(rentsJson) : [],
}



const rentsSlice = createSlice({
    name : "rents",
    initialState,
    reducers : {
        getRents : (state, {payload}) => {
            state.rents = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("rents")
            localStorage.setItem("rents", JSON.stringify(state.rents))
            }
        },
        // updaterentstatus : (state, {payload}) => {
        //     const temp = state.rents.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.rents = temp
        // if (typeof window !== 'undefined') {
        //     localStorage.removeItem("rents")
        //     localStorage.setItem("rents", JSON.stringify(state.rents))
        // }
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.rents.push(payload)
        //     console.log(state.rents)
        // if (typeof window !== 'undefined') {
        //     localStorage.removeItem("rents")
        //     localStorage.setItem("rents", JSON.stringify(state.rents))
        // }
        // },
        removeRent : (state, {payload}) => {
            const temp = state.rents.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.rents = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("rents")
            localStorage.setItem("rents", JSON.stringify(state.rents))
            }
        },
    }
})

export const {getRents,removeRent} = rentsSlice.actions
export default rentsSlice.reducer