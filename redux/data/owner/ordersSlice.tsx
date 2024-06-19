"use client"

import { createSlice } from "@reduxjs/toolkit"
import { OrderProps } from "@/types"

const ownerOrdersJson = typeof window !== "undefined" && localStorage.getItem("ownerOrders")

interface InitialStateProps {
      ownerOrders : OrderProps[]
}

const initialState : InitialStateProps = {
    ownerOrders : ownerOrdersJson ? JSON.parse(ownerOrdersJson) : [],
}


const ownerOrderSlice = createSlice({
    name : "ownerOrders",
    initialState,
    reducers : {
        getOwnerOrders : (state, {payload}) => {
            state.ownerOrders = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerOrders")
                localStorage.setItem("ownerOrders", JSON.stringify(state.ownerOrders))
            }
        },
        updateOwnerOrder : (state, {payload}) => {
            if (payload) {
                const index = state.ownerOrders.findIndex((item : OrderProps) => item._id === payload._id)
                state.ownerOrders[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("ownerOrders")
                    localStorage.setItem("ownerOrders", JSON.stringify(state.ownerOrders))
                }
            }
            
        },
        
        addOwnerOrder : (state, {payload}) => {
            state.ownerOrders.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerOrders")
                localStorage.setItem("ownerOrders", JSON.stringify(state.ownerOrders))
            }
        },
        removeOwnerOrder : (state, {payload}) => {
            const temp = state.ownerOrders.filter(({_id} : OrderProps) => _id !== payload._id)
            state.ownerOrders = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerOrders")
                localStorage.setItem("ownerOrders", JSON.stringify(state.ownerOrders))
            }
        },
    }
})

export const {getOwnerOrders,removeOwnerOrder,addOwnerOrder,updateOwnerOrder} = ownerOrderSlice.actions
// export const getAllownerOrders = (state : any) =>state.ownerOrders.ownerOrders
export default ownerOrderSlice.reducer