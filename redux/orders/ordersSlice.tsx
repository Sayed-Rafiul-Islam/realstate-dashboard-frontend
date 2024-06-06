"use client"

import { createSlice } from "@reduxjs/toolkit"
import { OrderProps } from "@/types"

const ordersJson = typeof window !== "undefined" && window.localStorage.getItem("orders")

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
            window.localStorage.removeItem("orders")
            window.localStorage.setItem("orders", JSON.stringify(state.orders))
        },
        removeOrder : (state, {payload}) => {
            const temp = state.orders.filter(({_id} : OrderProps) => _id !== payload._id)
            state.orders = temp
            window.localStorage.removeItem("orders")
            window.localStorage.setItem("orders", JSON.stringify(state.orders))
        },
    }
})

export const {getOrders,removeOrder} = orderSlice.actions
// export const getAllOrders = (state : any) =>state.orders.orders
export default orderSlice.reducer