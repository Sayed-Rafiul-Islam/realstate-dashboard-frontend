"use client"

import { createSlice } from "@reduxjs/toolkit"
import { OrderProps } from "@/types"

const ordersJson = typeof window !== "undefined" && localStorage.getItem("orders")

interface InitialStateProps {
      orders : OrderProps[]
}

const initialState : InitialStateProps = {
    orders : ordersJson ? JSON.parse(ordersJson) : [],
}


const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {
        getOrders : (state, {payload}) => {
            state.orders = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("orders")
            localStorage.setItem("orders", JSON.stringify(state.orders))
            }
        },
        removeOrder : (state, {payload}) => {
            const temp = state.orders.filter(({_id} : OrderProps) => _id !== payload._id)
            state.orders = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("orders")
            localStorage.setItem("orders", JSON.stringify(state.orders))
            }
        },
    }
})

export const {getOrders,removeOrder} = orderSlice.actions
// export const getAllOrders = (state : any) =>state.orders.orders
export default orderSlice.reducer