import { InvoiceProps, RentProps } from "@/types"
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
        updateRent : (state, {payload}) => {
            if (payload) {
                const index = state.rents.findIndex((item : RentProps) => item._id === payload._id)
                state.rents[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("rents")
                    localStorage.setItem("rents", JSON.stringify(state.rents))
                }
            }
            
        },

        addRent : (state, {payload}) => {
            state.rents.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("rents")
                localStorage.setItem("rents", JSON.stringify(state.rents))
            }
        },
        removeRent : (state, {payload}) => {
            const temp = state.rents.filter(({_id} : RentProps) => _id !== payload._id)
            state.rents = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("rents")
                localStorage.setItem("rents", JSON.stringify(state.rents))
            }
        },
    }
})

export const {getRents,removeRent,addRent,updateRent} = rentsSlice.actions
export default rentsSlice.reducer